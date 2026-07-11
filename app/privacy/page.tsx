import { LegalPage } from "@/components/chapters/LegalPage";

export default function PrivacyRoute() {
  return (
    <LegalPage title="Privacy Policy" eyebrow="Legal">
      <p>
        DostDrop respects your privacy. This policy describes how we collect, use, and protect information when you
        join our waitlist, contact us, or use our services.
      </p>
      <p>
        We collect information you provide directly — such as your name, email address, and messages — to respond to
        inquiries and share product updates.
      </p>
      <p>
        We do not sell your personal information. We use reasonable safeguards to protect data and retain it only as
        long as needed for the purposes described here.
      </p>
      <p>
        For questions about this policy, contact{" "}
        <a href="mailto:hello@dostdrop.com" className="text-teal-400 hover:text-teal-300">
          hello@dostdrop.com
        </a>
        .
      </p>
      <p className="text-sm text-slate-500">Last updated: 2026</p>
    </LegalPage>
  );
}
