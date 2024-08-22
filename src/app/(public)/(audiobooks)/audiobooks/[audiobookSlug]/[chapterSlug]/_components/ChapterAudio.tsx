interface ChapterAudioProps {
  audio: string;
}

const ChapterAudio = ({ audio }: ChapterAudioProps) => {
  return (
    <section className="container overflow-hidden rounded-xl">
      <iframe
        width="100%"
        height="100"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${audio}&color=%23b9ff66&auto_play=true&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`}
      ></iframe>
    </section>
  );
};

export { ChapterAudio };
