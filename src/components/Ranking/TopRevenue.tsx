import { GenreProps, TmdbProps } from "@/model/model";
import { HeartIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMG_API, TMDB_API } from "../Api/Api";

export default function TopRevenue() {
  const [list, setList] = useState<TmdbProps[]>([]);

  useEffect(() => {
    const url = `${TMDB_API}/discover/movie?sort_by=revenue.desc&api_key=${
      import.meta.env.VITE_APP_TMDB_API_KEY
    }&page=1&`;
    axios
      .get(url)
      .then((response) => {
        setList(response.data.results);
        console.log(list);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  return (
    <div className="bg-cine-yellow rounded-2xl p-3 font-bold text-xl">
      <h2 className="rank-title text-cine-navy">The Highest-grossing Profit Ever</h2>
      <div className="flex gap-4 overflow-auto">
        {list &&
          list.map((item): any => (
            <Link to={`/movieDetail/${item.id}`} key={item.id}>
              <div className="w-48 shrink-0 pb-4">
                <img
                  src={`${IMG_API}${item.poster_path}`}
                  alt={item.title}
                  className="main-poster-img"
                />
                <h3 className="mr-4 text-cine-navy text-sm truncate">{item.title}</h3>
                <div className="flex text-sm text-cine-navy items-center">
                  <HeartIcon className="w-4 h-4 text-red-600 mr-1" />
                  {item.vote_count}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
