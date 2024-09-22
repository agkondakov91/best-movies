import styles from "./homePage.module.scss";
import "swiper/css";

import { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";

import { Header } from "../../components/header/header";
import { Filter } from "../../components/filter/filter";
import { Input } from "../../components/input/input";
import { Pagination } from "../../components/pagination/pagination";
import { Title } from "../../components/title/title";
import { Card } from "../../components/card/card";
import { Footer } from "../../components/footer/footer";

import { fetchMovies } from "../../utils/api";
import { Movie } from "../../../../json-server/types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export const HomePage = () => {
  //States
  const [cardData, setCardData] = useState<Movie[]>([]);
  const [filteredData, setFilteredData] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [heading, setHeading] = useState("All Movies");

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setCardData(data);
      setFilteredData(data);
    };

    loadMovies();
  }, []);

  //Filtering
  const handleSearch = useCallback(
    (searchValue: string) => {
      if (!searchValue) {
        setFilteredData(cardData);
      } else {
        const filtered = cardData.filter((movie) =>
          movie.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredData(filtered);
      }
    },
    [cardData]
  );

  const sortByCountry = useCallback(() => {
    const sorted = [...filteredData].sort((a, b) => {
      if (a.country.toLowerCase() < b.country.toLowerCase()) {
        return -1;
      }

      if (a.country.toLowerCase() > b.country.toLowerCase()) {
        return 1;
      }

      return 0;
    });

    setFilteredData(sorted);
    setHeading("Country");
  }, [filteredData]);

  const sortByRating = useCallback(() => {
    const sorted = [...filteredData].sort((a, b) => b.rating - a.rating);

    setFilteredData(sorted);
    setHeading("Rating");
  }, [filteredData]);

  const resetFilter = useCallback(() => {
    setFilteredData(cardData);
    setHeading("All Movies");
  }, [cardData]);

  //Pagination
  const prevSlide = () => {
    swiperRef.current.slideTo(0, 1000);
  };

  const nextSlide = () => {
    swiperRef.current.slideTo(5, 1000);
  };

  const handleSlideChange = () => {
    const slidesPerView = 3;
    const newPageView =
      Math.floor(swiperRef.current.activeIndex / slidesPerView) + 1;

    setCurrentPage(newPageView);
  };

  return (
    <>
      <Header title="Best Movies" subtitle="Top 10 Movies of 2024" />
      <main>
        <section
          className={clsx(styles.search, styles.root__search)}
          aria-label="Search filters"
        >
          <Filter
            filterCountry={sortByCountry}
            filterRating={sortByRating}
            filterReset={resetFilter}
          />
          <Input onSearch={handleSearch} />
        </section>
        <section aria-label="List of films">
          <div className={clsx(styles.pagination, styles.root__pagination)}>
            <Title name={heading} />
            <Pagination
              currentPage={`0${currentPage}`}
              onPrev={prevSlide}
              onNext={nextSlide}
            />
          </div>
          <ul>
            {filteredData.length > 0 ? (
              <Swiper
                style={{ overflow: "visible" }}
                spaceBetween={20}
                modules={[Navigation]}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={handleSlideChange}
                breakpoints={{
                  1200: {
                    slidesPerView: 5,
                  },
                  1100: {
                    slidesPerView: 4,
                  },
                  830: {
                    slidesPerView: 3,
                  },
                  500: {
                    slidesPerView: 2,
                  },
                  320: {
                    slidesPerView: 1,
                  },
                }}
              >
                {filteredData.map((responseCardData) => (
                  <SwiperSlide key={responseCardData.id}>
                    <Card
                      id={responseCardData.id}
                      imageUrl={`/api${responseCardData.imageUrl}`}
                      name={responseCardData.name}
                      year={responseCardData.year}
                      country={responseCardData.country}
                      rating={responseCardData.rating}
                      alt={responseCardData.alt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className={styles.error}>
                The movie you are looking for was not found, please change your
                search parameters
              </p>
            )}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};
