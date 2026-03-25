"use client";

import { useGetChapterByIdQuery } from "@/redux/api/guideApi";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
    ChevronRight, 
    BookOpen, 
    Lock, 
    ChevronLeft, 
    Search,
    BookMarked,
    Info,
    List
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChapterDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: chapter, isLoading, error } = useGetChapterByIdQuery(id);

    if (isLoading) {
        return <div className="animate-pulse wiki-doc-container">
            <div className="wiki-sidebar space-y-4">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>)}
            </div>
            <div className="wiki-main-content space-y-12">
                <div className="h-6 bg-gray-50 rounded w-1/4"></div>
                <div className="space-y-4">
                    <div className="h-16 bg-gray-50 rounded w-3/4"></div>
                    <div className="h-[200px] bg-gray-50/50 rounded-2xl border border-gray-100"></div>
                </div>
            </div>
        </div>;
    }

    // Handle 403 Forbidden - Subscription Required
    if ((error as any)?.status === 403) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                    <Lock className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Premium Content locked</h2>
                <p className="text-gray-500 max-w-md mb-10 text-lg italic leading-relaxed">
                    This chapter is part of our premium legal guide. Subscribe to one of our plans to unlock full access to all 550+ pages.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/">
                        <Button size="lg" className="bg-[#0F172A] hover:bg-gray-800 text-white px-8 py-6 rounded-2xl font-bold uppercase tracking-widest shadow-xl">
                            View Pricing Plans
                        </Button>
                    </Link>
                    <Link href="/user/reader">
                        <Button size="lg" variant="outline" className="border-2 border-gray-100 text-gray-600 hover:bg-gray-50 px-8 py-6 rounded-2xl font-bold uppercase tracking-widest">
                            Back to Library
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (!chapter?.data) {
        return <div className="text-center py-20 max-w-2xl mx-auto mt-20">
            <BookMarked className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Chapter Not Found</h2>
            <Link href="/user/reader" className="text-blue-600 font-bold hover:underline">Return to Guide</Link>
        </div>;
    }

    const { number, title, sections, isLocked, code, titleLevel, subtitleLevel } = chapter.data;

    const sectionsBySubchapter = sections?.reduce((acc: any, section: any) => {
        const sub = section.subChapter || "_NONE_";
        if (!acc[sub]) acc[sub] = [];
        acc[sub].push(section);
        return acc;
    }, {});

    return (
        <div className="wiki-doc-container animate-in fade-in duration-700">
            {/* Wikipedia-Style Sidebar (TOC) */}
            <aside className="wiki-sidebar">
                <div className="wiki-sticky-sidebar custom-scrollbar">
                    <div className="flex items-center gap-2 mb-6 px-2">
                        <List size={16} className="text-gray-400" />
                        <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Contents</h5>
                    </div>
                    <nav className="space-y-1">
                        {sectionsBySubchapter && Object.entries(sectionsBySubchapter).map(([subTitle, subSections]: [string, any]) => (
                            <div key={subTitle} className="mb-6">
                                {subTitle !== "_NONE_" && (
                                    <div className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate mb-2">
                                        {subTitle}
                                    </div>
                                )}
                                <div className="space-y-0.5 border-l border-gray-100 ml-2">
                                    {subSections.map((section: any) => (
                                        <a
                                            key={section.id}
                                            href={`#section-${section.number}`}
                                            className="block px-4 py-1.5 text-[13px] text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all truncate border-l-2 border-transparent hover:border-blue-500 -ml-px"
                                        >
                                            <span className="font-bold mr-2 text-[11px] text-gray-400">§ {section.number}</span>
                                            {section.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="wiki-main-content">
                <header className="mb-12">
                    <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-8 pb-4 border-b border-gray-50">
                        <Link href="/user/reader" className="hover:text-blue-600">Digital Library</Link>
                        <ChevronRight size={14} className="opacity-30" />
                        <span className="text-gray-900">Chapter {number}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight">
                                <span className="block text-blue-600 text-sm font-black uppercase tracking-[0.3em] mb-4">Chapter {number}</span>
                                {title}
                            </h1>
                            <p className="text-lg text-gray-500 leading-relaxed font-serif italic">
                                Technical guidelines and regulatory frameworks regarding {title.toLowerCase()}.
                            </p>
                        </div>

                        {/* Wikipedia-Style Infobox */}
                        <div className="wiki-infobox bg-white shadow-sm border-t-4 border-t-blue-600">
                             <div className="flex items-center gap-2 mb-4">
                                <Info size={16} className="text-blue-600" />
                                <span className="font-black text-[10px] uppercase tracking-widest text-gray-400">Chapter Metadata</span>
                             </div>
                             <div className="space-y-3">
                                <div className="grid grid-cols-2 py-2 border-b border-gray-50">
                                    <span className="text-[10px] uppercase font-bold text-gray-400">Code</span>
                                    <span className="font-black text-[#0F172A] text-right">{code || "N/A"}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-gray-400">Hierarchical Level</span>
                                    <p className="text-[11px] font-black leading-tight grey-900">{titleLevel || "N/A"}</p>
                                    <p className="text-[10px] font-bold text-blue-500 leading-tight">{subtitleLevel || ""}</p>
                                </div>
                                <div className="grid grid-cols-2 py-2 border-t border-gray-50">
                                    <span className="text-[10px] uppercase font-bold text-gray-400">Access</span>
                                    <span className="text-right">
                                        {isLocked ? 
                                            <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-500 uppercase"><Lock size={10} /> Limited</span> : 
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">Open Access</span>
                                        }
                                    </span>
                                </div>
                             </div>
                        </div>
                    </div>
                </header>

                <div className="space-y-20">
                    {sectionsBySubchapter && Object.entries(sectionsBySubchapter).map(([subTitle, subSections]: [string, any]) => (
                        <section key={subTitle} className="space-y-8">
                            {subTitle !== "_NONE_" && (
                                <h2 className="wiki-subchapter-heading flex items-center gap-4">
                                    {subTitle}
                                    <div className="h-px flex-1 bg-gray-100" />
                                </h2>
                            )}

                            <div className="divide-y divide-gray-100 border-t border-gray-100">
                                {subSections.map((section: any) => (
                                    <div 
                                        key={section.id} 
                                        id={`section-${section.number}`}
                                        className="py-10 group scroll-mt-24"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                                            <div className="w-24 shrink-0 pt-2 font-black text-[11px] text-blue-600 uppercase tracking-[0.2em]">
                                                § {section.number}
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                                                    {section.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-serif">
                                                    {section.content}
                                                </p>
                                                <Link 
                                                    href={`/user/reader/section/${section.id}`}
                                                    className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:gap-4 transition-all"
                                                >
                                                    Full Documentation <ChevronRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <footer className="mt-24 pt-12 border-t border-gray-100 flex justify-between items-center text-gray-400">
                    <Link href="/user/reader" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
                        <ChevronLeft size={16} /> Back to Library
                    </Link>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                        <BookOpen size={14} /> 
                        <span>Updated March 2026 Edition</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}

