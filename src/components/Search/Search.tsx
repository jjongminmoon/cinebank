import { TmdbProps } from "@/model/model";
import { HeartIcon } from "@heroicons/react/20/solid";
import { debounce } from "lodash";
import { useMemo, useState } from "react";
import SearchDefault from "@/components/Search/SearchDefault";
import noImage from "@/assets/no-image.jpg";
import { Link } from "react-router-dom";
import { IMG_API, TMDB_API } from "../Api/Api";

export default function Search() {
  const [list, setList] = useState<TmdbProps[]>([]);
  const [search, setSearch] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((search) => {
        setSearch(search);

        // 그 값으로 API 데이터 가져오기
        fetch(
          `${TMDB_API}/search/movie?api_key=${
            import.meta.env.VITE_APP_TMDB_API_KEY
          }&query=${search}`,
        )
          .then((res) => res.json())
          .then((data) => {
            if (!data.errors) {
              setList(data.results);
            } else {
              setList([]);
            }
          });
      }, 20),
    [search],
  );

  return (
    <section className="p-10 xl:max-w-[1280px] mx-auto relative">
      {/* 검색창 */}
      <form>
        <input
          className="search-input mb-5 p-3"
          type="text"
          placeholder="Search Movie..."
          value={search}
          onChange={onChange}
        />
        <button type="submit" className="search-button w-24 h-8">
          Search
        </button>
      </form>
      {/* 자동완성 */}
      <ul className="auto-complete bg-cine-yellow/75 text-cine-navy">
        {list &&
          list.map((item: any) => {
            return (
              <Link to={`/movieDetail/${item.id}`} key={item.id}>
                <li className="flex mb-2">
                  <div className="w-10 h10">
                    <img
                      src={
                        item.poster_path ? `${IMG_API}${item.poster_path}` : `${noImage}`
                      }
                      alt={item.title}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex items-center ml-3 truncate">{item.title}</div>
                </li>
              </Link>
            );
          })}
      </ul>
      {/* 검색결과 및 기본값 */}
      <div className="flex justify-center flex-wrap w-full gap-10">
        {list.length > 0 ? (
          list.map((item): any => (
            <Link to={`/movieDetail/${item.id}`} key={item.id}>
              <div className="w-60 h-30">
                <img
                  src={
                    item.poster_path
                      ? `${IMG_API}${item.poster_path}`
                      : "src/assets/no-image.jpg"
                  }
                  alt={item.title}
                  className="rounded-xl search-poster-img"
                />
                <h3 className="mr-4 truncate">{item.title}</h3>
                <div className="flex justify-between">
                  <div className="flex text-sm text-white items-center">
                    <HeartIcon className="w-4 h-4 text-red-600 mr-1" />
                    {item.vote_count}
                  </div>
                  <div className="flex items-center text-sm">{item.vote_average}</div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <SearchDefault />
        )}
      </div>
    </section>
  );
}
