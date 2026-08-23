import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  /* near-1:1 tracking — stiff spring reads as instant without pixel jitter */
  const rx = useSpring(x, { stiffness: 1100, damping: 65, mass: 0.18 });
  const ry = useSpring(y, { stiffness: 1100, damping: 65, mass: 0.18 });

  const [label, setLabel] = useState<string | null>(null);
  const [linkHover, setLinkHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.body.classList.add('has-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const tagged = el.closest?.('[data-cursor]') as HTMLElement | null;
      setLabel(tagged ? tagged.dataset.cursor || null : null);
      setLinkHover(
        !!(el.closest as Function)?.call(el, 'a, button, input, [role="button"]')
      );
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const outWin = (e: MouseEvent) => {
      if (!e.relatedTarget && !(e as MouseEvent & { toElement?: Node }).toElement) {
        setVisible(false);
        setLabel(null);
      }
    };
    const inWin = () => setVisible(true);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', outWin);
    document.documentElement.addEventListener('mouseenter', inWin);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', outWin);
      document.documentElement.removeEventListener('mouseenter', inWin);
      document.body.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* dot — zero lag */}
      <motion.div
        className="cursor-dot"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.55 : 1 }}
        transition={{ duration: 0.12 }}
      />
      {/* ring — hair-thin trailing spring, fills on interactives */}
      <motion.div
        className="cursor-ring"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className={`ring${label ? ' labeled' : ''}`}
          animate={{
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.72 : label ? 1 : linkHover ? 1.7 : 1,
            backgroundColor: label || linkHover ? '#c6ff3d' : 'rgba(198,255,61,0)',
          }}
          transition={{ type: 'spring', stiffness: 520, damping: 32 }}
        >
          {label && <span className="lbl">{label}</span>}
        </motion.div>
      </motion.div>
    </>
  );
}