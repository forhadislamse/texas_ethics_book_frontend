
// import Link from "next/link";
// import Image from "next/image";
// import { toast } from "sonner";
// import { toast } from "sonner";
// import facebookIcon from "@/src/assets/social_icons/facebook.png";
// import instagramIcon from "@/src/assets/social_icons/instagram.png";
// import twitterIcon from "@/src/assets/social_icons/twitter.png";
// import googleIcon from "@/src/assets/social_icons/google.png";

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   const handleSubscribe = async (e) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       toast.error("Please enter your email address");
//       return;
//     }

//     setIsSubscribing(true);

//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
//       const response = await fetch(`${baseUrl}/newsletter/subscribe`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: email.trim() }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to subscribe");
//       }
//       toast.success(data.message || "Successfully subscribed to the newsletter");
//       setEmail("");
//     } catch (error) {
//       toast.error(error.message || "Unable to subscribe at this time. Please try again later.");
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <footer className="bg-[#0F172A] text-white">
//       <div className="container mx-auto px-6 py-16">
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
//           {/* Brand Column */}
//           <div className="lg:col-span-1">
//             <div className="font-bold text-2xl tracking-tighter text-white mb-4">
//               CATES <span className="text-blue-500">LEGAL</span>
//             </div>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Your trusted source for Texas Ethics Laws digital practice guide. Master over 550 pages of annotated ethics rules, statutes, and case law.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link href="/" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Home</Link>
//               </li>
//               <li>
//                 <Link href="/user/reader" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Reader</Link>
//               </li>
//               <li>
//                 <Link href="/#pricing" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Pricing</Link>
//               </li>
//               <li>
//                 <Link href="/terms" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Terms of Service</Link>
//               </li>
//               <li>
//                 <Link href="/privacy" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Privacy Policy</Link>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Support</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link href="/faq" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">FAQ</Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Contact Us</Link>
//               </li>
//               <li>
//                 <Link href="/help" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Help Center</Link>
//               </li>
//             </ul>
//           </div>

//           {/* Social & Newsletter */}
//           <div>
//             <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Follow Us</h3>
//             <div className="flex items-center gap-4 mb-8">
//               <Link href="https://facebook.com" target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all hover:scale-110">
//                 <Image src={facebookIcon} alt="Facebook" width={20} height={20} />
//               </Link>
//               <Link href="https://instagram.com" target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all hover:scale-110">
//                 <Image src={instagramIcon} alt="Instagram" width={20} height={20} />
//               </Link>
//               <Link href="https://twitter.com" target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
//                 <Image src={twitterIcon} alt="Twitter" width={20} height={20} />
//               </Link>
//               <Link href="https://google.com" target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-red-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
//                 <Image src={googleIcon} alt="Google" width={20} height={20} />
//               </Link>
//             </div>
//             <p className="text-gray-400 text-sm mb-3">Subscribe to our newsletter</p>
//             <form onSubmit={handleSubscribe} className="flex">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Your email"
//                 className="bg-gray-800 text-white text-sm px-4 py-2.5 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-700"
//                 disabled={isSubscribing}
//                 disabled={isSubscribing}
//               />
//               <button
//                 type="submit"
//                 disabled={isSubscribing}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-r-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubscribing ? "Subscribing..." : "Subscribe"}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-800 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-gray-500 text-xs">
//               � 2026 Cates Legal Group. All rights reserved. Texas Ethics Laws 9th Edition.
//             </p>
//             <div className="flex items-center gap-2 text-gray-500 text-xs">
//               <span>Powered by</span>
//               <span className="font-bold text-white text-sm tracking-tight">CATES <span className="text-blue-500">LEGAL</span></span>
//             </form>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import facebookIcon from "@/src/assets/social_icons/facebook.png";
import instagramIcon from "@/src/assets/social_icons/instagram.png";
import twitterIcon from "@/src/assets/social_icons/twitter.png";
import googleIcon from "@/src/assets/social_icons/google.png";

interface NewsletterSubscribePayload {
  email: string;
}

interface NewsletterSubscribeResponse {
  message?: string;
}

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubscribing(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const payload: NewsletterSubscribePayload = { email: email.trim() };
      const response = await fetch(`${baseUrl}/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      const data = (await response.json()) as NewsletterSubscribeResponse;
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }
      
      toast.success(data.message || "Successfully subscribed to the newsletter!");
      setEmail("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to subscribe at this time. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="font-bold text-2xl tracking-tighter text-white mb-4">
              CATES <span className="text-blue-500">LEGAL</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for Texas Ethics Laws digital practice guide. Master over 550 pages of annotated ethics rules, statutes, and case law.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/user/reader" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Reader</Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">Help Center</Link>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Follow Us</h3>
            <div className="flex items-center gap-4 mb-8">
              <Link href="https://facebook.com" target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Image src={facebookIcon} alt="Facebook" width={20} height={20} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Image src={instagramIcon} alt="Instagram" width={20} height={20} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Image src={twitterIcon} alt="Twitter" width={20} height={20} />
              </Link>
              <Link href="https://google.com" target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-red-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Image src={googleIcon} alt="Google" width={20} height={20} />
              </Link>
            </div>
            <p className="text-gray-400 text-sm mb-3">Subscribe to our newsletter</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="bg-gray-800 text-white text-sm px-4 py-2.5 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-700"
                disabled={isSubscribing}
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-r-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              &copy; 2026 Cates Legal Group. All rights reserved. Texas Ethics Laws 9th Edition.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <span>Powered by</span>
              <span className="font-bold text-white text-sm tracking-tight">CATES <span className="text-blue-500">LEGAL</span></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
