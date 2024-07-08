import { SocialMedia } from "@/components/social-media";

export default async function AboutPage() {
  return (
    <main className="flex min-h-[85dvh] flex flex-col min-h-screen max-w-screen-xl w-screen mx-auto px-[7%]">
      <h1 className="text-3xl py-20 text-center mt-10">About Us</h1>
      <div className="flex flex-col gap-3">
        <h2 className="text-5xl ">Kenalan dengan Kami, Yuk!</h2>
        <p className="font-medium opacity-50">
          Mabica (Mari Bikin Cerita) project is an association consisting of
          people who have have an interest in making stories. They come together
          to collaborate in creating various platform such as Spotify and other
          platforms. The aim of this association is to produce works that are
          interesting and entertaining for listeners or readers. <br /><br />
          Apart from that, one of the things that is of concern in this
          association is maintaining the mental health of its member. By doing
          activities such as playing Discord, they try to avoid feelings of
          boredom or stress that can interfere with their creativity. That way,
          they can remain productive and maintain balance between work and
          recreation
        </p>
        <SocialMedia />
      </div>
    </main>
  );
}
