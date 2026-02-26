import { Metadata } from "next";
import { TermsContent } from "@/components/Landing/TermsContent";

export const metadata: Metadata = {
    title: "Terms & Conditions | SRIJAN'26",
    description:
        "Terms and Conditions, Refund and Cancellation Policy for SRIJAN'26, the annual Techno-Management fest of Jadavpur University.",
};

const TermsPage = () => {
    return <TermsContent />;
};

export default TermsPage;