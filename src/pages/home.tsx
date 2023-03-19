/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdInfoOutline, MdPlayArrow } from "react-icons/md";
import { api } from "@/utils/api";
import { useAtom } from "jotai";
import { infoContentAtom, isLoadingScreenVisibleAtom } from "@/atoms";
import NavBar from "@/components/NavBar/NavBar";
import Carousel from "@/components/Carousel/Carousel";
import InfoContent from "@/components/InfoContent/InfoContent";

const Home: NextPage = () => {
  const { data: contents } = api.content.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const { data: sponsoredContent } = api.content.getSponsoredContent.useQuery(
    undefined,
    { refetchOnWindowFocus: false }
  );

  const [, setIsLoadingScreenVisible] = useAtom(isLoadingScreenVisibleAtom);
  const [infoContentId, setInfoContentId] = useAtom(infoContentAtom);

  const infoContent = useMemo(() => {
    return contents?.find((content) => content.id === infoContentId);
  }, [contents, infoContentId]);

  const [isNavBarOnTop, setIsNavBarOnTop] = useState(true);

  const appRef = useRef<HTMLDivElement>(null);
  const sponsoredContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appElement = appRef.current;
    const sponsoredContainer = sponsoredContainerRef.current;

    const topIntersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsNavBarOnTop(!!entry?.isIntersecting);
      },
      { root: appElement, rootMargin: "0px", threshold: 1.0 }
    );

    if (appElement && sponsoredContainer) {
      topIntersectionObserver.observe(sponsoredContainer);
    }

    return () => {
      topIntersectionObserver.disconnect();
    };
  }, [sponsoredContent, contents]);

  useEffect(() => {
    if (sponsoredContent && contents) {
      setTimeout(() => {
        setIsLoadingScreenVisible(false);
      }, 2000);
    }
  }, [setIsLoadingScreenVisible, sponsoredContent, contents]);

  return (
    <div
      ref={appRef}
      className="no-highlight-color fixed inset-0 flex select-none flex-col overflow-y-auto bg-zinc-900 text-white"
    >
      <NavBar transparent={isNavBarOnTop} />
      <div className="relative h-[calc(100svh_-_80px)] shrink-0 grow-0">
        <div
          className="absolute inset-0 overflow-hidden bg-slate-600"
          ref={sponsoredContainerRef}
        >
          <img
            src={sponsoredContent?.sponsoredPicture || ""}
            alt="sponsored-movie-picture"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 w-full overflow-hidden shadow-[inset_0_-180px_80px_-80px_rgba(24,24,27)]"></div>
        <div className="absolute inset-0 w-full overflow-hidden shadow-[inset_0_180px_80px_-80px_rgba(16,16,16)]"></div>
        <div className="absolute bottom-[10%] my-16 mx-4 flex flex-col gap-8 rounded-md bg-black bg-opacity-50 p-8 text-2xl text-zinc-900 md:mx-16">
          <div className="flex max-w-sm flex-col gap-4 text-lg text-white drop-shadow-md">
            <div className="text-4xl font-black">{sponsoredContent?.name}</div>
            <div className="hidden tall:block">
              {sponsoredContent?.description}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-purple-500 py-2 pl-4 pr-16 text-white shadow-md">
              <div className="text-4xl">
                <MdPlayArrow className="drop-shadow-md" />
              </div>
              <div className="font-medium drop-shadow-md">Play</div>
            </div>
            <div
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-600 bg-opacity-70 py-2 pl-4 pr-16 text-white shadow-md"
              onClick={() => setInfoContentId(sponsoredContent?.id || "")}
            >
              <div className="text-4xl">
                <MdInfoOutline className="drop-shadow-md" />
              </div>
              <div className="font-medium drop-shadow-md">Info</div>
            </div>
          </div>
        </div>
      </div>
      <Carousel contents={contents || []} />
      <InfoContent content={infoContent} />
    </div>
  );
};

export default Home;
