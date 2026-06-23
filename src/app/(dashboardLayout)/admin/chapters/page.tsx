/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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
  useDeleteChapterMutation,
  useGetAllChaptersQuery,
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

export default function ChaptersManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [chapterToDelete, setChapterToDelete] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, error, refetch } = useGetAllChaptersQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: debouncedSearchTerm || undefined,
  });

  const [deleteChapter, { isLoading: isDeleting }] =
    useDeleteChapterMutation();

  const chapters: any[] = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 0;
  const safePage = totalPages > 0 ? Math.min(currentPage, totalPages) : currentPage;

  const handleDelete = async () => {
    if (!chapterToDelete) return;

    try {
      await deleteChapter(chapterToDelete).unwrap();
      toast.success("Chapter deleted successfully!");
      setChapterToDelete(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete chapter");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#007A8A]" />
            <p className="mt-4 text-gray-600">Loading chapters...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Error loading chapters. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-gray-950">Chapters</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all chapters of the legal guide and their hierarchical
            content structure.
          </p>
        </div>
        <Link
          href="/admin/chapters/create"
          className="flex items-center gap-2 rounded-full bg-[#007A8A] px-6 py-3 font-semibold text-white shadow transition-all hover:bg-[#006674]"
        >
          <Plus size={20} /> Add New Chapter
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search chapters by title or number..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 py-3.5 pl-12 pr-4 transition-all focus:border-[#007A8A] focus:outline-none focus:ring-2 focus:ring-[#007A8A]/10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F6F6F6]">
                <th className="px-8 py-5 font-normal">Chapter No.</th>
                <th className="px-8 py-5 font-normal">Chapter Title</th>
                <th className="px-8 py-5 text-center font-normal">
                  Display Order
                </th>
                <th className="px-8 py-5 font-normal">Last updated</th>
                <th className="py-5 pl-8 pr-12 text-right font-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {chapters.map((chapter) => (
                <tr
                  key={chapter.id}
                  className="border-b border-gray-200 transition-colors hover:bg-gray-50/50"
                >
                  <td className="px-8 py-6 font-medium">{chapter.number}</td>
                  <td className="max-w-md px-8 py-6">
                    <div className="truncate" title={chapter.title}>
                      {chapter.title}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    {chapter.order ?? "-"}
                  </td>
                  <td className="px-8 py-6">
                    {chapter.updatedAt
                      ? new Date(chapter.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : "-"}
                  </td>
                  <td className="py-6 pl-8 pr-10 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/chapters/edit/${chapter.id}`}
                        className="rounded-lg p-2.5 text-gray-400 transition-all hover:bg-[#007A8A]/5 hover:text-[#007A8A]"
                      >
                        <Edit2 size={18} />
                      </Link>

                      <Dialog
                        open={chapterToDelete === chapter.id}
                        onOpenChange={(isOpen) =>
                          setChapterToDelete(isOpen ? chapter.id : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <button
                            className="cursor-pointer rounded-lg p-2.5 text-red-400 transition-all hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
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
                              This will permanently delete Chapter{" "}
                              <span className="font-bold text-gray-900">
                                #{chapter.number}
                              </span>{" "}
                              - {chapter.title}. This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setChapterToDelete(null)}
                              className="rounded-xl border-gray-100 px-6 py-6 font-semibold hover:bg-gray-50"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleDelete}
                              className="rounded-xl bg-red-500 px-6 py-6 font-semibold text-white hover:bg-red-600"
                            >
                              Delete Chapter
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

        {chapters.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              {debouncedSearchTerm
                ? `No chapters found matching "${debouncedSearchTerm}"`
                : "No chapters available"}
            </p>
            {!debouncedSearchTerm && (
              <Link
                href="/admin/chapters/create"
                className="mt-4 inline-block font-medium text-[#007A8A] hover:text-[#006674]"
              >
                Create your first chapter
              </Link>
            )}
          </div>
        )}

        {meta && meta.total > itemsPerPage && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-8 py-6 sm:flex-row">
            <div className="text-sm text-gray-500">
              Showing {(safePage - 1) * meta.limit + 1}-
              {Math.min(safePage * meta.limit, meta.total)} of {meta.total}
              {debouncedSearchTerm && " search results"}
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