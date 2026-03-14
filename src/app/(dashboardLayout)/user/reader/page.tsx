"use client";

import { useGetAllChaptersQuery } from "@/redux/api/guideApi";
import { Lock, BookOpen } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GuideReaderPage() {
    const { data: chapters, isLoading } = useGetAllChaptersQuery(undefined);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading Guide...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-2 font-outfit">Legal Practice Guide</h1>
                <p className="text-gray-600">Explore the comprehensive guide to ethics and laws.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters?.data?.map((chapter: any) => (
                    <Link key={chapter.id} href={`/user/reader/chapter/${chapter.id}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-blue-100">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-blue-600">
                                    Chapter {chapter.number}
                                </CardTitle>
                                {chapter.isLocked ? (
                                    <Lock size={16} className="text-amber-500" />
                                ) : (
                                    <BookOpen size={16} className="text-green-500" />
                                )}
                            </CardHeader>
                            <CardContent>
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                                    {chapter.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-2">
                                    {chapter._count?.sections || 0} Sections
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
