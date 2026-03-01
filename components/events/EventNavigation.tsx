"use client";
import { Event } from "@/components/events/types/events";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import { CLIP_PATH } from "./constants/events";
import { EVENTS_DATA } from "@/data/eventsList";

interface Props {
  event: Event;
  onNavigate: (url: string) => void;
}

export default function EventNavigation({ event, onNavigate }: Props) {
  const desktopClipStyle = {
    "--desktop-clip": CLIP_PATH,
  } as React.CSSProperties;

  // Safely compare IDs regardless of whether they are strings or numbers
  const currentIndex = EVENTS_DATA.findIndex(
    (e) => String(e.id) === String(event.id),
  );

  console.log("Current Event ID:", event.id, typeof event.id);
  console.log("EVENTS_DATA IDs:", EVENTS_DATA.map(e => ({ id: e.id, type: typeof e.id })));
  console.log("Calculated Index:", currentIndex);

  // Calculate prev/next slugs strictly using the array index
  const prevSlug = currentIndex > 0 ? EVENTS_DATA[currentIndex - 1].slug : null;
  const nextSlug =
    currentIndex !== -1 && currentIndex < EVENTS_DATA.length - 1
      ? EVENTS_DATA[currentIndex + 1].slug
      : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prevSlug) {
        onNavigate(`/events/${prevSlug}`);
      } else if (e.key === "ArrowRight" && nextSlug) {
        onNavigate(`/events/${nextSlug}`);
      } else if (e.key === "Escape") {
        onNavigate("/events");
      }
    },
    [prevSlug, nextSlug, onNavigate],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <section className="sticky top-20 z-50">
      <div className="top-0 flex justify-between items-center w-full z-20 relative pt-4">
        <div className="flex items-center gap-2 md:gap-4">
          {prevSlug && (
            <button
              onClick={() => onNavigate(`/events/${prevSlug}`)}
              style={desktopClipStyle}
              className={`cursor-pointer flex items-center gap-1 md:gap-2 bg-white text-black hover:text-white hover:bg-red lg:active:bg-red/80 active:bg-white/80 duration-150 transition-all uppercase text-xs font-euclid tracking-wider group px-4 py-2 md:pl-8 md:pr-14 md:py-2 rounded-full md:rounded-none md:[clip-path:var(--desktop-clip)]`}
            >
              <ChevronLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />{" "}
              <span className="hidden md:inline">Prev</span>
            </button>
          )}

          <button
            onClick={() => onNavigate("/events")}
            style={desktopClipStyle}
            className={`cursor-pointer flex items-center gap-1 md:gap-2 bg-white text-black hover:text-white hover:bg-red lg:active:bg-red/80 active:bg-white/80 duration-150 transition-all uppercase text-xs font-euclid tracking-wider group px-4 py-2 md:pl-8 md:pr-14 md:py-2 rounded-full md:rounded-none md:[clip-path:var(--desktop-clip)]`}
          >
            All Events
          </button>
        </div>

        <div>
          {nextSlug && (
            <button
              onClick={() => onNavigate(`/events/${nextSlug}`)}
              style={desktopClipStyle}
              className={`cursor-pointer flex items-center gap-1 md:gap-2 bg-white text-black hover:text-white hover:bg-red lg:active:bg-red/80 active:bg-white/80 duration-150 transition-all uppercase text-xs font-euclid tracking-wider group px-4 py-2 md:pl-8 md:pr-14 md:py-2 rounded-full md:rounded-none md:[clip-path:var(--desktop-clip)]`}
            >
              <span className="hidden md:inline">Next</span>
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
