import Popular from "./Popular";
import TopRevenue from "./TopRevenue";

export default function Ranking() {
  return (
    <section className="flex flex-col gap-5 mt-14 mx-8 xl:max-w-[1280px] xl:mx-auto">
      <TopRevenue />
      <Popular />
    </section>
  );
}
