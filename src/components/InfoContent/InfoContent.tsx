/* eslint-disable @next/next/no-img-element */
import { infoContentAtom } from "@/atoms";
import { ContentType, type Content } from "@prisma/client";
import { useAtom } from "jotai";
import { AiFillPlayCircle, AiFillPlusCircle } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { RiDownloadCloudFill } from "react-icons/ri";
import { BsPlayBtnFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import Button from "../Button";
import { FaGlobe, FaWindowClose } from "react-icons/fa";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { TbBoxMultiple2, TbMovie } from "react-icons/tb";
import { GiUnderwearShorts } from "react-icons/gi";

type Props = {
  content?: Content;
};

const InfoContent = ({ content }: Props) => {
  const [, setInfoContentId] = useAtom(infoContentAtom);

  if (!content) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 z-40 bg-black	bg-opacity-50 backdrop-blur-md"
        onClick={() => setInfoContentId("")}
      ></div>
      <div className="z-50 flex h-full w-full max-w-full bg-black shadow-lg shadow-black lg:max-w-md">
        <div className="relative flex h-full w-full justify-center">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src={content.sponsoredPicture}
              className="h-full w-full object-cover object-bottom"
              alt=""
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-black bg-opacity-60 shadow-inner"></div>
          <div className="flex flex-col overflow-auto">
            <div className="flex aspect-video shrink-0 grow-0 overflow-hidden shadow-lg shadow-black">
              <ReactPlayer
                controls
                url={content.sponsoredVideo}
                height="100%"
                width="100%"
              />
            </div>
            <div className="scrollbar-hide flex w-full flex-col gap-4 px-4 pt-8 pb-16">
              <div className="flex gap-1">
                <Button onClick={() => setInfoContentId("")}>
                  <div className="text-2xl">
                    <BsPlayBtnFill className="drop-shadow-md" />
                  </div>
                  <div className="text-xl font-medium drop-shadow-md">Play</div>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setInfoContentId("")}
                >
                  <div className="text-2xl">
                    <FaWindowClose className="drop-shadow-md" />
                  </div>
                  <div className="text-xl font-medium drop-shadow-md">
                    Close
                  </div>
                </Button>
              </div>
              <div className="flex w-full">
                <div className="flex max-w-md flex-col">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        {content.rating && (
                          <div className="flex h-8 w-8 shrink-0 grow-0">
                            <CircularProgressbar
                              value={content.rating}
                              minValue={0}
                              maxValue={10}
                              text={content.rating.toFixed(1).toString()}
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
                          {content.type === ContentType.MOVIE && (
                            <TbMovie className="text-3xl" />
                          )}
                          {content.type === ContentType.SERIE && (
                            <TbBoxMultiple2 className="text-3xl" />
                          )}
                          {content.type === ContentType.SHORT && (
                            <GiUnderwearShorts className="text-3xl" />
                          )}
                        </div>
                      </div>
                      <div className="text-3xl font-black">{content.name}</div>
                    </div>
                    <div className="text-base">{content.description}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center text-4xl">
                <div className="flex w-full justify-between gap-4">
                  <div>
                    <FaGlobe />
                  </div>
                  <div>
                    <RiDownloadCloudFill />
                  </div>
                  <div>
                    <AiFillPlayCircle />
                  </div>
                  <div>
                    <AiFillPlusCircle />
                  </div>
                  <div>
                    <IoMdShareAlt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoContent;
