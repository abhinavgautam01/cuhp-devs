"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, select, textarea, summary, [data-cursor='pointer']";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(false);
  const hoveringRef = useRef(false);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-enabled");

    let rafId = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    const update = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(update);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const nextHoverState = !!(event.target as Element | null)?.closest(INTERACTIVE_SELECTOR);
      if (nextHoverState !== hoveringRef.current) {
        hoveringRef.current = nextHoverState;
        setHovering(nextHoverState);
      }
    };

    const handleMouseDown = () => {
      setPressed(true);
    };

    const handleMouseUp = () => {
      setPressed(false);
    };

    const handleWindowLeave = (event: MouseEvent) => {
      if (!event.relatedTarget && visibleRef.current) {
        visibleRef.current = false;
        setVisible(false);
      }
    };

    const handleWindowEnter = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("mouseout", handleWindowLeave, { passive: true });
    window.addEventListener("mouseover", handleWindowEnter, { passive: true });

    rafId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseout", handleWindowLeave);
      window.removeEventListener("mouseover", handleWindowEnter);
      document.documentElement.classList.remove("custom-cursor-enabled");
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`app-cursor app-cursor-dot ${visible ? "is-visible" : ""} ${pressed ? "is-pressed" : ""}`}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`app-cursor app-cursor-ring ${visible ? "is-visible" : ""} ${hovering ? "is-hover" : ""} ${pressed ? "is-pressed" : ""}`}
      />
    </>
  );
}