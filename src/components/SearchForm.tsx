"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/search`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search elements, spaces, feeling..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
    </form>
  );
}
