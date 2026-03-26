"use client";

import { useGetSectionByIdQuery } from "@/redux/api/guideApi";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    ChevronRight,
    Info,
    Gavel,
    Scale,
    Clock,
    ChevronLeft,
    ExternalLink,
    BookOpen,
    Layers,
    Anchor,
    FileText,
    Lock
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Enhanced helper to render content with interactive references and semantic indentation
const FormattedContent = ({ content, internalRefs, externalRefs }: {
    content: string,
    internalRefs: any[],
    externalRefs: any[]
}) => {
    if (!content) return null;

    // First, split content into paragraphs/lines to handle indentation
    const lines = content.split('\n');

    return (
        <div className="space-y-4">
            {lines.map((line, lineIdx) => {
                if (!line.trim()) return null;

                // Detect indentation level based on patterns: (a), (1), (A), (i)
                let indentClass = "";
                if (line.match(/^\s*\([a-z]\)/i)) indentClass = "wiki-indent-1";
                else if (line.match(/^\s*\(\d+\)/)) indentClass = "wiki-indent-2";
                else if (line.match(/^\s*\([A-Z]\)/)) indentClass = "wiki-indent-3";
                else if (line.match(/^\s*\([ivx]+\)/i)) indentClass = "pl-32"; // deeper

                let elements: (string | React.ReactNode)[] = [line];

                // Handle Internal References (Popups)
                internalRefs?.forEach((ref) => {
                    const newElements: (string | React.ReactNode)[] = [];
                    elements.forEach((el) => {
                        if (typeof el !== 'string') {
                            newElements.push(el);
                            return;
                        }

                        const parts = el.split(new RegExp(`(${ref.linkText})`, 'g'));
                        parts.forEach((part, i) => {
                            if (part === ref.linkText) {
                                newElements.push(
                                    <Popover key={`${ref.id}-${lineIdx}-${i}`}>
                                        <PopoverTrigger asChild>
                                            <button className="text-blue-600 font-bold hover:underline cursor-pointer decoration-blue-200 underline-offset-4">
                                                {part}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80 p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
                                            <div className="bg-[#0F172A] p-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Internal Reference</span>
                                                </div>
                                                <h4 className="text-sm font-bold text-white leading-tight">{ref.popupTitle}</h4>
                                            </div>
                                            <div className="p-4 bg-white text-xs leading-relaxed text-gray-600 italic">
                                                &quot;{ref.popupExcerpt}&quot;
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                );
                            } else {
                                if (part) newElements.push(part);
                            }
                        });
                    });
                    elements = newElements;
                });

                // Handle External References (Links)
                externalRefs?.forEach((ref) => {
                    const newElements: (string | React.ReactNode)[] = [];
                    elements.forEach((el) => {
                        if (typeof el !== 'string') {
                            newElements.push(el);
                            return;
                        }

                        const parts = el.split(new RegExp(`(${ref.linkText})`, 'g'));
                        parts.forEach((part, i) => {
                            if (part === ref.linkText) {
                                newElements.push(
                                    <a
                                        key={`${ref.id}-${lineIdx}-${i}`}
                                        href={ref.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-700 font-medium inline-flex items-center gap-1 hover:underline"
                                    >
                                        {part}
                                        <ExternalLink className="w-3 h-3 opacity-40 shrink-0" />
                                    </a>
                                );
                            } else {
                                if (part) newElements.push(part);
                            }
                        });
                    });
                    elements = newElements;
                });

                return (
                    <p key={lineIdx} className={`${indentClass} wiki-legal-text`}>
                        {elements}
                    </p>
                );
            })}
        </div>
    );
};

export default function SectionDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: sectionResult, isLoading, error } = useGetSectionByIdQuery(id);

    if (isLoading) {
        return <div className="animate-pulse wiki-doc-container">
            <div className="wiki-sidebar space-y-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>)}
            </div>
            <div className="wiki-main-content space-y-12">
                <div className="h-6 bg-gray-50 rounded w-1/4"></div>
                <div className="h-[400px] bg-gray-50/50 rounded-3xl border border-gray-50"></div>
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
                    This section is part of our premium legal guide. Subscribe to one of our plans to unlock full access to all 550+ pages.
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

    if (!sectionResult?.data) {
        return <div className="text-center py-20 max-w-2xl mx-auto mt-20">
            <Info className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Section Not Found</h2>
            <Link href="/user/reader" className="text-blue-600 font-bold hover:underline">Return to Guide</Link>
        </div>;
    }

    const section = sectionResult.data;

    return (
        <div className="wiki-doc-container animate-in fade-in duration-700">
            {/* Section Sidebar Navigation */}
            <aside className="wiki-sidebar">
                <div className="wiki-sticky-sidebar custom-scrollbar">
                    <div className="flex items-center gap-2 mb-6 px-2">
                        <Anchor size={16} className="text-gray-400" />
                        <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">In this section</h5>
                    </div>
                    <nav className="space-y-1 border-l border-gray-100 ml-2">
                        <a href="#summary" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all border-l-2 border-transparent hover:border-blue-500 -ml-px">Summary</a>
                        <a href="#content" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all border-l-2 border-transparent hover:border-blue-500 -ml-px">Content Body</a>
                        {section.practiceNotes && <a href="#practice-notes" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all border-l-2 border-transparent hover:border-blue-500 -ml-px">Practice Notes</a>}
                        {section.ethicsOpinions && <a href="#ethics-opinions" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all border-l-2 border-transparent hover:border-blue-500 -ml-px">Ethics Opinions</a>}
                        {section.caseLaw && <a href="#case-law" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all border-l-2 border-transparent hover:border-blue-500 -ml-px">Case Law</a>}
                        {section.agOpinions && <a href="#ag-opinions" className="block px-4 py-2 text-[13px] text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all border-l-2 border-transparent hover:border-blue-500 -ml-px">AG Opinions</a>}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="wiki-main-content">
                <header id="summary" className="mb-12 scroll-mt-24">
                    <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-8 pb-4 border-b border-gray-50">
                        <Link href="/user/reader" className="hover:text-blue-600">Digital Library</Link>
                        <ChevronRight size={14} className="opacity-30" />
                        <Link href={`/user/reader/chapter/${section.chapterId}`} className="hover:text-blue-600">Chapter {section.chapter?.number}</Link>
                        <ChevronRight size={14} className="opacity-30" />
                        <span className="text-gray-900">Section {section.number}</span>
                    </nav>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-[#0F172A] text-white text-[10px] font-black uppercase tracking-widest rounded shadow-sm">
                                {section.chapter?.code || "GOV CODE"}
                            </span>
                            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-sm">
                                SEC. {section.number}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
                            {section.title}
                        </h1>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <Clock size={14} />
                            <span>Effective March 2026</span>
                            <div className="w-1 h-1 bg-gray-200 rounded-full" />
                            <FileText size={14} />
                            <span>Verified Documentation</span>
                        </div>
                    </div>
                </header>

                <div id="content" className="scroll-mt-24 space-y-12">
                    <div className="wiki-legal-text p-2 first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-blue-600">
                        <FormattedContent
                            content={section.content}
                            internalRefs={section.internalRefs}
                            externalRefs={section.externalRefs}
                        />
                    </div>

                    {section.addedBy && (
                        <p className="text-xs text-gray-400 font-bold italic border-l-2 border-gray-100 pl-4 py-1 uppercase tracking-widest">
                            Legislative/Regulatory Source: {section.addedBy}
                        </p>
                    )}
                </div>

                {/* Wikipedia-Style Appendices */}
                <section className="mt-20 pt-20 border-t border-gray-200 space-y-16">
                    {section.practiceNotes && (
                        <div id="practice-notes" className="scroll-mt-24">
                            <h3 className="wiki-section-heading flex items-center gap-3">
                                <Info className="text-blue-600" size={20} />
                                Practice Notes
                            </h3>
                            <div className="wiki-legal-text italic text-gray-600 whitespace-pre-wrap">
                                {section.practiceNotes}
                            </div>
                        </div>
                    )}

                    {section.ethicsOpinions && (
                        <div id="ethics-opinions" className="scroll-mt-24">
                            <h3 className="wiki-section-heading flex items-center gap-3">
                                <Scale className="text-amber-600" size={20} />
                                Ethics Opinions
                            </h3>
                            <div className="wiki-legal-text whitespace-pre-wrap">
                                {section.ethicsOpinions}
                            </div>
                        </div>
                    )}

                    {section.caseLaw && (
                        <div id="case-law" className="scroll-mt-24">
                            <h3 className="wiki-section-heading flex items-center gap-3">
                                <Gavel className="text-[#0F172A]" size={20} />
                                Relevant Case Law
                            </h3>
                            <div className="wiki-legal-text whitespace-pre-wrap font-serif">
                                {section.caseLaw}
                            </div>
                        </div>
                    )}

                    {section.agOpinions && (
                        <div id="ag-opinions" className="scroll-mt-24">
                            <h3 className="wiki-section-heading flex items-center gap-3">
                                <Scale className="text-indigo-600" size={20} />
                                AG Opinions
                            </h3>
                            <div className="wiki-legal-text whitespace-pre-wrap">
                                {section.agOpinions}
                            </div>
                        </div>
                    )}

                    {section.crossReferences && (
                        <div id="cross-references" className="scroll-mt-24">
                            <h3 className="wiki-section-heading flex items-center gap-3">
                                <Layers className="text-gray-400" size={20} />
                                Cross References
                            </h3>
                            <div className="wiki-legal-text whitespace-pre-wrap text-sm text-gray-500 italic">
                                {section.crossReferences}
                            </div>
                        </div>
                    )}
                </section>

                <footer className="mt-24 pt-12 border-t border-gray-100 flex justify-between items-center text-gray-400">
                    <Link href={`/user/reader/chapter/${section.chapterId}`} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
                        <ChevronLeft size={16} /> Chapter Contents
                    </Link>
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest">Cates Legal Group</p>
                        <p className="text-[9px] font-medium opacity-50">Authorized Judicial Library System</p>
                    </div>
                </footer>
            </main>
        </div>
    );
}

