"use client";

import { useGetChapterByIdQuery } from "@/redux/api/guideApi";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

export default function ChapterDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: chapter, isLoading } = useGetChapterByIdQuery(id);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading Chapter Content...</div>;
    }

    if (!chapter?.data) {
        return <div>Chapter not found.</div>;
    }

    const { number, title, sections } = chapter.data;

    return (
        <div className="max-w-5xl mx-auto py-8">
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/user/reader">Guide Reader</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Chapter {number}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <header className="border-b pb-6 mb-8">
                    <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Chapter {number}</h2>
                    <h1 className="text-3xl font-bold font-outfit text-[#1E293B] uppercase">{title}</h1>
                </header>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 px-2">Sections in this Chapter</h3>
                    <div className="grid gap-3">
                        {sections?.map((section: any) => (
                            <Link 
                                key={section.id} 
                                href={`/user/reader/section/${section.id}`}
                                className="group flex items-center justify-between p-4 rounded-lg border border-transparent hover:border-blue-100 hover:bg-blue-50/30 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-gray-50 rounded-md group-hover:bg-blue-100/50 transition-colors">
                                        <FileText size={18} className="text-gray-500 group-hover:text-blue-600" />
                                    </div>
                                    <div>
                                        <span className="text-sm font-bold text-gray-500 block">Sec. {section.number}</span>
                                        <span className="text-gray-900 font-medium">{section.title}</span>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
