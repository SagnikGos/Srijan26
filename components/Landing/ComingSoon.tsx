"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedSectionTitle } from "./AnimatedSectionTitle";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function ComingSoon() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.fromTo(
                ".coming-soon-line",
                { scaleX: 0 },
                { scaleX: 1, duration: 0.8, ease: "power2.out" }
            )
                .fromTo(
                    ".coming-soon-text",
                    { opacity: 0, y: 30, filter: "blur(6px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(
                    ".coming-soon-dots span",
                    { opacity: 0, scale: 0 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        stagger: 0.15,
                        ease: "back.out(3)",
                    },
                    "-=0.5"
                );

            // Pulsing dot animation (loops forever)
            gsap.to(".coming-soon-dots span", {
                opacity: 0.3,
                duration: 0.8,
                stagger: { each: 0.2, repeat: -1, yoyo: true },
                ease: "sine.inOut",
                delay: 1.5,
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="w-full py-24 sm:py-32 lg:py-40 flex flex-col items-center gap-8 relative z-10"
        >
            {/* Section Title */}
            <AnimatedSectionTitle
                text="COMING SOON"
                className="text-4xl md:text-5xl lg:text-7xl font-elnath text-yellow flex justify-center text-center"
            />

            {/* Decorative line */}
            <div className="coming-soon-line w-24 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-yellow to-transparent origin-center scale-x-0" />

            {/* Subtitle */}
            <p className="coming-soon-text font-euclid text-lg sm:text-xl md:text-2xl text-white/60 tracking-widest uppercase text-center px-4">
                Something exciting is in the works
            </p>

            {/* Animated dots */}
            <div className="coming-soon-dots flex gap-3 mt-2">
                <span className="block w-2.5 h-2.5 rounded-full bg-yellow opacity-0" />
                <span className="block w-2.5 h-2.5 rounded-full bg-yellow opacity-0" />
                <span className="block w-2.5 h-2.5 rounded-full bg-yellow opacity-0" />
            </div>
        </section>
    );
}
