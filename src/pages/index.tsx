import { type NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { RiNotificationLine } from "react-icons/ri";
import { AiOutlineCaretDown } from "react-icons/ai";
import { MdInfoOutline, MdPlayArrow } from "react-icons/md";
import { ImMenu } from "react-icons/im";
import { GiPopcorn } from "react-icons/gi";
import Image from "next/image";
import { api } from "@/utils/api";
import Logo from "@/components/Logo";
import LoadingScreen from "@/components/LoadingScreen";

type TNavTabOption = {
  id: string;
  path: string;
  label: string;
};

const navTabOptions: TNavTabOption[] = [
  {
    id: "home",
    path: "home",
    label: "Home",
  },
  {
    id: "tv-shows",
    path: "tv-shows",
    label: "TV Shows",
  },
  {
    id: "movies",
    path: "movies",
    label: "Movies",
  },
  {
    id: "news-and-popular",
    path: "news-and-popular",
    label: "News & Popular",
  },
  {
    id: "my-list",
    path: "my-list",
    label: "My List",
  },
  {
    id: "browse-by-languages",
    path: "browse-by-languages",
    label: "Browse by Languages",
  },
];

const Home: NextPage = () => {
  const { data: movies } = api.movie.getAll.useQuery();
  const { data: featuredMovie } = api.movie.getFeaturedMovie.useQuery();

  const [selectedNavTabOptionId, setSelectedNavTabOptionId] = useState<string>(
    navTabOptions[0]?.id || "home"
  );
  const [shouldPlayFeaturedMovieVideo, setShouldPlayFeaturedMovieVideo] =
    useState<boolean | undefined>(undefined);
  const [isNavBarOnTop, setIsNavBarOnTop] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (shouldPlayFeaturedMovieVideo === false) {
      return;
    }

    const shouldPlayFeaturedMovieVideoInterval = setInterval(() => {
      videoRef.current
        ?.play()
        .then(() => {
          clearInterval(shouldPlayFeaturedMovieVideoInterval);
          setShouldPlayFeaturedMovieVideo(true);
        })
        .catch(console.error);
    }, 200);

    if (videoRef.current)
      videoRef.current.onended = () => setShouldPlayFeaturedMovieVideo(false);

    const isTabActiveInterval = setInterval(() => {
      if (!shouldPlayFeaturedMovieVideo) {
        return;
      }

      if (document.hidden) {
        return videoRef.current?.pause();
      }

      videoRef.current?.play().catch(console.error);
    }, 100);

    return () => {
      clearInterval(shouldPlayFeaturedMovieVideoInterval);
      clearInterval(isTabActiveInterval);
    };
  }, [setShouldPlayFeaturedMovieVideo, shouldPlayFeaturedMovieVideo]);

  if (!featuredMovie || !movies) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-y-auto bg-zinc-900 text-white"
      onScroll={(event) => {
        if ((event.target as HTMLDivElement).scrollTop === 0) {
          return !isNavBarOnTop && setIsNavBarOnTop(true);
        }
        isNavBarOnTop && setIsNavBarOnTop(false);
      }}
    >
      <div className="relative h-[calc(100svh_-_80px)] shrink-0 grow-0">
        <div className="absolute inset-0 overflow-hidden bg-slate-600">
          {!shouldPlayFeaturedMovieVideo &&
            featuredMovie.movie.featuredPicture && (
              <img
                src={featuredMovie.movie.featuredPicture}
                alt="featured-movie-picture"
                className="h-full w-full object-cover"
              />
            )}
          {featuredMovie.movie.featuredVideo && (
            <video
              ref={videoRef}
              src={featuredMovie.movie.featuredVideo}
              className="h-full w-full object-cover"
            ></video>
          )}
        </div>
        <div className="absolute inset-0 w-full overflow-hidden shadow-[inset_0_-180px_80px_-80px_rgba(24,24,27)]"></div>
        <div className="absolute inset-0 w-full overflow-hidden shadow-[inset_0_180px_80px_-80px_rgba(16,16,16)]"></div>
        <div className="absolute bottom-[20%] py-16 px-4 text-2xl text-zinc-900 md:px-16">
          <div className="flex max-w-sm flex-col gap-4 py-4 text-lg text-white drop-shadow-md lg:py-16">
            <div className="text-4xl font-black">
              {featuredMovie.movie.name}
            </div>
            <div className="hidden lg:block">
              {featuredMovie.movie.description}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-purple-500 py-2 pl-4 pr-16 text-white shadow-md">
              <div className="text-4xl">
                <MdPlayArrow className="drop-shadow-md" />
              </div>
              <div className="font-medium drop-shadow-md">Play</div>
            </div>
            <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-600 bg-opacity-70 py-2 pl-4 pr-16 text-white shadow-md">
              <div className="text-4xl">
                <MdInfoOutline className="drop-shadow-md" />
              </div>
              <div className="font-medium drop-shadow-md">More Info</div>
            </div>
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 right-0 z-20 flex select-none justify-between py-4 px-4 transition-all duration-500 md:px-16 ${
            isNavBarOnTop
              ? "bg-transparent shadow-none"
              : "bg-zinc-900 shadow-md"
          }`}
        >
          <div className="flex items-center gap-8">
            <Logo />
            <div className="hidden items-center gap-4 lg:flex">
              {navTabOptions.map((navTabOption) => (
                <div
                  key={`nav-tab-option--${navTabOption.id}`}
                  onClick={() => setSelectedNavTabOptionId(navTabOption.id)}
                  className="relative cursor-pointer text-sm hover:text-zinc-200"
                >
                  <div
                    className={`absolute inset-0 flex items-center justify-center whitespace-nowrap drop-shadow-md ${
                      selectedNavTabOptionId === navTabOption.id
                        ? "font-black text-purple-500"
                        : "font-light text-white"
                    }`}
                  >
                    <div>{navTabOption.label}</div>
                  </div>
                  <div className="whitespace-nowrap opacity-0">
                    {navTabOption.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden items-center gap-4 text-sm lg:flex">
            <div className="drop-shadow-md">
              <FiSearch className="text-2xl" />
            </div>
            <div className="drop-shadow-md">Kids</div>
            <div className="drop-shadow-md">
              <RiNotificationLine className="text-2xl" />
            </div>
            <div className="drop-shadow-md">
              <FaUserCircle className="text-2xl" />
            </div>
            <div className="drop-shadow-md">
              <AiOutlineCaretDown />
            </div>
          </div>
          <div className="flex items-center text-2xl lg:hidden">
            <div className="drop-shadow-md">
              <ImMenu />
            </div>
          </div>
        </div>
      </div>
      <div className="z-10 -mt-40">
        <div className="flex flex-col py-8 px-4 text-2xl md:px-16">
          <div className="font-black">New Releases</div>
          <div className="flex gap-4 overflow-x-auto py-4">
            {movies?.map((movie, index) => (
              <div
                key={`new-realeases-${index}`}
                className="relative aspect-video w-60 shrink-0 grow-0 overflow-hidden rounded-md shadow-[0_0_9px_rgba(21,21,21)]"
              >
                <div className="group absolute inset-0 cursor-pointer transition-all">
                  <div className="hidden h-full w-full items-center justify-center bg-black bg-opacity-50 group-hover:flex">
                    <div className="text-6xl">
                      <MdInfoOutline />
                    </div>
                  </div>
                </div>
                <img
                  src={movie.smallPicture || ""}
                  alt=""
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="z-10">
        <div className="flex flex-col py-8 px-4 text-2xl md:px-16">
          <div className="font-black">New Releases</div>
          <div className="flex gap-4 overflow-x-auto py-4">
            {movies?.map((movie, index) => (
              <div
                key={`new-realeases-${index}`}
                className="relative aspect-video w-60 shrink-0 grow-0 overflow-hidden rounded-md shadow-[0_0_9px_rgba(21,21,21)]"
              >
                <div className="group absolute inset-0 cursor-pointer transition-all">
                  <div className="hidden h-full w-full items-center justify-center bg-black bg-opacity-50 group-hover:flex">
                    <div className="text-6xl">
                      <MdInfoOutline />
                    </div>
                  </div>
                </div>
                <img
                  src={movie.smallPicture || ""}
                  alt=""
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="z-10">
        <div className="flex flex-col py-8 px-4 text-2xl md:px-16">
          <div className="font-black">New Releases</div>
          <div className="flex gap-4 overflow-x-auto py-4">
            {movies?.map((movie, index) => (
              <div
                key={`new-realeases-${index}`}
                className="relative aspect-video w-60 shrink-0 grow-0 overflow-hidden rounded-md shadow-[0_0_9px_rgba(21,21,21)]"
              >
                <div className="group absolute inset-0 cursor-pointer transition-all">
                  <div className="hidden h-full w-full items-center justify-center bg-black bg-opacity-50 group-hover:flex">
                    <div className="text-6xl">
                      <MdInfoOutline />
                    </div>
                  </div>
                </div>
                <img
                  src={movie.smallPicture || ""}
                  alt=""
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
