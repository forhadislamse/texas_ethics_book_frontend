/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Twitter, Linkedin, Phone, User } from "lucide-react";
// import Logo from "@/src/assets/logo2.png";
// import { Button } from "@/components/ui/button";
// import { useGetMeQuery } from "@/redux/api/authApi";
// import { useAppSelector } from "@/redux/hooks";

// const Navbar = () => {
//     const token = useAppSelector((state) => state.auth.token);
//     const { data: userData, isLoading } = useGetMeQuery(undefined, { skip: !token });
//     const user = (userData as any)?.data;

//     return (
//         <header className="w-full bg-white shadow-sm sticky top-0 z-50">
//             {/* Top Bar */}
//             <div className="w-full bg-[#1E293B] text-white py-2 px-6">
//                 <div className="container mx-auto flex justify-between items-center text-xs md:text-sm font-medium">
//                     <div className="flex items-center gap-4">
//                         <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400 transition-colors">
//                             <Twitter size={14} />
//                         </Link>
//                         <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-400 transition-colors">
//                             <Linkedin size={14} />
//                         </Link>
//                     </div>
                    
//                     <div className="flex items-center gap-2 italic">
//                         <Phone size={14} className="text-blue-400" />
//                         <span>Call Today : +64 210-823-3301</span>
//                     </div>

//                     <div className="hidden md:block">
//                         <span className="text-gray-400 italic">Trusted Legal Excellence</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Navbar */}
//             <nav className="border-b border-gray-100">
//                 <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//                     {/* Logo */}
//                     <Link href="/" className="flex items-center gap-2 group">
//                         <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform group-hover:scale-105">
//                             <Image
//                                 src={Logo.src}
//                                 alt="Texas Law Books Logo"
//                                 fill
//                                 className="object-contain"
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <span className="text-xl md:text-2xl font-bold  text-[#1E293B] leading-none">TEXAS LAW</span>
//                             <span className="text-xs md:text-sm text-blue-600 font-bold tracking-widest uppercase">Books</span>
//                         </div>
//                     </Link>

//                     {/* Links */}
//                     <div className="hidden md:flex items-center gap-8">
//                         <Link href="/" className="text-[#1E293B] font-semibold hover:text-blue-600 transition-colors uppercase text-sm tracking-wide">
//                             Home
//                         </Link>
//                         <Link href="/user/reader" className="text-[#1E293B] font-semibold hover:text-blue-600 transition-colors uppercase text-sm tracking-wide">
//                             Guide Reader
//                         </Link>
//                         <Link href="/about" className="text-[#1E293B] font-semibold hover:text-blue-600 transition-colors uppercase text-sm tracking-wide">
//                             About
//                         </Link>
                        
//                         {isLoading ? (
//                             <div className="w-20 h-8 bg-gray-100 animate-pulse rounded-lg" />
//                         ) : user ? (
//                             <Link href={user.role === "ADMIN" ? "/admin/dashboard" : "/user/reader"}>
//                                 <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 font-bold uppercase text-xs tracking-widest">
//                                     <User size={14} className="mr-2" /> {user.fullName || "Account"}
//                                 </Button>
//                             </Link>
//                         ) : (
//                             <Link href="/login">
//                                 <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 font-bold uppercase text-xs tracking-widest">
//                                     <User size={14} className="mr-2" /> Login
//                                 </Button>
//                             </Link>
//                         )}
//                     </div>

//                     {/* Mobile Menu Button Placeholder */}
//                     <div className="md:hidden">
//                          <Button variant="ghost" size="icon">
//                              <span className="sr-only">Open menu</span>
//                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                              </svg>
//                          </Button>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// };

// export default Navbar;
"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Phone, User } from "lucide-react";
import Logo from "@/src/assets/logo2.png";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
    const token = useAppSelector((state) => state.auth.token);
    const { data: userData, isLoading } = useGetMeQuery(undefined, { skip: !token });
    const user = (userData as any)?.data;

    // কোন লিংকের ওপর মাউস আছে তা ট্র্যাক করার জন্য স্টেট
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // নেভিগেশন লিংকগুলোর ডাটা
    const navLinks = [
        { id: 1, name: "Home", href: "/" },
        { id: 2, name: "Guide Reader", href: "/user/reader" },
        { id: 3, name: "About", href: "/about" },
    ];

    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            {/* Top Bar */}
            <div className="w-full bg-[#1E293B] text-white py-2 px-6">
                <div className="container mx-auto flex justify-between items-center text-xs md:text-sm font-medium">
                    <div className="flex items-center gap-4">
                        <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400 transition-colors">
                            <Twitter size={14} />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-400 transition-colors">
                            <Linkedin size={14} />
                        </Link>
                    </div>
                    
                    <div className="flex items-center gap-2 italic">
                        <Phone size={14} className="text-blue-400" />
                        <span>Call Today : +64 210-823-3301</span>
                    </div>

                    <div className="hidden md:block">
                        <span className="text-gray-400 italic">Trusted Legal Excellence</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar (সাদা ব্যাকগ্রাউন্ড যা ডার্ক ক্যাপসুলটিকে ফুটিয়ে তুলবে) */}
            <nav className="w-full bg-white border-b border-gray-100 py-4">
                <div className="container mx-auto px-6 flex justify-center items-center">
                    
                    {/* Dribbble Style: ONE SINGLE DARK CAPSULE FOR EVERYTHING */}
                    <div className="hidden md:flex items-center justify-between bg-[#1E293B] pl-4 pr-2 py-2 rounded-full w-full max-w-4xl shadow-xl border border-gray-800">
                        
                        {/* 1. Inside Capsule - Left: Rounded Logo */}
                        <Link href="/" className="flex items-center gap-3 group z-10 no-underline">
                            <div className="relative w-10 h-10 transition-transform group-hover:scale-105 bg-white rounded-full overflow-hidden flex items-center justify-center border border-gray-700 shadow-inner">
                                <Image
                                    src={Logo.src}
                                    alt="Texas Law Books Logo"
                                    fill
                                    className="object-cover p-1.5 rounded-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-white leading-none tracking-wide">TEXAS LAW</span>
                                <span className="text-[9px] text-blue-400 font-bold tracking-widest uppercase mt-0.5">Books</span>
                            </div>
                        </Link>

                        {/* 2. Inside Capsule - Center: Links with sliding bubble & clock flick */}
                        <div 
                            className="flex items-center gap-1 relative"
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    className="relative px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full z-10 no-underline block overflow-hidden h-8"
                                >
                                    {/* স্লাইডিং হোয়াইট বাবল */}
                                    {hoveredIndex === index && (
                                        <motion.span
                                            layoutId="dribbble-full-bubble"
                                            className="absolute inset-0 bg-white rounded-full -z-10"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}

                                    {/* আপ-ডাউন ফ্লিক টেক্সট */}
                                    <div className="relative flex flex-col h-4 overflow-hidden">
                                        <motion.span 
                                            className="block h-4 leading-4 text-white"
                                            animate={{ y: hoveredIndex === index ? "-100%" : "0%" }}
                                            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                                        >
                                            {link.name}
                                        </motion.span>
                                        
                                        <motion.span 
                                            className="absolute top-0 left-0 block h-4 leading-4 text-[#1E293B]"
                                            animate={{ y: hoveredIndex === index ? "0%" : "100%" }}
                                            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                                        >
                                            {link.name}
                                        </motion.span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* 3. Inside Capsule - Right: Login/Account Button */}
                        <div className="z-10">
                            {isLoading ? (
                                <div className="w-20 h-8 bg-gray-700 animate-pulse rounded-full" />
                            ) : user ? (
                                <Link href={user.role === "ADMIN" ? "/admin/dashboard" : "/user/reader"}>
                                    <Button className="bg-white hover:bg-gray-100 text-[#1E293B] rounded-full px-5 py-1.5 font-bold uppercase text-xs tracking-widest transition-all border-0 h-8 flex items-center">
                                        <User size={12} className="mr-1.5" /> {user.fullName || "Account"}
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/login">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-1.5 font-bold uppercase text-xs tracking-widest transition-all border-0 h-8 flex items-center shadow-md">
                                        <User size={12} className="mr-1.5" /> Login
                                    </Button>
                                </Link>
                            )}
                        </div>

                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden w-full flex justify-between items-center bg-[#1E293B] p-3 rounded-full shadow-lg">
                        <Link href="/" className="flex items-center gap-2">
                             <span className="text-white font-bold text-sm">TEXAS LAW</span>
                        </Link>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800 rounded-full">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                             </svg>
                        </Button>
                    </div>

                </div>
            </nav>
        </header>
    );
};

export default Navbar;