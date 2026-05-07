"use client";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function ProviderReactQuery(
    { children }: 
    { children: React.ReactNode }
) {
    return <QueryClientProvider 
    client={queryClient}>
        {children}
    </QueryClientProvider>;
}