/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function PrivacyPolicy() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title and Date */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tight mb-2">Privacy Policy — WhatsApp Communications</h1>
          <p className="text-sm font-semibold text-slate-500">Last updated: 31 August 2025</p>
        </div>

        {/* Company Info */}
        <div className="mb-8 text-sm text-slate-700 space-y-2 leading-relaxed">
          <p><strong>Who we are:</strong> <strong>Luisant Software Solutions</strong>, registered at <strong>288/6, 2nd Floor, NM Complex, ARRS Multiplex Road, Salem</strong> ("we", "us", "our").</p>
          <p><strong>Contact:</strong> <a href="mailto:info@luisantsoftwares.com" className="text-primary hover:underline font-semibold">info@luisantsoftwares.com</a> | <a href="tel:+919994683263" className="text-primary hover:underline font-semibold">+91 9994683263</a></p>
          <p><strong>Grievance Officer (India):</strong> Arunkarthick, <a href="mailto:arun@luisant.in" className="text-primary hover:underline font-semibold">arun@luisant.in</a>, 288/6, 2nd Floor, NM Complex, ARRS Multiplex Road, Salem, +91 9994683263</p>
        </div>

        {/* Overview */}
        <div className="mb-10 text-sm text-slate-700 leading-relaxed space-y-4">
          <p>This privacy policy explains how we handle personal data when you interact with us on <strong>WhatsApp</strong> (including messages initiated by you or by us using approved templates) and when we process WhatsApp data via the <strong>Meta WhatsApp Business Platform</strong> (Cloud/API). It supplements our main website/app privacy policy.</p>
          <p>We use the WhatsApp Business Platform to send/receive messages, notifications, and support responses. For our Cloud/API setup, <strong>Meta hosts the WhatsApp Business Client and processes message content and related data for us as our processor</strong> under applicable data processing and hosting terms.</p>
        </div>

        {/* When you message us */}
        <div className="mb-3">
          <p className="text-sm text-slate-700 mb-4 font-semibold">When you message us (or opt in to receive messages), we may process:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Identifiers:</strong> your WhatsApp phone number, profile name, and (if present) profile image name/URL</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Message data:</strong> text, photos, videos, documents, voice notes you send; our replies; timestamps; delivery/read signals</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Interaction data:</strong> opt-in/opt-out records, message template category (e.g., utility, marketing), support ticket references</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Technical/meta data:</strong> message IDs, error codes, and webhook events from Meta/WhatsApp (no call audio or E2E keys)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Account context (if you are our customer):</strong> order IDs, service requests, or other details you provide during chat</span>
            </li>
          </ul>
        </div>

        {/* How we use your data */}
        <div className="mb-10">
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Provide <strong>customer support</strong> and respond to your inquiries</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Send <strong>transactional/service</strong> updates (e.g., order status, reminders)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Marketing/Promotions (only with consent):</strong> new arrivals, offers, and updates (you can opt out at any time)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Prevent fraud/abuse, secure our services, and comply with law</span>
            </li>
          </ul>
        </div>

        {/* Legal Basis */}
        <div className="mb-10 text-sm text-slate-700 leading-relaxed">
          <p>We rely on your <strong>consent/opt-in</strong> for business-initiated messages and, where applicable, our <strong>legitimate interests</strong> (e.g., replying to your message). <strong>We only message people who shared their number with us and who have given opt-in permission</strong>; we keep proof of opt-in.</p>
        </div>

        {/* Opt-in */}
        <div className="mb-8">
          <p className="text-sm font-bold text-slate-900 mb-2"><strong>Opt-in:</strong></p>
          <p className="text-sm text-slate-700 leading-relaxed">We collect clear permission before sending you WhatsApp messages. Our opt-in explains that you agree to receive WhatsApp messages from <strong>Luisant Software Solutions</strong>, what type, and how to opt out.</p>
        </div>

        {/* Opt-out */}
        <div className="mb-10">
          <p className="text-sm font-bold text-slate-900 mb-2"><strong>Opt-out anytime:</strong></p>
          <p className="text-sm text-slate-700 leading-relaxed">Reply <strong>"STOP"</strong> (or <strong>"UNSUBSCRIBE"</strong>) on WhatsApp, message us <strong>"OPT OUT"</strong>, or block our number. We will record your opt-out and stop business-initiated messages.</p>
        </div>

        {/* Data Sharing */}
        <div className="mb-10">
          <p className="text-sm text-slate-700 mb-4 font-semibold">We do <strong>not sell</strong> personal data. We share data only with:</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Service providers</strong> who help us operate WhatsApp messaging, support, hosting, and security (bound by contracts)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Meta/WhatsApp</strong> as our processor for Cloud API hosting and message delivery, under applicable terms</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Authorities or third parties</strong> when required by law, to enforce our rights, or to prevent harm</span>
            </li>
          </ul>
        </div>

        {/* Data Transfers */}
        <div className="mb-10 text-sm text-slate-700 leading-relaxed">
          <p>Where data moves outside your country (e.g., to the EEA/US), transfers occur under appropriate safeguards such as <strong>Standard Contractual Clauses (SCCs)</strong> or other legally recognized mechanisms.</p>
        </div>

        {/* Data Retention */}
        <div className="mb-10">
          <p className="text-sm text-slate-700 mb-4 font-semibold">We keep WhatsApp data only as long as needed for the purposes above, legal requirements, or dispute resolution.</p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Messages and media:</strong> retained up to 24 months</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Opt-in / Opt-out logs:</strong> retained up to 5 years for compliance</span>
            </li>
          </ul>
          <p className="text-sm text-slate-700 mt-4">Backups follow the same limits.</p>
        </div>

        {/* Security */}
        <div className="mb-10 text-sm text-slate-700 leading-relaxed">
          <p>We apply administrative, technical, and physical safeguards to protect your data (access controls, encryption in transit, logging, staff training). No method is 100% secure, but we continuously improve our protections.</p>
        </div>

        {/* Children's Privacy */}
        <div className="mb-10 text-sm text-slate-700 leading-relaxed">
          <p>Our WhatsApp channel is not directed to children. If you believe a child has provided data, contact us to delete it. <strong>Age threshold:</strong> under 18 years (unless local law sets a higher age).</p>
        </div>

        {/* Your Rights */}
        <div className="mb-10">
          <p className="text-sm text-slate-700 mb-4 font-semibold">Subject to local law, you may have rights to <strong>access</strong>, <strong>correct</strong>, <strong>delete</strong>, <strong>restrict</strong>, <strong>object</strong>, <strong>port</strong> data, and <strong>withdraw consent</strong>.</p>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-slate-900 mb-2"><strong>How to exercise:</strong></p>
              <p className="text-sm text-slate-700 leading-relaxed">Email <a href="mailto:info@luisantsoftwares.com" className="text-primary hover:underline font-semibold">info@luisantsoftwares.com</a> or message us on WhatsApp at <a href="https://wa.me/919994683263" className="text-primary hover:underline font-semibold">+91 9994683263</a>.</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mb-2"><strong>EU/UK GDPR users:</strong></p>
              <p className="text-sm text-slate-700 leading-relaxed">We act as controller for our business purposes; Meta/WhatsApp may act as our <strong>processor</strong> for Cloud API functions. You may also contact WhatsApp Ireland/your supervisory authority.</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mb-2"><strong>India (DPDP Act 2023):</strong></p>
              <p className="text-sm text-slate-700 leading-relaxed">Contact our <strong>Grievance Officer</strong> above to raise a request or complaint; we aim to resolve within statutory timelines.</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mb-2"><strong>California (CPRA):</strong></p>
              <p className="text-sm text-slate-700 leading-relaxed">We do not "sell" or "share" personal information as defined by CPRA.</p>
            </div>
          </div>
        </div>

        {/* Automated Decision Making */}
        <div className="mb-10 text-sm text-slate-700 leading-relaxed">
          <p>We may use autoresponders or chat automation to route/support your request. We do <strong>not</strong> make decisions producing legal or similarly significant effects solely by automated means without human review.</p>
        </div>

        {/* Third-Party Links */}
        <div className="mb-10 text-sm text-slate-700 leading-relaxed">
          <p>Links we send on WhatsApp may lead to third-party sites with their own privacy policies. Review them before submitting personal data.</p>
        </div>

        {/* Policy Updates */}
        <div className="mb-10 text-sm text-slate-700 leading-relaxed">
          <p>We may update this policy to reflect changes to laws or our practices. We will post the updated date above and, where required, notify you in WhatsApp or on our site before changes take effect.</p>
        </div>

        {/* Message Types */}
        <div className="mb-10">
          <p className="text-sm font-bold text-slate-900 mb-4"><strong>A. Types of messages we may send</strong></p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Utility/Service:</strong> order confirmations, delivery updates, reminders</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Authentication/Support:</strong> one-time codes, ticket updates</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>Marketing/Promotions:</strong> because you opted in (<strong>Yes</strong>), you may receive offers and updates; you can opt out at any time</span>
            </li>
          </ul>
        </div>

        {/* Your Controls */}
        <div className="mb-10">
          <p className="text-sm font-bold text-slate-900 mb-4"><strong>B. Your controls</strong></p>
          <ul className="text-sm text-slate-700 space-y-3 ml-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Reply <strong>"STOP/UNSUBSCRIBE/OPT OUT"</strong> to cease business-initiated messages</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Block our WhatsApp number in your app settings</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Delete the WhatsApp conversation on your device (does not affect our lawful retention records)</span>
            </li>
          </ul>
        </div>

        {/* Meta/WhatsApp Terms */}
        <div className="mb-12">
          <p className="text-sm font-bold text-slate-900 mb-4"><strong>C. Meta/WhatsApp terms reference</strong></p>
          <p className="text-sm text-slate-700 leading-relaxed">Our use of WhatsApp is subject to the <strong>WhatsApp Business Messaging Policy</strong>, <strong>Get Opt-in</strong> rules, <strong>Business Data Processing Terms</strong>, <strong>Data Transfer mechanisms</strong>, and <strong>Cloud API Hosting Terms</strong>.</p>
        </div>
      </div>
    </div>
  );
}
