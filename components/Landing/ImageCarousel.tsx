"use client";
import Image from "next/image";

const galleryImages: CarouselImage[] = Array.from({ length: 52 }).map((_, i) => ({
  src: `/images/gallery/${i + 1}.webp`,
  label: "Previous Edition",
}));
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatedSectionTitle } from "./AnimatedSectionTitle";

export interface CarouselImage {
  src: string;
  label: string;
}

interface CardStyle {
  transform: string;
  zIndex: number;
  opacity: number;
  filter: string;
  pointerEvents: "auto" | "none";
}

// All offsets are expressed as fractions of card width so they scale naturally
function getCardStyle(pos: number, cardW: number, cardH: number): CardStyle {
  const side = cardW * 0.34; // how far left/right the ±1 cards sit
  const far = cardW * 0.58; // how far left/right the ±2 cards sit
  const depth1 = cardH * 0.5;
  const depth2 = cardH * 0.92;
  const depth3 = cardH * 1.46;

  switch (pos) {
    case 0:
      return {
        transform: `translateX(0px) translateZ(0px) scale(1) rotateY(0deg)`,
        zIndex: 10,
        opacity: 1,
        filter: "brightness(1)",
        pointerEvents: "none",
      };
    case 1:
      return {
        transform: `translateX(${side}px) translateZ(-${depth1}px) rotateY(-15deg) scale(0.88)`,
        zIndex: 8,
        opacity: 0.85,
        filter: "brightness(0.75)",
        pointerEvents: "auto",
      };
    case -1:
      return {
        transform: `translateX(-${side}px) translateZ(-${depth1}px) rotateY(15deg) scale(0.88)`,
        zIndex: 8,
        opacity: 0.85,
        filter: "brightness(0.75)",
        pointerEvents: "auto",
      };
    case 2:
      return {
        transform: `translateX(${far}px) translateZ(-${depth2}px) rotateY(-25deg) scale(0.75)`,
        zIndex: 5,
        opacity: 0.5,
        filter: "brightness(0.5)",
        pointerEvents: "auto",
      };
    case -2:
      return {
        transform: `translateX(-${far}px) translateZ(-${depth2}px) rotateY(25deg) scale(0.75)`,
        zIndex: 5,
        opacity: 0.5,
        filter: "brightness(0.5)",
        pointerEvents: "auto",
      };
    default:
      return {
        transform: `translateX(0px) translateZ(-${depth3}px) scale(0.6)`,
        zIndex: 1,
        opacity: 0,
        filter: "brightness(0.3)",
        pointerEvents: "none",
      };
  }
}

function getPos(index: number, current: number, total: number): number {
  let pos = (((index - current) % total) + total) % total;
  if (pos > total / 2) pos -= total;
  return Math.max(-3, Math.min(3, pos));
}

interface CarouselProps {
  images?: CarouselImage[];
}

export function Carousel({ images = galleryImages }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const sceneRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const n = images.length;

  const btnClipPath = "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

  // Measure the scene container and update on resize
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const h = w * (9 / 16); // maintain 16:9 ratio
      setDims({ w, h });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const navigate = useCallback(
    (dir: number) => setCurrent((prev) => (((prev + dir) % n) + n) % n),
    [n],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) navigate(dx < 0 ? 1 : -1);
  };

  const { w: cardW, h: cardH } = dims;

  return (
    <div className="full-bleed py-20 relative flex flex-col items-center justify-center px-4 sm:px-16 md:px-32 overflow-hidden">

      {/* Title */}
      <div className="mb-12 relative z-20 w-full">
        <AnimatedSectionTitle
          text="Glimpse of Srijan"
          className="text-4xl md:text-5xl lg:text-7xl font-elnath text-yellow text-center"
        />
      </div>

      {/*
        The scene wrapper takes up most of the viewport width (capped at a
        comfortable max) and drives all card sizing through ResizeObserver.
      */}
      <div
        className="w-full relative z-10"
        style={{ maxWidth: "min(820px, 90vw)" }}
        ref={sceneRef}
      >
        <div
          className="relative w-full"
          style={{
            height: cardH || "auto",
            aspectRatio: cardH ? undefined : "16/9",
            perspective: cardW ? cardW * 3.5 : 1400,
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {cardW > 0 &&
              images.map((img, i) => {
                const pos = getPos(i, current, n);

                // PERFORMANCE OPTIMIZATION: Only render cards that are relatively close to the current view
                // Math.abs(pos) <= 3 means we only render the center card + 3 on each side
                // The rest are completely unmounted from the DOM
                if (Math.abs(pos) > 3) return null;

                const cardStyle = getCardStyle(pos, cardW, cardH);

                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (pos === 1) navigate(1);
                      else if (pos === -1) navigate(-1);
                    }}
                    style={{
                      position: "absolute",
                      width: cardW,
                      height: cardH,
                      borderRadius: Math.max(12, cardW * 0.025),
                      overflow: "hidden",
                      cursor: pos !== 0 ? "pointer" : "default",
                      boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
                      transition: "all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
                      backfaceVisibility: "hidden",
                      border: pos === 0 ? "2px solid rgba(235,216,125,0.4)" : "1px solid rgba(255,255,255,0.1)",
                      ...cardStyle,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover block"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.65))",
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Caption removed to avoid duplication with SectionTitle */}

      {/* Descriptive Text */}
      <div className="relative z-20 mt-8 mb-4 max-w-2xl px-4 text-center mx-auto">
        <p className="text-sm sm:text-base font-inter text-gray-300">
          Experience the incredible energy, innovation, and legacy of Srijan.
          A journey through our past editions celebrating technology, management, and culture.
        </p>
      </div>

      {/* Controls */}
      <div className="relative z-20 flex justify-center items-center gap-6 sm:gap-10">
        <button
          onClick={() => navigate(-1)}
          className="group w-14 h-10 sm:w-16 sm:h-12 flex items-center justify-center bg-yellow text-black hover:bg-[#ffe88a] active:bg-red active:text-white active:scale-95 transition-all duration-150 cursor-pointer"
          style={{ clipPath: btnClipPath }}
          aria-label="Previous"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 group-active:translate-x-0 transition-transform duration-200" />
        </button>

        <div className="flex bg-[#1a1a1a] px-4 py-2 rounded-full border border-yellow/20 items-center gap-3">
          <span className="text-yellow font-euclid text-sm font-medium tracking-widest">
            {current + 1} / {n}
          </span>
        </div>


        <button
          onClick={() => navigate(1)}
          className="group w-14 h-10 sm:w-16 sm:h-12 flex items-center justify-center bg-yellow text-black hover:bg-[#ffe88a] active:bg-red active:text-white active:scale-95 transition-all duration-150 cursor-pointer"
          style={{ clipPath: btnClipPath }}
          aria-label="Next"
        >
          <ArrowRight size={20} className="group-hover:translate-x-1 group-active:translate-x-0 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}

