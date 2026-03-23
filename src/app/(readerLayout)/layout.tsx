"use client";

import ReaderSidebar from "@/components/module/Reader/ReaderSidebar";

export default function ReaderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-white min-h-screen">
            <ReaderSidebar />
            <main className="flex-1 ml-80 min-h-screen bg-white">
                <div>
                    {children}
                </div>
            </main>
        </div>
    );
}
