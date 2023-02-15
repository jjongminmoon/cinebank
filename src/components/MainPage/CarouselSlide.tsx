import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselSlide() {
  return (
    <Carousel
      className="carousel-container"
      showThumbs={false}
      showArrows={true}
      infiniteLoop={true}
      showStatus={false}
    >
      <div className="carousel-slide">
        <a href="/search" className="w-full">
          <img src="src\assets\search.gif" alt="serach image" />
        </a>
      </div>
      <div className="carousel-slide">
        <a href="/community" className="w-full">
          <img src="src\assets\community.png" alt="community image" />
        </a>
      </div>
      <div className="carousel-slide">
        <a href="/etc" className="w-full">
          <img src="src\assets\etc.png" alt="serach image" />
        </a>
      </div>
    </Carousel>
  );
}
