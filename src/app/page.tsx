import { Ascii } from "@/components/ascii";
import { Fragment_Mono } from "next/font/google";

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`w-screen h-screen flex justify-center items-center uppercase tracking-[-.1rem] ${fragmentMono.className}`}>
      <Ascii />
    </div>
  );
}
