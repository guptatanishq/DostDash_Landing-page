import { LegalPage } from "@/components/chapters/LegalPage";

export default function TermsRoute() {
  return (
    <LegalPage title="Terms of Service" eyebrow="Legal">
      <p>
        By using DostDrop or joining our waitlist, you agree to these terms. DostDrop connects customers with travelers
        already headed in a useful direction — we facilitate matching, tracking, and payment, not traditional courier
        services.
      </p>
      <p>
        Users are responsible for accurate request details, lawful items, and respectful conduct. Travelers are
        independent participants, not employees of DostDrop.
      </p>
      <p>
        Service availability varies by city and launch phase. Features, pricing, and policies may change as we grow.
      </p>
      <p>
        Questions? Reach us at{" "}
        <a href="mailto:hello@dostdrop.com" className="text-teal-400 hover:text-teal-300">
          hello@dostdrop.com
        </a>
        .
      </p>
      <p className="text-sm text-slate-500">Last updated: 2026</p>
    </LegalPage>
  );
}
