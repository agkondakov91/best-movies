import "./homePage.scss";

import { useRef } from "react";

import { Header } from "../../components/header/header";
import { Filter } from "../../components/filter/filter";
import { Input } from "../../components/input/input";
import { Pagination } from "../../components/pagination/pagination";
import { Title } from "../../components/title/title";
import { Footer } from "../../components/footer/footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export const HomePage = () => {
  const swiperRef = useRef<any>(null);

  //Pagination
  const prevSlide = () => {
    swiperRef.current.slideTo(0, 1000);
  };

  const nextSlide = () => {
    swiperRef.current.slideTo(5, 1000);
  };

  return (
    <>
      <Header title="Best Movies" subtitle="Top 10 Movies of 2024" />
      <main>
        <section className="search-films root__search-films">
          <Filter
            filterCountry={() => console.log("country")}
            filterRating={() => console.log("rating")}
            filterReset={() => console.log("reset")}
          />
          <Input onSearch={() => console.log("search")} />
        </section>
        <section>
          <div className="pagination root__pagination">
            <Title name="All movies" />
            <Pagination currentPage="0" onPrev={prevSlide} onNext={nextSlide} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};
