import { TmdbProps } from "@/model/model";
import { HeartIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMG_API, TMDB_API } from "../Api/Api";

export default function SearchDefault() {
  const [list, setList] = useState<TmdbProps[]>([]);

  useEffect(() => {
    const url = `${TMDB_API}/discover/movie?sort_by=popularity.desc&api_key=${
      import.meta.env.VITE_APP_TMDB_API_KEY
    }&page=1`;
    axios
      .get(url)
      .then((response) => {
        setList(response.data.results);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  return (
    <>
      {list &&
        list.map((item): any => (
          <Link to={`/movieDetail/${item.id}`} key={item.id}>
            <div className="w-60 h-30" key={item.id}>
              <img
                src={`${IMG_API}${item.poster_path}`}
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
        ))}
    </>
  );
}
