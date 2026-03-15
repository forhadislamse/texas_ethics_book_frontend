"use client";

import { useGetAllChaptersQuery } from "@/redux/api/guideApi";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";

export default function GuideReaderPage() {
    const { data: chapters, isLoading } = useGetAllChaptersQuery(undefined);

    if (isLoading) {
        return <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-100 rounded w-1/4"></div>
            <div className="h-20 bg-gray-100 rounded"></div>
            <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="h-32 bg-gray-50 rounded-xl"></div>
                <div className="h-32 bg-gray-50 rounded-xl"></div>
            </div>
        </div>;
    }

    return (
        <div className="space-y-12">
            <header>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Reader</span>
                </div>
                <h1 className="text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">
                    Legal Practice Guide
                </h1>
                <p className="text-xl text-gray-500 leading-relaxed max-w-2xl font-light">
                    Select a chapter from the sidebar or from the list below to begin exploring rules, annotations, and professional notes.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {chapters?.data?.map((chapter: any) => (
                    <Link
                        key={chapter.id}
                        href={`/user/reader/chapter/${chapter.id}`}
                        className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                                Chapter {chapter.number}
                            </span>
                            <BookOpen className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {chapter.title}
                        </h3>
                        <p className="text-sm text-gray-400 font-medium">
                            {chapter._count?.sections || 0} Sections available
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
