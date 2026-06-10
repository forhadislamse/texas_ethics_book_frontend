import Link from "next/link";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-8 uppercase">Terms & Conditions</h1>
        
        <div className="prose max-w-none text-gray-600 space-y-6">
          <p className="text-lg font-medium text-gray-800">Last Updated: January 2026</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using the Texas Ethics Laws digital guide ("the Service"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use the Service.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Subscription & Billing</h2>
          <p>Access to certain features of the Service requires a paid subscription. By subscribing, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Provide accurate and complete billing information</li>
            <li>Pay all charges at the rates in effect at the time</li>
            <li>Authorize us to charge your chosen payment method</li>
            <li>All subscriptions auto-renew unless canceled prior to renewal date</li>
            <li>Refunds are provided in accordance with our refund policy</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Account Registration</h2>
          <p>You must create an account to access the Service. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. You must notify us immediately of any unauthorized use.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Intellectual Property</h2>
          <p>The Texas Ethics Laws digital guide, including all text, graphics, layouts, and software, is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Share your account credentials with third parties</li>
            <li>Use any automated means to access or scrape the Service</li>
            <li>Interfere with the proper functioning of the Service</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Limitation of Liability</h2>
          <p>The Texas Ethics Laws digital guide is provided "as is" without any warranty. Cates Legal Group shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service. The legal content provided is for educational purposes and does not constitute legal advice.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Termination</h2>
          <p>We reserve the right to suspend or terminate your access to the Service at any time for violation of these terms. Upon termination, your right to use the Service will immediately cease.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Changes to Terms</h2>
          <p>We may update these terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service after changes constitutes acceptance of the new terms.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. Contact Information</h2>
          <p>For questions about these Terms & Conditions, please contact us through our support channels.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;