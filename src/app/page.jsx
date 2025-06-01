"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // redirect ke halaman login
  }, [router]);

  return null; // tidak perlu render apa-apa di halaman ini
}

