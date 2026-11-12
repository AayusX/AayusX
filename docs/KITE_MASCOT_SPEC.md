# Changa Mascot Specification

**Status:** Prototype complete, awaiting owner review. Not integrated into the live site.
**Date:** 10 November 2026
**Prototype:** `/kite-lab` (unlinked, `noindex, nofollow`)
**Source of truth:** the existing `Changa` kite in `src/features/mascot/Changa.tsx`

This document defines the evolved AayusX mascot so the character stays consistent when it is eventually rolled out across the site. The live site uses the original Changa in the intro and as the pointer cursor, with the illustrated portrait in the hero and footer, until the evolved kite is approved.

## 1. Identity invariants

The character must keep these traits in every state and at every size:

- A diamond silhouette.
- Four triangular body panels meeting at the centre seam.
- Exactly two eyes.
- A small tail that flows behind the body.
- A purple/brown translucent material, warm paper highlights, and a deep plum edge.

The character is a kite first. It must not gain limbs, ears, fur, clothing, a human face, or a generic cartoon body. Expression comes from coordinated eye, lid, mouth, body, and tail behaviour, not from extra anatomy.

## 2. Why a 2.5D vector rig

The prototype is a layered SVG character placed under CSS perspective, driven by data and CSS custom properties.

Reasons:

- It stays crisp at the 28 px footer/cursor scale where a WebGL render would alias or blur.
- It keeps the face fully art-directed instead of gambling on lighting and shader readability.
- It adds no render loop, no WebGL context, and no texture memory to normal page browsing.
- It preserves the existing SVG identity instead of rebuilding the character from primitives.

The tradeoff is that the result is a dimensional 2.5D character, not a true mesh with refraction and volumetric translucency. Three.js is already a dependency for the isolated physics experiment, so a true 3D version is possible without new packages, but it would need a lazy-loaded scene, a render loop, and a separate small-size fallback. That is a larger change and should only be taken on if the owner decides the 2.5D rig is not dimensional enough.

## 3. Character rig

The component is `src/features/mascot/Kite.tsx`. Supporting files:

- `src/features/mascot/kiteData.ts`: expression specs, dialogue, section map.
- `src/pages/KiteLabPage.tsx`: review page and controls.
- `src/styles/kite.css`: character rig and motion.
- `src/styles/kite-lab.css`: lab-only layout, loaded only by the lab route.

| Layer | Purpose |
|---|---|
| `.kite__look` | Pointer-driven `rotateX`/`rotateY` under `perspective: 900px`. Gives the body real view-angle change. |
| `.kite__pose` | Expression posture: `rotateZ`, `rotateX`, and `translateY`. |
| `.kite__float` | Idle float loop with per-expression duration, lift, and rotation amplitude. |
| `kite__thickness` | Offset back-edge polygon that gives the diamond a visible material depth. |
| Four `kite__panel` paths | Top-left, top-right, bottom-left, bottom-right gradients. The top-left is lightest; the bottom-right is deepest. |
| `kite__sheen` / `kite__glass` | Clipped specular streak and per-panel glass wash. |
| `kite__outline` / `kite__seam` | Thin warm rim and centre seam. |
| `kite__eye-socket` | Inset shadow and faint rim that seats the eye in the material. |
| `kite__sclera` + `kite__pupil` | Warm-lavender sclera with a dark pupil and a fixed glint. |
| `kite__lid` / `kite__lash` | Eyelid shape that lowers per expression; the lash catches the light. |
| Two ribbon tails | Layered underlay, core, and fold strokes with a knot at the body. Each tail swings on its own offset. |

Materials use warm paper (`#f6efe7`), lavender-plum (`#cdb4dd`, `#7a4a70`), clay-brown (`#d7a18d`, `#a56a5f`), and near-black plum (`#120a12`, `#2a1524`). The purple/brown relationship is part of the identity.

## 4. Expression system

Expressions are declared in `src/features/mascot/kiteData.ts` and consumed by `Kite.tsx`. Each state coordinates:

- Upper-lid position and whether the eye is open or closed into an arc.
- Pupil offset and pupil size.
- Mouth shape: `smile`, `grin`, `open`, `flat`, `smirk`, `small`, or `o`.
- Body rotation, tilt, and lift.
- Float speed, float height, float rotation.
- Tail speed and swing amplitude.

| State | Eyes | Mouth | Posture | Tail | Default line |
|---|---|---|---|---|---|
| Welcome | Open, slightly wide, centred | Smile | Settled, small lean | Easy, medium | Hey. Glad you made it. |
| Curious | Wide, both pupils to one side | Small | Lean and tilt toward the look | Quicker, wider | Wait — what's over there? |
| Happy | Closed into upward arcs | Grin | Light, lifted | Lively | Now this is a good breeze. |
| Excited | Widest, centred, slightly enlarged | Open | Fast float, lifted, tilted | Fastest | Did you see that? Let's do it again. |
| Thoughtful | One lid lower, gaze up and aside | Flat | Leans away, slow | Slow and loose | Give me a second. I'm thinking. |
| Surprised | Widest, small pupils, body pulled back | Round `o` | Back tilt, lifted | Alert | Oh! I didn't see you coming. |
| Proud | Steady, gaze slightly up | Smirk | Tall, chin-up tilt | Held high, steady | We built that. Properly. |
| Playful | One closed arc, one open with side gaze | Smirk | Big tilt, quick float | Fast, irregular | Catch me if you can. |
| Calm | Half-lidded, gaze down | Small | Settled, very slow | Slowest | No rush. The wind isn't going anywhere. |
| Goodbye | Soft gaze down and aside | Smile | Turns away, trails | Trailing, slow | Come back when you have something to build. |

Blinking runs on a 6.8 s loop and is suppressed on states that already draw closed eyes and under reduced motion.

## 5. Section dialogue

Dialogue is contextual, short, and written for the actual site. The bubble should appear on arrival or on deliberate interaction, not stay on screen permanently.

| Section | State | Line |
|---|---|---|
| Home | Welcome | Hey. You found the start. I'm Changa — I keep an eye on things around here. |
| About | Curious | There's a person behind the pixels. This is the part where you meet him. |
| Journey | Thoughtful | No straight lines here. Just a string, some wind, and a lot of learning. |
| Projects | Proud | These are real: real users, real constraints, still being improved. |
| Experiments | Excited | This is where curiosity gets to break things on purpose. |
| Capabilities | Calm | Tools are useful. Knowing what to build with them is the real skill. |
| Writing | Thoughtful | A few thoughts that survived the editing pass. |
| Article | Calm | Longer thoughts. Take your time with this one. |
| Contact | Happy | Got something worth making? I'm listening. |
| Not found | Surprised | This string doesn't lead anywhere. Let's get you back to the field. |

The English copy is original to this project. Nepali lines still need to be authored and reviewed by a native speaker before launch.

## 6. Motion rules

- **Float:** transform-only `translate3d` + `rotateZ` loop. No layout or paint work.
- **Tail:** rotate + small horizontal drift, with the right tail offset from the left.
- **Gaze:** pointer tracking on fine pointers only; the body follows with `rotateX`/`rotateY` and the pupils move inside a clipped eye.
- **Settling:** pointer tracking uses `requestAnimationFrame` only while values are still moving, then stops. There is no permanent frame loop solely for the cursor.
- **Reduced motion:** float, tail, blink, and bubble entrance animations stop; transitions are removed; the play-all control is disabled. Expressions still switch.
- **Coarse pointers:** no pointer tracking. The character keeps its state and idle float.
- **Mobile:** the lab stacks the stage, the bubble points upward, and text/grid columns stay within the viewport.

## 7. Accessibility and layout rules

- The character is decorative: `aria-hidden="true"`, no focus target, no pointer capture.
- Speech bubbles must never cover navigation, forms, primary actions, or body copy.
- A bubble is announced through a polite live region only when it changes outside autoplay.
- The mascot must not intercept clicks or block selection. No invisible overlay should sit over content.
- Autoplay is off by default and stops when a state is selected or reduced motion is on.
- On touch and narrow screens, prefer a single static character with one short line rather than a following cursor.

## 8. Current prototype surface

`/kite-lab` exists only for review:

- Paper and aubergine surfaces.
- Ten expression buttons with notes.
- Ten section-dialogue buttons.
- Play-all cycle at 2.8 s intervals.
- Pointer-gaze preview.
- Static previews at 112, 72, 44, and 28 px.
- Mobile layout, reduced-motion behaviour, and noindex metadata.

It is deliberately unlinked from the site navigation and route tree. `html.kite-lab-mode` hides the Changa cursor while the lab is open. The route is lazy-loaded: the lab adds about 19.5 kB of JS (5.8 kB gzip) and 11.6 kB of CSS (2.8 kB gzip) only when `/kite-lab` is opened. The main site stylesheet does not include the character or lab rules.

## 9. Integration plan (after approval)

1. **Intro:** replace the original `Changa` illustration with the evolved rig in its `welcome` state. Keep the existing intro timing, skip control, replay, and reduced-motion path. Revert to the original if the new rig does not read at the intro's small size.
2. **Home hero:** place a medium `welcome` or `curious` kite in the hero, tracked to the pointer on fine-pointer devices.
3. **Footer:** use a small static `goodbye` or `calm` state. Confirm 28 px readability before shipping.
4. **Cursor:** the original Changa kite is restored as the pointer cursor at the owner's request. The evolved kite could replace it only if it does not obstruct reading. Keep the off switch and coarse-pointer fallback. A floating kite cursor can be more distracting than a still character, so any change still needs separate review.
5. **Section dialogue:** add one route-aware bubble per page, positioned in a reserved safe area. Dismiss after a few seconds or on scroll; remember dismissal for the session. Never place it over the hero heading, form, or project filters.
6. **Article pages:** use the `calm` state and a single short line, then let the reading experience take over.
7. **Nepali:** add `ne` dialogue with matching states, then have a native speaker review it.
8. **Cleanup:** retire the portrait cursor/hero/footer mascot work if the kite direction is confirmed, and update `docs/IMPLEMENTATION_STATUS.md` so the rendered state is accurate.

Do not integrate, commit, or push until the owner has reviewed `/kite-lab` and decided between the 2.5D rig and a true 3D pass.

## 10. Verification in this pass

- `npm run build` passes (TypeScript clean).
- `npm test` passes: 26/26 tests across 4 files.
- `/kite-lab` checked at 1440 px and 390 px: no horizontal overflow.
- All ten expressions switch the character, readout, and bubble in sync.
- All ten section buttons switch to the intended expression and line.
- Surface toggle changes the stage background and text colour.
- Pointer tracking updates pupil offset and body rotation, then settles.
- Play-all advances the state and keeps the readout and bubble in sync.
- Reduced motion disables float, tail, blink, bubble animation, and the play control.
- The Changa cursor is hidden in the lab; the robots meta tag reads `noindex, nofollow`.
- No console errors and no failed network requests in the verification run.

## 11. Not done

- No true WebGL/mesh version.
- No site-wide integration.
- No Nepali dialogue.
- No owner visual sign-off; screenshots were produced but the implementation could not judge them visually.
- No commit or push.
