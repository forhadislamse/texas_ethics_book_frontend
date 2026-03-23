"use client";

import { useGetChapterByIdQuery } from "@/redux/api/guideApi";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
    ChevronRight, 
    BookOpen, 
    Lock, 
    ChevronLeft, 
    ArrowRight,
    Search,
    BookMarked
} from "lucide-react";

export default function ChapterDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: chapter, isLoading } = useGetChapterByIdQuery(id);

    if (isLoading) {
        return <div className="animate-pulse space-y-12 max-w-5xl mx-auto">
            <div className="h-6 bg-gray-50 rounded w-1/4"></div>
            <div className="space-y-4">
                <div className="h-16 bg-gray-50 rounded w-3/4"></div>
                <div className="h-6 bg-gray-50 rounded w-1/2"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-24 bg-gray-50/50 rounded-2xl border border-gray-100"></div>
                ))}
            </div>
        </div>;
    }

    if (!chapter?.data) {
        return <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200 max-w-2xl mx-auto mt-20">
            <BookMarked className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Chapter Not Found</h2>
            <Link href="/user/reader" className="text-blue-600 font-bold hover:underline">Return to Guide</Link>
        </div>;
    }

    const { number, title, sections, isLocked, code, titleLevel, subtitleLevel } = chapter.data;

    // Grouping sections by subchapter
    const sectionsBySubchapter = sections?.reduce((acc: any, section: any) => {
        const sub = section.subChapter || "_NONE_";
        if (!acc[sub]) acc[sub] = [];
        acc[sub].push(section);
        return acc;
    }, {});

    return (
        <div className="space-y-16 pb-20 max-w-5xl mx-auto animate-in fade-in duration-500">
            <header className="space-y-10">
                <nav className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-6">
                    <Link href="/user/reader" className="hover:text-blue-600 transition-colors">Digital Library</Link>
                    <ChevronRight size={12} className="opacity-30" />
                    <span className="text-gray-900">Chapter {number}</span>
                </nav>

                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                        {code && (
                            <div className="bg-[#0F172A] text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.25em] shadow-xl shadow-gray-200 border border-gray-800">
                                {code}
                            </div>
                        )}
                        <div className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.25em] shadow-xl shadow-blue-100">
                            Chapter {number}
                        </div>
                        {isLocked && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black border border-amber-100 uppercase tracking-widest leading-none">
                                <Lock size={12} strokeWidth={3} />
                                Subscription Required
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {(titleLevel || subtitleLevel) && (
                             <div className="space-y-1">
                                {titleLevel && <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none">{titleLevel}</p>}
                                {subtitleLevel && <p className="text-[10px] font-bold text-blue-500/70 uppercase tracking-[0.2em] leading-none">{subtitleLevel}</p>}
                             </div>
                        )}
                        <h1 className="text-4xl md:text-7xl font-black text-[#0F172A] leading-[1.05] tracking-tight">
                            {title}
                        </h1>
                    </div>
                    
                    <p className="text-lg text-gray-500 font-medium max-w-3xl leading-relaxed">
                        Navigate through the sections below to explore full laws, professional annotations, and regulatory guidance for this volume.
                    </p>
                </div>
            </header>

            <section className="space-y-16">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] flex items-center gap-3">
                        <span className="w-8 h-px bg-gray-200" />
                        Table of Contents
                    </h3>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                        {sections?.length || 0} Entries available
                    </div>
                </div>

                {sectionsBySubchapter && Object.entries(sectionsBySubchapter).map(([subTitle, subSections]: [string, any]) => (
                    <div key={subTitle} className="space-y-8">
                        {subTitle !== "_NONE_" && (
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-gray-100" />
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] whitespace-nowrap bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                    {subTitle}
                                </h4>
                                <div className="h-px flex-1 bg-gray-100" />
                            </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {subSections.map((section: any) => (
                                <Link
                                    key={section.id}
                                    href={`/user/reader/section/${section.id}`}
                                    className="group relative flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2 font-black text-[10px] tracking-widest text-blue-600 uppercase">
                                            <span>Sec. {section.number}</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/10" />
                                            <span className="text-gray-400 font-bold">Entry ID: {section.id.substring(0,6)}</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                            {section.title}
                                        </h4>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                                        <ChevronRight size={20} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
                
                {(!sections || sections.length === 0) && (
                    <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-100">
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No sections available in this chapter yet.</p>
                    </div>
                )}
            </section>

            <footer className="pt-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-gray-100 pt-10">
                    <Link
                        href={`/user/reader`}
                        className="group flex items-center gap-4 text-xs font-black text-[#0F172A] tracking-[0.2em] uppercase hover:text-blue-600 transition-all"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        </div>
                        Back to Library
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                         <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                             <Search size={14} />
                             Dynamic Search Active
                         </div>
                         <div className="w-px h-4 bg-gray-100" />
                         <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                             <BookOpen size={14} />
                             Premium Collection
                         </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

