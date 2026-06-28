import Link from "next/link";

const HelpCenterPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-8 uppercase">Help Center</h1>
        
        <div className="prose max-w-none text-gray-600 space-y-6">
          <p className="text-lg font-medium text-gray-800">Welcome to the Texas Ethics Laws Help Center</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Frequently Asked Questions</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How do I access the Texas Ethics Laws guide?</h3>
          <p>You can access the guide by creating an account on our platform. Once registered, you can subscribe to our services to get full access to all chapters and sections.</p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How do I search for specific laws or sections?</h3>
          <p>Use the search bar at the top of the dashboard to search by section number, title, or keywords. You can also filter results by chapter using the dropdown filter.</p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How can I cancel my subscription?</h3>
          <p>You can cancel your subscription at any time from your account settings. Navigate to Settings → Subscription and click on "Cancel Subscription". Your access will continue until the end of your billing period.</p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Is the legal content up to date?</h3>
          <p>Yes, we regularly update our content to reflect the latest changes in Texas ethics laws. Our team monitors legislative updates and ensures the guide is current.</p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Can I access the guide on mobile devices?</h3>
          <p>Yes, our platform is fully responsive and works on all devices including desktops, tablets, and mobile phones.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Need Additional Help?</h2>
          <p>If you couldn't find the answer to your question, please don't hesitate to reach out to our support team. We're here to help!</p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Support</h3>
            <p className="mb-2">Email: support@texaseticslaws.com</p>
            <p className="mb-2">Phone: (555) 123-4567</p>
            <p>Business Hours: Monday - Friday, 9:00 AM - 5:00 PM CST</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Topics</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Account & Registration</li>
            <li>Subscription & Billing</li>
            <li>Accessing Content</li>
            <li>Technical Issues</li>
            <li>Legal Content Questions</li>
            <li>Feature Requests</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;