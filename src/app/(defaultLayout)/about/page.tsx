
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Quote, GraduationCap, Award, MapPin, Phone, Mail, BookOpen, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import AuthorImage from "@/src/assets/author.jpeg";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[400px] lg:min-h-[450px] flex items-center pt-24 pb-0 bg-[#0F172A]">
                <div className="absolute inset-0 bg-linear-to-r from-[#0F172A] via-[#0F172A]/95 to-[#0F172A]/40 z-10" />
                <div className="container mx-auto px-6 relative z-20">
                    <div className="max-w-3xl">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
                            <ChevronLeft className="h-4 w-4" />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 uppercase tracking-tight">
                            About the Author
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-2xl font-light italic">
                            The story behind Texas Ethics Laws Annotated — the definitive legal practice guide for Texas.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Bio Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-[#0F172A] rounded-[2.5rem] p-10 lg:p-16 text-white relative overflow-hidden">
                            {/* Background decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-bl-full -mr-32 -mt-32" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-tr-full -ml-24 -mb-24" />
                            
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 relative z-10">
                                {/* Left: Photo + Quick Info */}
                                <div className="lg:col-span-1">
                                    <div className="space-y-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            className="relative"
                                        >
                                            <div className="w-48 h-48 lg:w-56 lg:h-56 mx-auto lg:mx-0 rounded-2xl overflow-hidden border-4 border-blue-500/30 shadow-2xl">
                                                <Image
                                                    src={AuthorImage}
                                                    alt="Andrew Cates - Author of Texas Ethics Laws"
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </motion.div>
                                        
                                        <div className="text-center lg:text-left">
                                            <h3 className="text-2xl font-black tracking-tight">Andrew Cates</h3>
                                            <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mt-1">Political Attorney & Author</p>
                                        </div>

                                        <div className="space-y-2.5 border-t border-white/10 pt-6">
                                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                                <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                                                Austin, Texas
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                                                512-426-4593
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                                                andrew@andrewcates.com
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {["Political Attorney", "Author", "Strategist", "Entrepreneur"].map((tag) => (
                                                <span key={tag} className="px-3 py-1.5 bg-blue-500/10 text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-500/20">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Bio Content */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Quote */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="flex items-start gap-4 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10"
                                    >
                                        <Quote className="h-8 w-8 text-blue-400 shrink-0 mt-1" />
                                        <p className="text-gray-300 italic leading-relaxed text-lg">
                                            &ldquo;My name is Andy Cates, and I have been a combination of the two most hated professions in the world &mdash; Lawyer & Lobbyist. And I&rsquo;ll prove to you why that&rsquo;s a good thing.&rdquo;
                                        </p>
                                    </motion.div>

                                    {/* Story */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Andrew&rsquo;s Story</h4>
                                        <p className="text-gray-300 leading-relaxed">
                                            Andrew Cates is the owner of <strong className="text-white">Cates Legal Group PLLC</strong> where he provides legal guidance to candidates, political action committees and nonprofits in local, state, and federal legislative & campaign law. He is the author of <strong className="text-white">Texas Ethics Laws Annotated</strong>, the first and only complete legal annotation of campaign finance and lobby laws in Texas, now in the 9th edition. Cates is one of only 15 attorneys in the United States with a legal certification in <strong className="text-white">Legislative & Campaign Law</strong>.
                                        </p>
                                        <p className="text-gray-300 leading-relaxed">
                                            Cates previously served as General Counsel and Director of Government Affairs for the Texas Nurses Association, where he spent three legislative sessions leading advocacy efforts to secure over $25 million in state funding to end the nurse shortage. Prior to that role, he served as legislative attorney for the Texas Association of REALTORS&reg; as well as lead attorney for the Texas Association of REALTORS&reg; Political Action Committee, the largest PAC in Texas.
                                        </p>
                                        <p className="text-gray-300 leading-relaxed">
                                            In the years leading up to this practice, Andrew spent three years at the Texas Capitol working for various state representatives and clerking the House Committee on Criminal Jurisprudence, lobbied for solar energy and healthcare clients, and worked in various areas of the law including mergers & acquisitions, healthcare, criminal prosecution, and criminal defense.
                                        </p>
                                        <p className="text-gray-300 leading-relaxed">
                                            Cates is a <strong className="text-white">Founding Member and Board Member</strong> for the State Bar of Texas Legislative & Campaign Law Section, where he spearheaded the petition to create the nation&rsquo;s first legal specialization in Legislative & Campaign Law. Andrew received his B.A. in International Politics from Trinity University and his J.D. from Texas Tech School of Law in 2007. He currently lives in Central Texas with his wife Nicole and son Dylan.
                                        </p>
                                    </motion.div>

                                    {/* Education */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
                                    >
                                        <div className="flex items-start gap-4 p-5 bg-white/5 rounded-xl border border-white/10">
                                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                                                <GraduationCap className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-white text-sm">Texas Tech University School of Law</h5>
                                                <p className="text-xs text-gray-400 mt-1">Graduated in 2007 &bull; Admitted to practice law in Texas</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-5 bg-white/5 rounded-xl border border-white/10">
                                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                                                <Award className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-white text-sm">Trinity University</h5>
                                                <p className="text-xs text-gray-400 mt-1">B.A. in International Politics &bull; Minor in Spanish &bull; 2004</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 uppercase">Get the 9th Edition Today.</h2>
                    <Link href="/#pricing">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-8 rounded-2xl text-xl font-bold uppercase tracking-widest transition-all shadow-2xl">START YOUR SUBSCRIPTION</Button>
                    </Link>
                    <p className="text-blue-100 mt-8 font-light italic text-lg">Trusted by Texas Legal Professionals.</p>
                </div>
            </section>
        </div>
    );
}