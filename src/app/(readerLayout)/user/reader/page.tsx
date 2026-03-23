"use client";

import { useGetAllChaptersQuery } from "@/redux/api/guideApi";
import { 
    BookOpen, 
    Search, 
    ChevronRight, 
    Layers, 
    ArrowUpRight,
    SearchCheck,
    Library
} from "lucide-react";
import Link from "next/link";

export default function GuideReaderPage() {
    const { data: chapters, isLoading } = useGetAllChaptersQuery(undefined);

    if (isLoading) {
        return <div className="animate-pulse space-y-12 max-w-6xl mx-auto">
            <div className="space-y-4">
                <div className="h-4 bg-gray-50 rounded w-1/6"></div>
                <div className="h-16 bg-gray-50 rounded w-1/2"></div>
                <div className="h-6 bg-gray-50 rounded w-1/3"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-48 bg-gray-50/50 rounded-3xl border border-gray-100"></div>
                ))}
            </div>
        </div>;
    }

    return (
        <div className="space-y-16 pb-20 max-w-6xl mx-auto animate-in fade-in duration-700">
            <header className="space-y-8">
                <nav className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-6">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Digital Platform</Link>
                    <ChevronRight size={12} className="opacity-30" />
                    <span className="text-gray-900">Legal Library</span>
                </nav>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                            <Library size={12} />
                            Universal Access
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-[#0F172A] tracking-tighter leading-none">
                            Legal Practice <br className="hidden md:block" />
                            Guide.
                        </h1>
                        <p className="text-xl text-gray-400 font-medium max-w-xl leading-relaxed">
                            A comprehensive, digital-first repository of professional rules, annotations, and regulatory commentary.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {chapters?.data?.map((chapter: any) => (
                    <Link
                        key={chapter.id}
                        href={`/user/reader/chapter/${chapter.id}`}
                        className="group relative flex flex-col p-10 rounded-[2.5rem] border border-gray-100 bg-white hover:border-blue-500 hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.15)] transition-all duration-500 overflow-hidden"
                    >
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[2.5rem] -mr-12 -mt-12 transition-all duration-500 group-hover:bg-blue-50/50 group-hover:scale-150" />
                        
                        <div className="relative z-10 flex flex-col h-full uppercase">
                            <div className="flex items-start justify-between mb-8">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-blue-600 tracking-[0.2em]">
                                            Chapter {chapter.number}
                                        </span>
                                        {chapter.code && (
                                            <>
                                                <div className="w-1 h-1 rounded-full bg-gray-200" />
                                                <span className="text-[10px] font-black text-gray-400 tracking-[0.1em]">{chapter.code}</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="h-0.5 w-6 bg-blue-600 transform origin-left group-hover:scale-x-150 transition-transform" />
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#0F172A] group-hover:text-white transition-all transform group-hover:rotate-12">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-4 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                                {chapter.title}
                            </h3>
                            
                            <div className="mt-auto pt-8 flex items-center justify-between border-t border-gray-50">
                                <span className="text-[10px] font-black text-gray-400 tracking-widest">
                                    {chapter._count?.sections || 0} Professional Entries
                                </span>
                                <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                    OPEN VOLUME
                                    <ArrowUpRight size={14} />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <section className="bg-[#0F172A] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-gray-200">
                 <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-600/10 rounded-tl-full -mr-32 -mb-32 blur-3xl" />
                 
                 <div className="relative z-10 max-w-2xl space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-sm">
                        <SearchCheck size={12} className="text-blue-400" />
                        Internal Intelligence
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        Precision search for <br />
                        legal professionals.
                    </h2>
                    <p className="text-gray-400 text-lg font-medium leading-relaxed">
                        Our integrated cross-reference system allows you to hover over citations and instantly view related summaries without leaving your current volume.
                    </p>
                    <div className="pt-4">
                        <button className="px-8 py-4 bg-blue-600 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30">
                            Explore Search Features
                        </button>
                    </div>
                 </div>
            </section>
        </div>
    );
}

