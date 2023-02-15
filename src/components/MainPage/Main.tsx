import CarouselSlide from "./CarouselSlide";
import MostLikes from "./MostLikes";
import Upcoming from "./Upcoming";

export default function MainPage() {
  return (
    <>
      <CarouselSlide />
      <section className="flex flex-col gap-5 mt-14 mx-8 xl:max-w-[1280px] xl:mx-auto">
        <MostLikes />
        <Upcoming />
      </section>
    </>
  );
}
