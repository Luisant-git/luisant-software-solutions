/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function RefundPolicy() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title and Date */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tight mb-2">Refund Policy for Luisant Software Solutions</h1>
          <p className="text-sm font-semibold text-slate-500">Effective Date: 18-02-2026</p>
        </div>

        {/* Section 1: Scope */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">1. Scope</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            This Refund Policy applies to all subscription products and services offered by Luisant Software Solutions ("we", "our", "us") through our SaaS platforms including <a href="https://www.luisant.in" className="text-primary hover:underline font-semibold">www.luisant.in</a> and <a href="https://whatsapp.luisant.cloud" className="text-primary hover:underline font-semibold">whatsapp.luisant.cloud</a>.
          </p>
        </section>

        {/* Section 2: Subscription Services */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">2. Subscription Services</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Products and services are provided on a subscription basis. Once a subscription payment is made and access is granted, refunds are generally not provided except in cases described below.
          </p>
        </section>

        {/* Section 3: Refund Conditions */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">3. Refund Conditions</h2>
          <p className="text-sm text-slate-700 mb-4 font-semibold">Refunds may be considered under the following conditions:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4 mb-6">
            <li className="flex gap-3">
              <span className="text-primary font-bold">🔹</span>
              <span>Service not activated by our team within 48 hours after payment.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">🔹</span>
              <span>Technical issues preventing access to the service that cannot be resolved within 7 days.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">🔹</span>
              <span>Duplicate payment confirmed by our support team.</span>
            </li>
          </ul>

          <p className="text-sm text-slate-700 mb-4 font-semibold">Refunds will NOT be issued for:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-red-500 font-bold">❌</span>
              <span>Change of mind</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold">❌</span>
              <span>Failure to understand features</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold">❌</span>
              <span>Services already rendered</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Partial Refunds */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">4. Partial Refunds</h2>
          <p className="text-sm text-slate-700 mb-4 font-semibold">Partial refunds may be granted at discretion for:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✔</span>
              <span>Billing errors</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✔</span>
              <span>Pro-rated unused subscription period (if applicable)</span>
            </li>
          </ul>
        </section>

        {/* Section 5: Requesting a Refund */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">5. Requesting a Refund</h2>
          <p className="text-sm text-slate-700 mb-4">
            Refund requests must be submitted in writing to:
          </p>
          <p className="text-sm text-slate-700 mb-4 font-semibold">
            📩 Email: <a href="mailto:info@luisantsoftwares.com" className="text-primary hover:underline font-semibold">info@luisantsoftwares.com</a>
          </p>
          <p className="text-sm text-slate-700 mb-4 font-semibold">Include:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Customer name</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Order/Invoice number</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Reason for request</span>
            </li>
          </ul>
        </section>

        {/* Section 6: Processing Time */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">6. Processing Time</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Approved refunds will be processed within 7–10 business days via the original payment method.
          </p>
        </section>

        {/* Section 7: Modifications */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-secondary mb-4">7. Modifications</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            We may update this Refund Policy at any time. Changes will be posted on this page.
          </p>
        </section>
      </div>
    </div>
  );
}
