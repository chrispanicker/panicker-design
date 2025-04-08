import { Ascii } from "@/components/ascii";
import { SplitString } from "@/components/splitString";
import { Fragment_Mono } from "next/font/google";
import Image from "next/image";

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`w-screen h-screen flex justify-center items-center`}>
      <Ascii />
    </div>
  );
}
