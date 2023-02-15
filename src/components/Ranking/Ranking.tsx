import NowPlaying from "./NowPlaying";
import Popular from "./Popular";

export default function Ranking() {
  return (
    <section className="flex flex-col gap-5 mt-14 mx-8 xl:max-w-[1280px] xl:mx-auto">
      <NowPlaying />
      <Popular />
    </section>
  );
}
