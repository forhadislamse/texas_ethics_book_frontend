import Link from "next/link";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-8 uppercase">Contact Us</h1>
        
        <div className="prose max-w-none text-gray-600 space-y-6">
          <p className="text-lg font-medium text-gray-800">Get in Touch with Our Team</p>
          
          <p>Have questions about the Texas Ethics Laws guide? Need assistance with your account or subscription? Our support team is here to help you.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Contact Information</h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Support Details</h3>
            <p className="mb-2"><strong>Email:</strong> support@texaseticslaws.com</p>
            <p className="mb-2"><strong>Phone:</strong> (555) 123-4567</p>
            <p className="mb-2"><strong>Fax:</strong> (555) 123-4568</p>
            <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM CST</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Mailing Address</h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Office Location</h3>
            <p className="mb-2">Cates Legal Group</p>
            <p className="mb-2">1234 Legal Plaza, Suite 500</p>
            <p className="mb-2">Austin, Texas 78701</p>
            <p>United States</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How Can We Help?</h2>
          
          <p>Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.</p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Common Inquiries</h3>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Account registration and access issues</li>
            <li>Subscription and billing questions</li>
            <li>Technical support and troubleshooting</li>
            <li>Content accuracy and updates</li>
            <li>Feature requests and suggestions</li>
            <li>Partnership and business inquiries</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Response Time</h2>
          
          <p>We strive to respond to all inquiries within 24-48 business hours. For urgent matters, please call us directly during business hours.</p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Need Immediate Assistance?</h3>
            <p className="mb-2">For urgent technical issues or account access problems, please call us at:</p>
            <p className="text-lg font-semibold text-blue-600">(555) 123-4567</p>
            <p className="mt-2 text-sm text-gray-600">Available Monday - Friday, 9:00 AM - 5:00 PM CST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;