import { SocialMedia } from "@/components/social-media";

export function HeroSection() {
  return (
      <section id="#" className="flex items-center pt-52 pb-32 max-w-screen-xl w-screen mx-auto px-[7%]">
        <div className=" flex flex-col gap-2 flex-1">
          <span className="font-medium text-2xl text-white/50">Welcome to</span>
          <h1 className="text-8xl -mt-4 ">Mabica</h1>
          <p className="font-medium text-white/50 w-3/4">
            {'"'}Kebahagiaan akan selalu datang di tengah kebersamaan. Apa pun
            itu, lakukanlah bersama-sama. Hidup ceria dan bahagia ketika senyum
            bersama{'"'}.
          </p>
          <SocialMedia />
        </div>
        <div className="w-1/3 bg-[var(--primary)] aspect-square rounded-lg"></div>
      </section>
  )
}
