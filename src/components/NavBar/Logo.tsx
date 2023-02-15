import logo from "@/assets/cinebank.png";

export default function Logo() {
  return (
    <div className="w-48 h-12 shrink-0 flex mx-1 sm:mx-2">
      <a href="/" className="flex items-center justify-center">
        <img src={`${logo}`} alt="CINEBANK" />
      </a>
    </div>
  );
}
