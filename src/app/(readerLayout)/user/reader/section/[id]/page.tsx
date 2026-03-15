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
    CheckCircle2
} from "lucide-react";

export default function SectionDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: sectionResult, isLoading } = useGetSectionByIdQuery(id);

    if (isLoading) {
        return <div className="animate-pulse space-y-12">
            <div className="h-6 bg-gray-100 rounded w-1/4"></div>
            <div className="space-y-4">
                <div className="h-12 bg-gray-100 rounded w-3/4"></div>
                <div className="h-6 bg-gray-50 rounded w-1/2"></div>
            </div>
            <div className="space-y-6 py-12 border-y border-gray-100">
                <div className="h-4 bg-gray-50 rounded"></div>
                <div className="h-4 bg-gray-50 rounded"></div>
                <div className="h-4 bg-gray-50 rounded w-5/6"></div>
            </div>
        </div>;
    }

    if (!sectionResult?.data) {
        return <div className="text-center py-20">
            <p className="text-gray-500">Section not found.</p>
            <Link href="/user/reader" className="text-blue-600 hover:underline mt-4 inline-block">Return to Guide</Link>
        </div>;
    }

    const section = sectionResult.data;

    return (
        <div className="space-y-12 pb-20">
            {/* Header / Breadcrumbs */}
            <header>
                <nav className="flex items-center gap-2 text-[13px] text-gray-400 mb-10 border-b border-gray-100 pb-4">
                    <Link href="/user/reader" className="hover:text-blue-600 transition-colors">Home</Link>
                    <ChevronRight size={14} className="opacity-40" />
                    <Link href={`/user/reader/chapter/${section.chapterId}`} className="hover:text-blue-600 transition-colors">
                        Chapter {section.chapter?.number}
                    </Link>
                </nav>

                <h1 className="text-3xl font-black text-[#0F172A] uppercase tracking-tight mb-8 leading-[1.1]">
                    Chapter {section.chapter?.number} — {section.chapter?.title}
                </h1>

                <div className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="mt-1">
                        <CheckCircle2 className="text-blue-600 w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                            Sec. {section.chapter?.number}.{section.number}. {section.title}
                        </h2>
                        <p className="text-sm text-gray-500 font-medium italic">
                            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <article className="prose prose-slate max-w-none">
                <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap font-serif bg-[#fdfdfd] p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    {section.content}
                </div>

                {section.addedBy && (
                    <div className="flex items-center gap-2 text-sm text-gray-400 italic mt-6 px-4">
                        <Clock size={14} />
                        <span>Source: {section.addedBy}</span>
                    </div>
                )}
            </article>

            {/* Legal Annotations / Practice Notes */}
            <div className="space-y-10 pt-12 border-t border-gray-100">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Legal Annotations</h3>

                {section.practiceNotes && (
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="bg-blue-600 px-6 py-3 flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase">
                            <Info size={16} />
                            Practice Notes
                        </div>
                        <div className="p-8 text-gray-700 leading-relaxed text-[17px] font-medium italic whitespace-pre-wrap">
                            {section.practiceNotes}
                        </div>
                    </div>
                )}

                {section.ethicsOpinions && (
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="bg-amber-500 px-6 py-3 flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase">
                            <Scale size={16} />
                            Ethics Opinions
                        </div>
                        <div className="p-8 text-gray-700 leading-relaxed text-[17px] font-medium whitespace-pre-wrap">
                            {section.ethicsOpinions}
                        </div>
                    </div>
                )}

                {section.caseLaw && (
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="bg-slate-800 px-6 py-3 flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase">
                            <Gavel size={16} />
                            Case Law
                        </div>
                        <div className="p-8 text-gray-700 leading-relaxed text-[17px] whitespace-pre-wrap font-serif">
                            {section.caseLaw}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Nav */}
            <div className="flex justify-between items-center pt-12">
                <Link
                    href={`/user/reader/chapter/${section.chapterId}`}
                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
                >
                    <ChevronLeft size={16} />
                    CHAPTER CONTENTS
                </Link>

                <p className="text-xs text-gray-300 font-medium">
                    © {new Date().getFullYear()} Cates Legal Group. All rights reserved.
                </p>
            </div>
        </div>
    );
}
