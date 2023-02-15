import { ActorProps, MovieDetailProps } from "@/model/model";
import { HeartIcon, StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_API } from "../Api/Api";
import axios from "axios";
import noImage from "@/assets/no-image.jpg";

export default function MovieDetail({}) {
  const [list, setList] = useState<MovieDetailProps[] | any>({});
  const [actor, setActor] = useState<ActorProps[] | any>({});
  const { movie_id } = useParams();

  // 영화 디테일 API
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${[movie_id]}?api_key=${
      import.meta.env.VITE_APP_TMDB_API_KEY
    }`;
    axios
      .get(url)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  // 배우 API
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${[movie_id]}/credits?api_key=${
      import.meta.env.VITE_APP_TMDB_API_KEY
    }`;
    axios
      .get(url)
      .then((response) => {
        setActor(response.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  return (
    <figure className="w-full p-7">
      <div className="flex mb-7" key={list.id}>
        {/* 포스터 */}
        <img
          src={`${IMG_API}${list.poster_path}`}
          alt={list.title}
          className="w-80 h-auto rounded-xl"
        />
        <div className="flex flex-col pl-5 gap-2">
          {/* 제목 */}
          <div className="font-bold text-2xl">{list.title}</div>
          {/* 평점 및 기본정보 */}
          <div className="flex items-center mb-5">
            <StarIcon className="w-4 h-4 mr-2" />
            <span className="text-white mr-2">{list.vote_average}</span>
            <span className="text-gray-500 mr-3">/ 10</span>
          </div>
          <div>- Releas Date: {list.release_date}</div>
          <div>- Runtime: {list.runtime} min</div>
          {/* 장르 */}
          <div className="flex items-center">
            <p className="mr-2">- Genre: </p>
            {list.genres &&
              list.genres.map((item: any) => (
                <div key={item.id} className="genre p-1 h-8">
                  {item.name}
                </div>
              ))}
          </div>
          {/* 줄거리 */}
          <div className="mt-10">
            <p className="overview w-20 h-6">Overview</p>
            <p className="mb-5">{list.tagline}</p>
            <p>{list.overview}</p>
          </div>
        </div>
      </div>
      <div>
        {/* 출연 배우 */}
        <div className="font-bold text-2xl mb-5">- Cast</div>
        <div className="flex gap-10 overflow-auto mb-10">
          {actor.cast &&
            actor.cast.map((item: any) => (
              <>
                <div
                  key={item.id}
                  className="flex flex-col w-40 h-44 items-center shrink-0"
                >
                  <img
                    src={
                      item.profile_path ? `${IMG_API}${item.profile_path}` : `${noImage}`
                    }
                    alt={item.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="text-sm">{item.name}</div>
                  <div className="text-gray-500 text-xs">{item.character}</div>
                </div>
              </>
            ))}
        </div>
        <div className="font-bold text-2xl mb-5">- Production Crew</div>
        <div className="flex gap-10 overflow-auto">
          {actor.crew
            ?.filter((item: any) => item.job.includes("Director"))
            .map((item: any) => (
              <>
                <div
                  key={item.id}
                  className="flex flex-col w-40 h-44 items-center shrink-0"
                >
                  <img
                    src={
                      item.profile_path ? `${IMG_API}${item.profile_path}` : `${noImage}`
                    }
                    alt={item.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="text-sm">{item.name}</div>
                </div>
              </>
            ))}
        </div>
      </div>
    </figure>
  );
}
