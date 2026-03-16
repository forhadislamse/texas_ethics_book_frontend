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
    CheckCircle2,
    ExternalLink,
    BookOpen
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Helper component to render content with interactive references
const FormattedContent = ({ content, internalRefs, externalRefs }: { 
    content: string, 
    internalRefs: any[], 
    externalRefs: any[] 
}) => {
    if (!content) return null;

    let elements: (string | React.ReactNode)[] = [content];

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
                        <Popover key={`${ref.id}-${i}`}>
                            <PopoverTrigger asChild>
                                <button className="text-blue-600 font-semibold hover:underline cursor-pointer decoration-blue-200 underline-offset-4 decoration-2">
                                    {part}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0 overflow-hidden border-none shadow-2xl rounded-2xl animate-in zoom-in-95 duration-200">
                                <div className="bg-[#0F172A] p-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Internal Reference</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white leading-tight">{ref.popupTitle}</h4>
                                </div>
                                <div className="p-4 bg-white text-xs leading-relaxed text-gray-600 italic">
                                    "{ref.popupExcerpt}"
                                </div>
                                <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                                     <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider">View Full Rule</button>
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
                            key={`${ref.id}-${i}`}
                            href={ref.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-700 font-medium inline-flex items-center gap-1 hover:underline decoration-blue-200 underline-offset-4"
                        >
                            {part}
                            <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </a>
                    );
                } else {
                    if (part) newElements.push(part);
                }
            });
        });
        elements = newElements;
    });

    return <>{elements}</>;
};

export default function SectionDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: sectionResult, isLoading } = useGetSectionByIdQuery(id);

    if (isLoading) {
        return <div className="animate-pulse space-y-12 max-w-4xl mx-auto">
            <div className="h-6 bg-gray-50 rounded w-1/4"></div>
            <div className="space-y-4">
                <div className="h-12 bg-gray-50 rounded w-3/4"></div>
                <div className="h-6 bg-gray-50 rounded w-1/2"></div>
            </div>
            <div className="h-[400px] bg-gray-50/50 rounded-3xl border border-gray-50"></div>
        </div>;
    }

    if (!sectionResult?.data) {
        return <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 max-w-2xl mx-auto mt-20">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Info className="text-gray-300 w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Section Not Found</h2>
            <p className="text-gray-500 mb-6">The guide entry you are looking for might have been moved or updated.</p>
            <Link href="/user/reader" className="px-6 py-2.5 bg-[#0F172A] text-white rounded-full text-sm font-bold hover:shadow-lg transition-all active:scale-95">
                Return to Guide
            </Link>
        </div>;
    }

    const section = sectionResult.data;

    return (
        <div className="space-y-12 pb-20 max-w-4xl mx-auto animate-in fade-in duration-500">
            {/* Header / Breadcrumbs */}
            <header className="space-y-8">
                <nav className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-6">
                    <Link href="/user/reader" className="hover:text-blue-600 transition-colors">Digital Guide</Link>
                    <ChevronRight size={12} className="opacity-30" />
                    <Link href={`/user/reader`} className="hover:text-blue-600 transition-colors">
                        Chapter {section.chapter?.number}
                    </Link>
                    <ChevronRight size={12} className="opacity-30" />
                    <span className="text-gray-900">Current Section</span>
                </nav>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.05]">
                        Chapter {section.chapter?.number} — {section.chapter?.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20">
                            Sec. {section.chapter?.number}.{section.number}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                            <Clock size={12} className="text-gray-300" />
                            <span>Updated March 16, 2026</span>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 leading-tight border-l-4 border-[#0F172A] pl-5 py-1">
                    {section.title}
                </h2>
            </header>

            {/* Content Area */}
            <article className="relative">
                <div className="absolute -left-20 top-0 hidden xl:block">
                     <div className="sticky top-12 space-y-4">
                         <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 cursor-pointer transition-colors">
                            <Info size={18} />
                         </div>
                         <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 cursor-pointer transition-colors">
                            <Gavel size={18} />
                         </div>
                     </div>
                </div>
                
                <div className="text-xl leading-[1.8] text-gray-800 font-serif bg-white p-10 md:p-14 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-16 -mt-16 opacity-50" />
                    <div className="relative z-10 whitespace-pre-wrap">
                        <FormattedContent 
                            content={section.content} 
                            internalRefs={section.internalRefs} 
                            externalRefs={section.externalRefs} 
                        />
                    </div>
                </div>

                {section.addedBy && (
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-widest mt-8 px-6 bg-gray-50/50 py-3 rounded-2xl w-fit">
                        <Info size={14} className="text-gray-300" />
                        <span>Regulatory Source: {section.addedBy}</span>
                    </div>
                )}
            </article>

            {/* Legal Annotations / Practice Notes */}
            <section className="space-y-12 pt-16 border-t border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="h-px bg-gray-100 flex-1" />
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] text-center">Legal Annotations</h3>
                    <div className="h-px bg-gray-100 flex-1" />
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {section.practiceNotes && (
                        <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                            <div className="bg-[#1E293B] px-8 py-4 flex items-center gap-3 text-white font-bold text-xs tracking-[0.15em] uppercase">
                                <Info size={16} className="text-blue-400" />
                                Practice Notes
                            </div>
                            <div className="p-10 text-gray-600 leading-relaxed text-lg font-medium italic whitespace-pre-wrap bg-gradient-to-br from-white to-gray-50/50">
                                {section.practiceNotes}
                            </div>
                        </div>
                    )}

                    {section.ethicsOpinions && (
                        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                            <div className="bg-amber-600 px-8 py-4 flex items-center gap-3 text-white font-bold text-xs tracking-[0.15em] uppercase">
                                <Scale size={16} className="text-amber-200" />
                                Ethics Opinions
                            </div>
                            <div className="p-10 text-gray-700 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                                {section.ethicsOpinions}
                            </div>
                        </div>
                    )}

                    {section.caseLaw && (
                        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                            <div className="bg-slate-900 px-8 py-4 flex items-center gap-3 text-white font-bold text-xs tracking-[0.15em] uppercase">
                                <Gavel size={16} className="text-slate-400" />
                                Relevant Case Law
                            </div>
                            <div className="p-10 text-gray-800 leading-relaxed text-lg whitespace-pre-wrap font-serif">
                                {section.caseLaw}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Navigation Footer */}
            <footer className="pt-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-gray-100 pt-10">
                    <Link
                        href={`/user/reader/chapter/${section.chapterId}`}
                        className="group flex items-center gap-4 text-xs font-black text-[#0F172A] tracking-[0.2em] uppercase hover:text-blue-600 transition-all"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        </div>
                        Chapter Contents
                    </Link>

                    <div className="text-center md:text-right">
                        <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em] mb-2 leading-none">
                            © {new Date().getFullYear()} Cates Legal Group
                        </p>
                        <p className="text-[9px] text-gray-300 font-medium">
                            Premium Legal Research & Practice Support System
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

