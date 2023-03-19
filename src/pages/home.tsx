/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { api } from "@/utils/api";
import { useAtom } from "jotai";
import { infoContentAtom, isLoadingScreenVisibleAtom } from "@/atoms";
import NavBar from "@/components/NavBar";
import Carousel from "@/components/Carousel";
import InfoContent from "@/components/InfoContent";
import Button from "@/components/Button";
import { BsPlayBtnFill } from "react-icons/bs";

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
        <div className="absolute inset-y-0 flex items-center justify-center">
          <div className="my-16 mx-4 flex flex-col items-center justify-center gap-4 rounded-sm bg-black bg-opacity-50 p-4 text-zinc-900 lg:mx-16">
            <div className="flex max-w-sm flex-col gap-2 text-white drop-shadow-md">
              <div className="text-3xl font-black">
                {sponsoredContent?.name}
              </div>
              <div className="text-base">{sponsoredContent?.description}</div>
            </div>
            <div className="flex w-full gap-1">
              <Button>
                <div className="text-2xl">
                  <BsPlayBtnFill className="drop-shadow-md" />
                </div>
                <div className="text-xl font-medium drop-shadow-md">Play</div>
              </Button>
              <Button
                variant="secondary"
                onClick={() => setInfoContentId(sponsoredContent?.id || "")}
              >
                <div className="text-2xl">
                  <MdInfoOutline className="drop-shadow-md" />
                </div>
                <div className="text-xl font-medium drop-shadow-md">Info</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="z-10 -mt-[8.5rem]">
        <Carousel contents={contents || []} />
      </div>
      <div className="z-10">
        <Carousel contents={contents || []} />
      </div>
      <InfoContent content={infoContent} />
    </div>
  );
};

export default Home;
