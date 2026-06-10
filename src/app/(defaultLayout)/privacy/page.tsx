import Link from "next/link";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-8 uppercase">Privacy Policy</h1>
        
        <div className="prose max-w-none text-gray-600 space-y-6">
          <p className="text-lg font-medium text-gray-800">Last Updated: January 2026</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Account Information:</strong> Name, email address, phone number, and password when you create an account</li>
            <li><strong>Payment Information:</strong> Billing details and payment method information (processed securely through our payment processor)</li>
            <li><strong>Usage Data:</strong> Information about how you use the Service, including pages viewed, reading progress, and bookmarks</li>
            <li><strong>Device Information:</strong> IP address, browser type, and device identifiers</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Provide, maintain, and improve the Service</li>
            <li>Process your subscription and payments</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, prevent, and address technical issues and fraud</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee the absolute security of your data.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Data Sharing & Disclosure</h2>
          <p>We do not sell your personal information. We may share your data with:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Service Providers:</strong> Third-party vendors who help us provide the Service (payment processing, hosting, analytics)</li>
            <li><strong>Legal Requirements:</strong> If required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Cookies</h2>
          <p>We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings. Essential cookies are required for the Service to function properly.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a copy of your data</li>
            <li>Cancel your subscription at any time</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Third-Party Services</h2>
          <p>The Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Children's Privacy</h2>
          <p>The Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from minors.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">10. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us through our support channels.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;