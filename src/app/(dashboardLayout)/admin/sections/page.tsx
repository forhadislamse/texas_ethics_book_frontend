/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Edit2, Filter, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useDeleteSectionMutation,
  useGetAllChaptersQuery,
  useGetAllSectionsQuery,
} from "@/redux/api/guideApi";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-lg text-gray-500"
      >
        Prev
      </Button>
      {getPageNumbers().map((page, index) =>
        typeof page === "string" ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-8 w-8 items-center justify-center text-gray-500"
          >
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={`h-8 w-8 rounded-lg p-0 ${
              page === currentPage
                ? "bg-[#007A8A] text-white hover:bg-[#006674]"
                : "text-gray-500"
            }`}
          >
            {page}
          </Button>
        ),
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-lg text-gray-500"
      >
        Next
      </Button>
    </div>
  );
}

export default function SectionsManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filterChapterId, setFilterChapterId] = useState("");
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: chaptersData, isLoading: isLoadingChapters } =
    useGetAllChaptersQuery({
      page: 1,
      limit: 1000,
    });

  const chapters = useMemo(() => chaptersData?.data || [], [chaptersData]);
  const selectedChapter = chapters.find(
    (chapter: any) => chapter.id === filterChapterId,
  );

  const { data, isLoading, error, refetch } = useGetAllSectionsQuery({
    page: currentPage,
    limit: itemsPerPage,
    chapterId: filterChapterId || undefined,
    searchTerm: debouncedSearchTerm || undefined,
  });

  const [deleteSection, { isLoading: isDeleting }] =
    useDeleteSectionMutation();

  const sections: any[] = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 0;
  const safePage = totalPages > 0 ? Math.min(currentPage, totalPages) : currentPage;

  const clearFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setFilterChapterId("");
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (!sectionToDelete) return;

    try {
      await deleteSection(sectionToDelete).unwrap();
      toast.success("Section deleted successfully!");
      setSectionToDelete(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete section");
    }
  };

  if (isLoading || isLoadingChapters) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#007A8A]" />
            <p className="mt-4 text-gray-600">Loading sections...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Error loading sections. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-gray-950">Sections</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all sections of the legal guide.
          </p>
        </div>
        <Link
          href="/admin/sections/create"
          className="flex items-center gap-2 rounded-full bg-[#007A8A] px-6 py-3 font-semibold text-white shadow transition-all hover:bg-[#006674]"
        >
          <Plus size={20} /> Add New Section
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by section number or title..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-600 shadow-sm transition-all focus:border-[#007A8A] focus:outline-none focus:ring-2 focus:ring-[#007A8A]/10"
              />
            </div>

            <div className="relative w-full md:w-[340px]">
              <Filter
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <select
                className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-gray-600 shadow-sm transition-all focus:border-[#007A8A] focus:outline-none focus:ring-2 focus:ring-[#007A8A]/10"
                value={filterChapterId}
                onChange={(event) => {
                  setFilterChapterId(event.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Chapters</option>
                {chapters.map((chapter: any) => (
                  <option key={chapter.id} value={chapter.id}>
                    Chapter {chapter.number}: {chapter.title}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                v
              </span>
            </div>

            {(searchTerm || filterChapterId) && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#007A8A] transition-all hover:bg-gray-50 hover:text-[#006674]"
              >
                Clear Filters
              </button>
            )}
          </div>

          {(searchTerm || filterChapterId) && (
            <div className="mt-4 flex flex-wrap gap-2 pt-2">
              {searchTerm && (
                <span className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-700">
                  <Search size={14} />
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 font-bold hover:text-blue-900"
                  >
                    x
                  </button>
                </span>
              )}
              {selectedChapter && (
                <span className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 text-sm text-green-700">
                  <Filter size={14} />
                  Chapter {selectedChapter.number}:{" "}
                  {selectedChapter.title.substring(0, 40)}
                  {selectedChapter.title.length > 40 ? "..." : ""}
                  <button
                    onClick={() => setFilterChapterId("")}
                    className="ml-1 font-bold hover:text-green-900"
                  >
                    x
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {meta && (
          <div className="border-b border-gray-100 bg-gray-50/30 px-6 py-3">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">{meta.total}</span>{" "}
              sections
              {selectedChapter && ` in Chapter ${selectedChapter.number}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F6F6F6]">
                <th className="px-8 py-5 font-semibold text-gray-700">
                  Section No.
                </th>
                <th className="px-8 py-5 font-semibold text-gray-700">
                  Section Title
                </th>
                <th className="px-8 py-5 text-center font-semibold text-gray-700">
                  Chapter
                </th>
                <th className="px-8 py-5 font-semibold text-gray-700">
                  Chapter Title
                </th>
                <th className="px-8 py-5 font-semibold text-gray-700">
                  Last Updated
                </th>
                <th className="py-5 pl-8 pr-12 text-right font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sections.map((section) => (
                <tr
                  key={section.id}
                  className="transition-colors hover:bg-gray-50/50"
                >
                  <td className="px-8 py-5">
                    <span className="font-mono text-sm font-bold text-gray-900">
                      {section.number}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="font-medium text-gray-900" title={section.title}>
                      {section.title}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="rounded-full bg-[#007A8A]/10 px-3 py-1 text-sm font-semibold text-[#007A8A]">
                      {section.chapter?.number || "N/A"}
                    </span>
                  </td>
                  <td className="max-w-xs px-8 py-5">
                    <div
                      className="truncate text-gray-600"
                      title={section.chapter?.title}
                    >
                      {section.chapter?.title || "N/A"}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-8 py-5 text-sm text-gray-500">
                    {section.updatedAt
                      ? new Date(section.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : "-"}
                  </td>
                  <td className="py-5 pl-8 pr-10 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/sections/edit/${section.id}`}
                        className="rounded-lg p-2 text-gray-400 transition-all hover:bg-[#007A8A]/5 hover:text-[#007A8A]"
                      >
                        <Edit2 size={18} />
                      </Link>

                      <Dialog
                        open={sectionToDelete === section.id}
                        onOpenChange={(isOpen) =>
                          setSectionToDelete(isOpen ? section.id : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <button
                            className="cursor-pointer rounded-lg p-2 text-red-400 transition-all hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isDeleting}
                          >
                            <Trash2 size={18} />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="rounded-3xl border-none text-center shadow-2xl">
                          <DialogHeader>
                            <DialogTitle className="w-full text-center text-xl font-bold text-gray-900">
                              Are you absolutely sure?
                            </DialogTitle>
                            <DialogDescription className="text-center text-[15px] text-gray-500">
                              This will permanently delete Section{" "}
                              <span className="font-bold text-gray-900">
                                {section.number}
                              </span>{" "}
                              - {section.title} from Chapter{" "}
                              <span className="font-bold text-gray-900">
                                {section.chapter?.number || "N/A"}
                              </span>
                              . This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setSectionToDelete(null)}
                              className="rounded-xl border-gray-200 px-6 py-6 font-semibold hover:bg-gray-50"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleDelete}
                              className="rounded-xl bg-red-500 px-6 py-6 font-semibold text-white hover:bg-red-600"
                            >
                              Delete Section
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sections.length === 0 && (
          <div className="py-16 text-center">
            <Search size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg text-gray-500">
              {searchTerm || filterChapterId
                ? "No sections found matching your criteria"
                : "No sections available"}
            </p>
            {(searchTerm || filterChapterId) && (
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-2 font-medium text-[#007A8A] hover:text-[#006674]"
              >
                Clear all filters
              </button>
            )}
            {!searchTerm && !filterChapterId && (
              <Link
                href="/admin/sections/create"
                className="mt-4 inline-block font-medium text-[#007A8A] hover:text-[#006674]"
              >
                Create your first section
              </Link>
            )}
          </div>
        )}

        {meta && meta.total > itemsPerPage && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-gray-50/30 px-8 py-6 sm:flex-row">
            <div className="text-sm text-gray-600">
              Showing {(safePage - 1) * meta.limit + 1}-
              {Math.min(safePage * meta.limit, meta.total)} of{" "}
              <span className="font-semibold text-gray-900">{meta.total}</span>{" "}
              sections
            </div>
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}