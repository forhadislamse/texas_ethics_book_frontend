"use client";

import { useGetSectionByIdQuery } from "@/redux/api/guideApi";
import { useParams } from "next/navigation";
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Gavel, Scale, History } from "lucide-react";

export default function SectionDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: sectionResult, isLoading } = useGetSectionByIdQuery(id);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading Section...</div>;
    }

    if (!sectionResult?.data) {
        return <div>Section not found.</div>;
    }

    const section = sectionResult.data;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/user/reader">Guide Reader</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/user/reader/chapter/${section.chapterId}`}>
                            Chapter {section.chapter?.number}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Sec. {section.number}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 font-outfit">
                <header className="mb-10 text-center">
                    <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
                        Section {section.number}
                    </Badge>
                    <h1 className="text-4xl font-bold text-[#1E293B] uppercase leading-tight">
                        {section.title}
                    </h1>
                </header>

                {/* Main Content */}
                <div className="prose prose-blue max-w-none text-gray-800 text-lg leading-relaxed mb-12">
                    <p className="whitespace-pre-wrap">{section.content}</p>
                </div>

                {/* Metadata Section (Added By) */}
                {section.addedBy && (
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-start gap-4 text-gray-500 italic text-sm">
                        <History size={16} className="mt-1 flex-shrink-0" />
                        <p>{section.addedBy}</p>
                    </div>
                )}

                {/* Professional Sidebar/Floating Blocks for Metadata */}
                <div className="mt-12 space-y-8">
                    {/* Practice Notes */}
                    {section.practiceNotes && (
                        <div className="bg-[#F8FAFC] rounded-2xl p-8 border-l-4 border-blue-500 shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-blue-700">
                                <Info size={24} />
                                <h3 className="text-xl font-bold uppercase tracking-wide">Practice Notes</h3>
                            </div>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap italic">
                                {section.practiceNotes}
                            </div>
                        </div>
                    )}

                    {/* Ethics Opinions */}
                    {section.ethicsOpinions && (
                        <div className="bg-[#FFFBEB] rounded-2xl p-8 border-l-4 border-amber-400 shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-amber-700">
                                <Scale size={24} />
                                <h3 className="text-xl font-bold uppercase tracking-wide">Ethics Opinions</h3>
                            </div>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                                {section.ethicsOpinions}
                            </div>
                        </div>
                    )}

                    {/* Case Law */}
                    {section.caseLaw && (
                        <div className="bg-[#F1F5F9] rounded-2xl p-8 border-l-4 border-indigo-600 shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-indigo-700">
                                <Gavel size={24} />
                                <h3 className="text-xl font-bold uppercase tracking-wide">Case Law</h3>
                            </div>
                            <div className="text-gray-800 prose prose-indigo max-w-none whitespace-pre-wrap leading-relaxed">
                                {section.caseLaw}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
}
