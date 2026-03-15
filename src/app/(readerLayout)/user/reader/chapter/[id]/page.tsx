"use client";

import { useGetChapterByIdQuery } from "@/redux/api/guideApi";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, FileText, Lock } from "lucide-react";

export default function ChapterDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: chapter, isLoading } = useGetChapterByIdQuery(id);

    if (isLoading) {
        return <div className="animate-pulse space-y-8">
            <div className="h-6 bg-gray-100 rounded w-1/3"></div>
            <div className="h-16 bg-gray-100 rounded"></div>
            <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-50 rounded"></div>)}
            </div>
        </div>;
    }

    if (!chapter?.data) {
        return <div className="text-center py-20">
            <p className="text-gray-500">Chapter not found.</p>
            <Link href="/user/reader" className="text-blue-600 hover:underline mt-4 inline-block">Return to Guide</Link>
        </div>;
    }

    const { number, title, sections, isLocked } = chapter.data;

    return (
        <div className="space-y-12">
            <header>
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/user/reader" className="hover:text-blue-600">Guide</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">Chapter {number}</span>
                </nav>

                <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">CHAPTER {number} —</span>
                    {isLocked && <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-[10px] font-bold border border-amber-100">
                        <Lock size={10} />
                        LOCKED
                    </div>}
                </div>

                <h1 className="text-4xl font-black text-[#0F172A] leading-tight uppercase tracking-tight">
                    {title}
                </h1>
            </header>

            <section className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Table of Contents
                </h3>

                <div className="grid gap-2">
                    {sections?.map((section: any) => (
                        <Link
                            key={section.id}
                            href={`/user/reader/section/${section.id}`}
                            className="group flex flex-col p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/20 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700">
                                    Sec. {number}.{section.number}
                                </span>
                                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mt-2 transition-colors">
                                {section.title}
                            </h4>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
