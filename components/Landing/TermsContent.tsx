"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedSectionTitle } from "./AnimatedSectionTitle";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const termsAndConditions = [
    {
        title: "Use of Content",
        content: [
            "All logos, brands, marks headings, labels, names, signatures, numerals, shapes or any combinations thereof, appearing in this site, except as otherwise noted, are properties either owned, or used under licence, by the business and / or its associate entities who feature on this Website. The use of these properties or any other content on this site, except as provided in these terms and conditions or in the site content, is strictly prohibited.",
            "You may not sell or modify the content of this Website or reproduce, display, publicly perform, distribute, or otherwise use the materials in any way for any public or commercial purpose without the respective organisation's or entity's written permission.",
        ],
    },
    {
        title: "Acceptable Website Use",
        content: [],
        subsections: [
            {
                subtitle: "Security Rules",
                content: [
                    "Visitors are prohibited from violating or attempting to violate the security of the Web site, including, without limitation, (1) accessing data not intended for such user or logging into a server or account which the user is not authorised to access, (2) attempting to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without proper authorisation, (3) attempting to interfere with service to any user, host or network, including, without limitation, via means of submitting a virus or \"Trojan horse\" to the Website, overloading, \"flooding\", \"mail bombing\" or \"crashing\", or (4) sending unsolicited electronic mail, including promotions and/or advertising of products or services.",
                    "Violations of system or network security may result in civil or criminal liability. The business and / or its associate entities will have the right to investigate occurrences that they suspect as involving such violations and will have the right to involve, and cooperate with, law enforcement authorities in prosecuting users who are involved in such violations.",
                ],
            },
            {
                subtitle: "General Rules",
                content: [
                    "Visitors may not use the Web Site in order to transmit, distribute, store or destroy material (a) that could constitute or encourage conduct that would be considered a criminal offence or violate any applicable law or regulation, (b) in a manner that will infringe the copyright, trademark, trade secret or other intellectual property rights of others or violate the privacy or publicity of other personal rights of others, or (c) that is libellous, defamatory, pornographic, profane, obscene, threatening, abusive or hateful.",
                ],
            },
        ],
    },
    {
        title: "Indemnity",
        content: [
            "The User unilaterally agree to indemnify and hold harmless, without objection, the Company, its officers, directors, employees and agents from and against any claims, actions and/or demands and/or liabilities and/or losses and/or damages whatsoever arising from or resulting from their use of srijanju.in/merchandise or their breach of the terms.",
        ],
    },
    {
        title: "Liability",
        content: [
            "User agrees that neither Company nor its group companies, directors, officers or employee shall be liable for any direct or/and indirect or/and incidental or/and special or/and consequential or/and exemplary damages, resulting from the use or/and the inability to use the service or/and for cost of procurement of substitute goods or/and services or resulting from any goods or/and data or/and information or/and services purchased or/and obtained or/and messages received or/and transactions entered into through or/and from the service or/and resulting from unauthorized access to or/and alteration of user's transmissions or/and data or/and arising from any other matter relating to the service, including but not limited to, damages for loss of profits or/and use or/and data or other intangible, even if Company has been advised of the possibility of such damages.",
            "User further agrees that Company shall not be liable for any damages arising from interruption, suspension or termination of service, including but not limited to direct or/and indirect or/and incidental or/and special consequential or/and exemplary damages, whether such interruption or/and suspension or/and termination was justified or not, negligent or intentional, inadvertent or advertent.",
            "User agrees that Company shall not be responsible or liable to user, or anyone, for the statements or conduct of any third party of the service. In sum, in no event shall Company's total liability to the User for all damages or/and losses or/and causes of action exceed the amount paid by the User to Company, if any, that is related to the cause of action.",
        ],
    },
    {
        title: "Disclaimer of Consequential Damages",
        content: [
            "In no event shall Company or any parties, organizations or entities associated with the corporate brand name us or otherwise, mentioned at this Website be liable for any damages whatsoever (including, without limitations, incidental and consequential damages, lost profits, or damage to computer hardware or loss of data information or business interruption) resulting from the use or inability to use the Website and the Website material, whether based on warranty, contract, tort, or any other legal theory, and whether or not, such organization or entities were advised of the possibility of such damages.",
        ],
    },
];

const refundPolicy = [
    {
        title: "Cancellation Policy",
        content: [
            "If you ever find the need to make adjustments to your engagement, please reach out to us through the 'Contact Us' link on our website. We appreciate your understanding that initiation of cancellations is not a standard practice in our service structure.",
        ],
    },
    {
        title: "Resolution Commitment",
        content: [
            "In our commitment to providing you with exceptional service, we are dedicated to addressing any concerns or issues you may encounter during your engagement with us. We believe in open communication, and our team is ready to assist you in finding mutually agreeable solutions.",
            "For further assistance or clarification, please feel free to reach out to us. We highly value your feedback and strive to make your experience with Srijan a positive one.",
        ],
    },
];

export function TermsContent() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".terms-intro",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.utils.toArray<HTMLElement>(".terms-card").forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        delay: i * 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="w-full pt-32 sm:pt-40 pb-20 sm:pb-28 flex flex-col items-center gap-12 sm:gap-16 relative z-10"
        >
            {/* Page Title */}
            <AnimatedSectionTitle
                text="TERMS & CONDITIONS"
                className="text-3xl md:text-5xl lg:text-7xl font-elnath text-yellow flex justify-center text-center"
            />

            {/* Intro paragraph */}
            <p className="terms-intro font-euclid text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-4xl mx-6 sm:mx-10 lg:mx-auto text-center opacity-0">
                The terms &quot;We&quot; / &quot;Us&quot; / &quot;Our&quot; / &quot;Company&quot; individually and collectively refer to Srijan JU and the terms &quot;Visitor&quot; / &quot;User&quot; refer to the users. Please read this page carefully. If you do not accept the Terms and Conditions stated here, we would request you to exit this site. We reserve the right to revise these Terms and Conditions at any time by updating this posting. They are binding on all users of this Website.
            </p>

            {/* Decorative line */}
            <div className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-yellow to-transparent" />

            {/* Terms & Conditions sections */}
            <div className="w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-0 flex flex-col gap-8">
                {termsAndConditions.map((section, idx) => (
                    <article
                        key={idx}
                        className="terms-card rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 flex flex-col gap-4 opacity-0"
                    >
                        <h3 className="font-elnath text-xl sm:text-2xl md:text-3xl text-yellow tracking-wide uppercase">
                            {section.title}
                        </h3>
                        {section.content.map((para, pIdx) => (
                            <p
                                key={pIdx}
                                className="font-euclid text-sm sm:text-base md:text-lg text-white/70 leading-relaxed"
                            >
                                {para}
                            </p>
                        ))}
                        {section.subsections?.map((sub, sIdx) => (
                            <div key={sIdx} className="mt-2 flex flex-col gap-3 pl-4 border-l-2 border-yellow/30">
                                <h4 className="font-elnath text-lg sm:text-xl text-yellow/80 tracking-wide">
                                    {sub.subtitle}
                                </h4>
                                {sub.content.map((para, pIdx) => (
                                    <p
                                        key={pIdx}
                                        className="font-euclid text-sm sm:text-base md:text-lg text-white/70 leading-relaxed"
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </article>
                ))}
            </div>

            {/* Divider between the two policy sections */}
            <div className="flex flex-col items-center gap-8 sm:gap-12 w-full mt-8 sm:mt-12">
                <div className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-yellow to-transparent" />

                <AnimatedSectionTitle
                    text="REFUND & CANCELLATION"
                    className="text-3xl md:text-5xl lg:text-7xl font-elnath text-yellow flex justify-center text-center"
                />

                <p className="terms-intro font-euclid text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-4xl mx-6 sm:mx-10 lg:mx-auto text-center">
                    At Srijan, our primary goal is to ensure your satisfaction with our services. We appreciate your trust in us and would like to outline our policy regarding cancellations and resolutions.
                </p>

                <div className="w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-0 flex flex-col gap-8">
                    {refundPolicy.map((section, idx) => (
                        <article
                            key={idx}
                            className="terms-card rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 flex flex-col gap-4 opacity-0"
                        >
                            <h3 className="font-elnath text-xl sm:text-2xl md:text-3xl text-yellow tracking-wide uppercase">
                                {section.title}
                            </h3>
                            {section.content.map((para, pIdx) => (
                                <p
                                    key={pIdx}
                                    className="font-euclid text-sm sm:text-base md:text-lg text-white/70 leading-relaxed"
                                >
                                    {para}
                                </p>
                            ))}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
