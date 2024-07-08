import { SocialMedia } from "@/components/social-media";

export function HeroSection() {
  return (
      <section id="#" className="flex flex-col-reverse md:flex-row pt-32 md:pt-52 pb-32 gap-6 w-screen-xl w-screen mx-auto px-[7%]">
        <div className=" flex flex-col gap-2 flex-1">
          <span className="font-medium hidden md:block text-2xl text-text opacity-50">Welcome to</span>
          <h1 className="text-6xl -mt-2 md:-mt-4 ">Mabica</h1>
          <p className="font-medium text-text opacity-50 md:w-3/4">
            “Kebahagiaan akan selalu datang di tengah kebersamaan. Apa pun
            itu, lakukanlah bersama-sama. Hidup ceria dan bahagia ketika senyum
            bersama”
          </p>
          <SocialMedia />
        </div>
        <div className="md:w-1/3 bg-primary aspect-[12/8] md:aspect-square rounded-lg"></div>
        <span className="font-medium md:hidden text-2xl text-text opacity-50">Welcome to</span>
      </section>
  )
}
