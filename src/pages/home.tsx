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
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { TbBoxMultiple2, TbMovie } from "react-icons/tb";
import { ContentType } from "@prisma/client";
import { GiUnderwearShorts } from "react-icons/gi";

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
        <div className="absolute inset-y-0 flex items-start justify-center">
          <div className="mx-4 mt-28 overflow-auto rounded-sm bg-black bg-opacity-50 p-4 text-zinc-900 lg:mx-16">
            <div className="scrollbar-hide max-h-[35svh] justify-center overflow-auto">
              <div className="flex h-full max-w-sm flex-col gap-2 text-white drop-shadow-md">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    {sponsoredContent?.rating && (
                      <div className="flex h-8 w-8 shrink-0 grow-0">
                        <CircularProgressbar
                          value={sponsoredContent?.rating}
                          minValue={0}
                          maxValue={10}
                          text={sponsoredContent?.rating.toFixed(1).toString()}
                          styles={buildStyles({
                            textColor: "white",
                            textSize: "48px",
                            pathColor: "#32cd32",
                            trailColor: "transparent",
                          })}
                        />
                      </div>
                    )}
                    <div className="flex shrink-0 grow-0">
                      {sponsoredContent?.type === ContentType.MOVIE && (
                        <TbMovie className="text-3xl" />
                      )}
                      {sponsoredContent?.type === ContentType.SERIE && (
                        <TbBoxMultiple2 className="text-3xl" />
                      )}
                      {sponsoredContent?.type === ContentType.SHORT && (
                        <GiUnderwearShorts className="text-3xl" />
                      )}
                    </div>
                  </div>
                  <div className="text-3xl font-black">
                    {sponsoredContent?.name}
                  </div>
                </div>
                <div className="text-base">{sponsoredContent?.description}</div>
              </div>
              <div className=" mt-4 flex w-full gap-1">
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
      </div>
      <div className="z-10 -mt-[186px]">
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
