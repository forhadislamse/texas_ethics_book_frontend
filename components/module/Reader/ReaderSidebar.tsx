"use client";

import { useGetAllChaptersQuery } from "@/redux/api/guideApi";
import {
    Search,
    ChevronDown,
    ChevronRight,
    Lock,
    BookOpen,
    FileText,
    Settings,
    User
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function ReaderSidebar() {
    const pathname = usePathname();
    const params = useParams();
    const { data: chapters, isLoading } = useGetAllChaptersQuery(undefined);
    const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev =>
            prev.includes(chapterId)
                ? prev.filter(id => id !== chapterId)
                : [...prev, chapterId]
        );
    };

    const filteredChapters = chapters?.data?.filter((chapter: any) =>
        chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.number.toString().includes(searchQuery)
    );

    return (
        <aside className="w-80 h-screen border-r border-gray-200 bg-[#F8FAFC] flex flex-col fixed left-0 top-0 z-50">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-200 bg-white">
                <Link href="/" className="flex items-center gap-3">
                    <div className="bg-[#0f172a] p-1.5 rounded-lg">
                        <Image src="/Logo.png" alt="Cates Logo" width={24} height={24} className="brightness-200" />
                    </div>
                    <div>
                        <span className="font-bold text-gray-900 tracking-tight block">CATES</span>
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Legal Group</span>
                    </div>
                </Link>
            </div>

            {/* Search Section */}
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search rules, annotations or..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 overflow-y-auto px-2 space-y-1 py-4">
                {isLoading ? (
                    <div className="p-4 text-sm text-gray-400 italic">Loading content...</div>
                ) : (
                    filteredChapters?.map((chapter: any) => {
                        const isExpanded = expandedChapters.includes(chapter.id) || params.id === chapter.id;
                        const isActive = pathname.includes(`/chapter/${chapter.id}`);

                        return (
                            <div key={chapter.id} className="space-y-1">
                                <button
                                    onClick={() => toggleChapter(chapter.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <BookOpen className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                                    <span className="flex-1 text-left line-clamp-1">Chapter {chapter.number}</span>
                                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                </button>

                                {isExpanded && (
                                    <div className="ml-9 space-y-0.5 border-l border-gray-100 pl-1 py-1">
                                        {chapter.sections?.map((section: any) => {
                                            const isSectionActive = pathname.includes(`/section/${section.id}`);
                                            return (
                                                <Link
                                                    key={section.id}
                                                    href={`/user/reader/section/${section.id}`}
                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${isSectionActive ? "text-blue-700 font-bold bg-blue-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <span className="shrink-0">{chapter.number}.{section.number}.</span>
                                                    <span className="line-clamp-1">{section.title}</span>
                                                    {chapter.isLocked && <Lock className="w-3 h-3 ml-auto text-gray-300" />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </nav>

            {/* Footer Section */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                        <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                        <span className="block font-semibold text-gray-900 leading-none">Rehab Attia</span>
                        <span className="text-[10px] text-gray-400 font-medium">BASIC PLAN</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </aside>
    );
}
