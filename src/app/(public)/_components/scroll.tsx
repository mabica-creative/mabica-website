import Image from "next/image";

export function Scroll() {
  return (
    <div className="relative">
      <Image src="/scroll.png" className="absolute top-0 left-0 -mt-52 -ml-20 animate-spin-slow" alt="scroll" width="200" height="200" />
    </div>
  );
}
