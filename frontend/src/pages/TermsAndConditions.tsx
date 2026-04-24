/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function TermsAndConditions() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title and Date */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tight mb-2">Terms & Conditions</h1>
          <p className="text-sm font-semibold text-slate-500">Effective Date: 18-02-2026</p>
        </div>

        {/* Section 1: Introduction */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">1. Introduction</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Welcome to Luisant Software Solutions ("Company", "we", "our", "us"). These Terms & Conditions govern your use of our website <a href="https://www.luisant.in" className="text-primary hover:underline font-semibold">www.luisant.in</a> and our SaaS platforms including <a href="https://whatsapp.luisant.cloud" className="text-primary hover:underline font-semibold">whatsapp.luisant.cloud</a>.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed mt-4">
            By accessing or using our services, you agree to be bound by these Terms.
          </p>
        </section>

        {/* Section 2: Services Provided */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">2. Services Provided</h2>
          <p className="text-sm text-slate-700 mb-4 font-semibold">Luisant Software Solutions provides:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>SaaS-based CRM and ERP systems</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>WhatsApp Cloud API integration services</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Business automation tools</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Billing and lead management software</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Subscription-based digital software solutions</span>
            </li>
          </ul>
          <p className="text-sm text-slate-700 leading-relaxed mt-4">
            All services are delivered digitally via secure web platforms.
          </p>
        </section>

        {/* Section 3: User Accounts */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">3. User Accounts</h2>
          <p className="text-sm text-slate-700 mb-4">
            To access certain services, users may be required to create an account.
          </p>
          <p className="text-sm text-slate-700 mb-4 font-semibold">You agree to:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Provide accurate information</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Maintain confidentiality of login credentials</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Be responsible for activities under your account</span>
            </li>
          </ul>
          <p className="text-sm text-slate-700 leading-relaxed mt-4">
            We reserve the right to suspend accounts for misuse or policy violations.
          </p>
        </section>

        {/* Section 4: Subscription & Payments */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">4. Subscription & Payments</h2>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Services are offered on a subscription or service-fee basis.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Payments are processed securely through third-party payment gateways such as Razorpay.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>We do not store card details on our servers.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>By making a payment, you agree to our Refund Policy.</span>
            </li>
          </ul>
        </section>

        {/* Section 5: Refunds & Cancellations */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">5. Refunds & Cancellations</h2>
          <p className="text-sm text-slate-700 mb-4">
            Refunds are governed by our Refund Policy available at:
          </p>
          <p className="text-sm text-slate-700 mb-4">
            👉 <a href="https://www.luisant.in/refund-policy" className="text-primary hover:underline font-semibold">https://www.luisant.in/refund-policy</a>
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            We reserve the right to deny refunds where services have already been rendered.
          </p>
        </section>

        {/* Section 6: Acceptable Use */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">6. Acceptable Use</h2>
          <p className="text-sm text-slate-700 mb-4 font-semibold">Users agree NOT to:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Use the platform for illegal activities</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Send spam or abusive messages</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Violate WhatsApp or Meta platform policies</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Attempt to hack, disrupt, or reverse engineer the system</span>
            </li>
          </ul>
          <p className="text-sm text-slate-700 leading-relaxed mt-4">
            Violation may result in immediate account suspension.
          </p>
        </section>

        {/* Section 7: Third-Party Integrations */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">7. Third-Party Integrations</h2>
          <p className="text-sm text-slate-700 mb-4 font-semibold">Our services may integrate with:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Meta (WhatsApp Cloud API)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Payment gateways (e.g., Razorpay)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Cloud hosting providers</span>
            </li>
          </ul>
          <p className="text-sm text-slate-700 leading-relaxed mt-4">
            We are not responsible for service disruptions caused by third-party platforms.
          </p>
        </section>

        {/* Section 8: Intellectual Property */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">8. Intellectual Property</h2>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>All software, content, and materials provided by Luisant Software Solutions remain our intellectual property.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Users are granted a limited, non-transferable license to use the platform during the subscription period.</span>
            </li>
          </ul>
        </section>

        {/* Section 9: Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">9. Limitation of Liability</h2>
          <p className="text-sm text-slate-700 mb-4 font-semibold">We shall not be liable for:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Indirect or consequential losses</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Business interruption</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Data loss caused by third-party platforms</span>
            </li>
          </ul>
          <p className="text-sm text-slate-700 leading-relaxed mt-4">
            Our total liability shall not exceed the amount paid for the service in the previous billing cycle.
          </p>
        </section>

        {/* Section 10: Termination */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">10. Termination</h2>
          <p className="text-sm text-slate-700 mb-4 font-semibold">We reserve the right to:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Suspend or terminate services for policy violations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Discontinue services with reasonable notice</span>
            </li>
          </ul>
          <p className="text-sm text-slate-700 leading-relaxed mt-4">
            Users may cancel subscriptions as per agreed billing terms.
          </p>
        </section>

        {/* Section 11: Data Protection */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">11. Data Protection</h2>
          <p className="text-sm text-slate-700 mb-4">
            User data is handled in accordance with our Privacy Policy:
          </p>
          <p className="text-sm text-slate-700">
            👉 <a href="/privacy-policy" className="text-primary hover:underline font-semibold">https://www.luisant.in/privacy-policy/</a>
          </p>
        </section>

        {/* Section 12: Governing Law */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-secondary mb-4">12. Governing Law</h2>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>These Terms shall be governed by the laws of India.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Any disputes shall be subject to the jurisdiction of courts in Tamil Nadu, India.</span>
            </li>
          </ul>
        </section>

        {/* Section 13: Contact Information */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-secondary mb-4">13. Contact Information</h2>
          <div className="text-sm text-slate-700 space-y-2">
            <p><strong>Luisant Software Solutions</strong></p>
            <p>Website: <a href="https://www.luisant.in" className="text-primary hover:underline font-semibold">https://www.luisant.in</a></p>
            <p>Email: <a href="mailto:info@luisantsoftwares.com" className="text-primary hover:underline font-semibold">info@luisantsoftwares.com</a></p>
            <p>Phone: <a href="tel:+919080356538" className="text-primary hover:underline font-semibold">+91 90803 56538</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
