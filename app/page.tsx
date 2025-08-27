import Hero from "@/components/Hero";
import Collections from '@/components/Collections';

import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
        <Hero />
        <Collections />
    </div>
  );
}
