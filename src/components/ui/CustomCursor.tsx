'use client';

import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if target or any parent is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')
        );
        setIsHovered(isInteractive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Ring */}
      <div
        className="fixed rounded-full border border-white/40 transition-transform duration-150 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '44px' : '26px',
          height: isHovered ? '44px' : '26px',
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.75 : isHovered ? 1.25 : 1})`,
          background: isHovered ? 'rgba(248, 250, 252, 0.08)' : 'transparent',
          borderColor: isHovered ? 'rgba(14, 165, 233, 0.6)' : 'rgba(248, 250, 252, 0.3)',
          boxShadow: isHovered ? '0 0 16px rgba(14, 165, 233, 0.25)' : 'none',
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed rounded-full bg-white transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '6px',
          height: '6px',
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.5 : isHovered ? 1.5 : 1})`,
          background: isHovered ? '#0ea5e9' : '#ffffff',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
        }}
      />
    </div>
  );
};
