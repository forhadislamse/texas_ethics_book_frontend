"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetAllPlansQuery } from "@/redux/api/planApi";
import { Search, BookOpen, ShieldCheck, CreditCard, ChevronRight, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LandingPage() {
    const { data: plans, isLoading } = useGetAllPlansQuery(undefined);
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32 bg-[#F8FAFC]">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-5xl lg:text-7xl font-bold text-[#1E293B] font-outfit leading-tight mb-6">
                                    Texas Ethics Laws — The Complete <span className="text-blue-600">Legal Practice Guide</span>
                                </h1>
                                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                                    Master over 550 pages of annotated ethics rules, statutes, and case law in one comprehensive, searchable digital volume. Built for the modern Texas practitioner.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/user/reader">
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-blue-200 uppercase">
                                            PREVIEW THE GUIDE <ChevronRight className="ml-2" />
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button size="lg" variant="outline" className="border-2 border-gray-200 px-8 py-7 rounded-xl text-lg font-bold hover:bg-white hover:border-blue-600 hover:text-blue-600 transition-all uppercase">
                                            START SUBSCRIPTION
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-30 transform -rotate-12 translate-x-12 translate-y-12"></div>
                            <div className="relative bg-white p-2 rounded-3xl shadow-2xl border border-gray-100">
                                <div className="bg-[#1E293B] h-[500px] w-full rounded-2xl flex items-center justify-center p-12 text-center text-white">
                                    <div>
                                        <h3 className="text-4xl font-bold font-outfit uppercase tracking-widest mb-4">Texas Ethics Laws</h3>
                                        <div className="h-1 w-20 bg-blue-500 mx-auto mb-8"></div>
                                        <p className="text-xl font-light italic">9th Edition — 10.23</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 font-outfit uppercase">Master Every Aspect of Legal Ethics</h2>
                    <p className="text-gray-600 mb-16 max-w-2xl mx-auto italic text-lg">A powerful tool designed for the modern legal practice.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Search />, title: "Immediate Search", desc: "Find any rule, annotation, or citation instantly with real-time indexing." },
                            { icon: <BookOpen />, title: "Cross-Reference", desc: "Seamless links between related sections, case law, and opinions." },
                            { icon: <ShieldCheck />, title: "Authentic Data", desc: "Digitized exactly from the source PDF for 100% accuracy." },
                            { icon: <CreditCard />, title: "Flexible Access", desc: "Manage your professional subscription with simple Stripe integration." }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-outfit uppercase">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 font-outfit uppercase">Simple Access Plans for the Digital Guide</h2>
                    <p className="text-gray-600 mb-16 max-w-2xl mx-auto text-lg italic">
                        Choose the plan that fits your needs and get instant access to the Texas Ethics Laws digital practice guide.
                    </p>
                    
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {plans?.data?.map((plan: any) => (
                                <div 
                                    key={plan.id} 
                                    className={`p-10 rounded-3xl border flex flex-col h-full relative transition-all duration-300 ${
                                        plan.isPopular 
                                        ? "bg-[#1E293B] text-white border-blue-500 shadow-2xl ring-4 ring-blue-500/20 scale-105 z-10" 
                                        : "bg-white text-gray-900 border-gray-100 shadow-sm hover:shadow-md"
                                    }`}
                                >
                                    {plan.isPopular && (
                                        <div className="absolute top-4 right-4 rotate-12 bg-blue-600 text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-tighter text-white">
                                            Recommended
                                        </div>
                                    )}
                                    
                                    <div className="mb-8">
                                        <h3 className={`text-xl font-bold uppercase mb-2 ${plan.isPopular ? "text-blue-400" : "text-gray-900"}`}>
                                            {plan.name}
                                        </h3>
                                        <div className="text-4xl font-bold font-outfit">
                                            ${plan.price}
                                            <span className={`text-lg font-normal ${plan.isPopular ? "text-gray-400" : "text-gray-400"}`}>
                                                /{plan.duration === 'yearly' ? 'yr' : 'mo'}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="text-left space-y-4 mb-10 flex-grow">
                                        {plan.features?.map((feature: string, idx: number) => (
                                            <li key={idx} className={`flex items-center gap-3 italic ${plan.isPopular ? "text-white" : "text-gray-600"}`}>
                                                <Check size={18} className={plan.isPopular ? "text-blue-400" : "text-green-500"} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/register">
                                        <Button 
                                            className={`w-full py-6 rounded-xl font-bold uppercase tracking-widest transition-all ${
                                                plan.isPopular 
                                                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/40" 
                                                : "border-2 hover:border-blue-600 hover:text-blue-600"
                                            }`}
                                            variant={plan.isPopular ? "default" : "outline"}
                                        >
                                            {plan.price === 0 ? "Get Started" : "Subscribe Now"}
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 font-outfit uppercase">Unlock the complete digital guide today.</h2>
                    <Link href="/register">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-8 rounded-2xl text-xl font-bold uppercase tracking-widest transition-all shadow-2xl">START YOUR SUBSCRIPTION</Button>
                    </Link>
                    <p className="text-blue-100 mt-8 font-light italic text-lg">Trusted by Texas Legal Professionals.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="font-outfit font-bold text-2xl tracking-tighter text-[#1E293B]">
                        CATES <span className="text-blue-600">LEGAL</span>
                    </div>
                    <div className="text-gray-400 text-sm italic">
                        © 2026 Cates Legal Group. All rights reserved. Texas Ethics Laws 9th Edition.
                    </div>
                    <div className="flex gap-6">
                        <Link href="/terms" className="text-gray-400 hover:text-blue-600 text-sm underline decoration-gray-200">Terms</Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-blue-600 text-sm underline decoration-gray-200">Privacy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
