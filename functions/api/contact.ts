interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface ContactContext {
  request: Request;
  env: Env;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
  elapsed?: unknown;
}

const LIMITS = {
  name: 100,
  email: 254,
  subject: 160,
  messageMin: 20,
  messageMax: 4000,
  bodyBytes: 20_000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function verifyTurnstile(secret: string, token: string, remoteIp: string | null): Promise<boolean> {
  const form = new FormData();
  form.set('secret', secret);
  form.set('response', token);
  if (remoteIp) form.set('remoteip', remoteIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function onRequestPost(context: ContactContext): Promise<Response> {
  const { request, env } = context;

  const length = Number(request.headers.get('content-length') ?? '0');
  if (length > LIMITS.bodyBytes) {
    return json({ ok: false, error: 'payload_too_large' }, 413);
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Honeypot: bots fill every field. Pretend success so they do not retry.
  if (text(payload.website)) {
    return json({ ok: true });
  }

  // Time trap: a form completed implausibly fast is automated. Return an
  // explicit error so a legitimate fast submission is never shown as sent.
  const elapsed = typeof payload.elapsed === 'number' ? payload.elapsed : 0;
  if (elapsed > 0 && elapsed < 2000) {
    return json({ ok: false, error: 'submitted_too_fast' }, 400);
  }

  const name = text(payload.name);
  const email = text(payload.email);
  const subject = text(payload.subject);
  const message = text(payload.message);

  if (!name || name.length > LIMITS.name) {
    return json({ ok: false, error: 'invalid_name' }, 400);
  }
  if (!email || email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) {
    return json({ ok: false, error: 'invalid_email' }, 400);
  }
  if (!subject || subject.length > LIMITS.subject) {
    return json({ ok: false, error: 'invalid_subject' }, 400);
  }
  if (message.length < LIMITS.messageMin || message.length > LIMITS.messageMax) {
    return json({ ok: false, error: 'invalid_message' }, 400);
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const token = text(payload.turnstileToken);
    const remoteIp = request.headers.get('cf-connecting-ip');
    if (!token || !(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, remoteIp))) {
      return json({ ok: false, error: 'captcha_failed' }, 400);
    }
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json({ ok: false, error: 'delivery_not_configured' }, 503);
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replace(/\r?\n/g, '<br />'),
  };

  const delivery = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `[AayusX] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${safe.name} &lt;${safe.email}&gt;</p>
        <p><strong>Subject:</strong> ${safe.subject}</p>
        <hr />
        <p>${safe.message}</p>
      `.trim(),
    }),
  });

  if (!delivery.ok) {
    return json({ ok: false, error: 'delivery_failed' }, 502);
  }

  return json({ ok: true });
}
