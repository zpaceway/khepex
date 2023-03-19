/* eslint-disable @next/next/no-img-element */
import { infoContentAtom } from "@/atoms";
import { type Content } from "@prisma/client";
import { useAtom } from "jotai";
import {
  AiFillCloseCircle,
  AiFillPlayCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { RiDownloadCloudFill } from "react-icons/ri";
import ReactPlayer from "react-player";

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
        className="fixed inset-0 z-40 bg-black	bg-opacity-95 backdrop-blur-md"
        onClick={() => setInfoContentId("")}
      ></div>
      <div className="z-50 flex h-full bg-black shadow-lg shadow-black">
        <div className="relative flex h-full w-full justify-center">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src={content.sponsoredPicture}
              className="h-full w-full object-cover object-bottom"
              alt=""
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-black bg-opacity-40 shadow-inner"></div>
          <div className="max-w-2xl">
            <div className="scrollbar-hide flex h-full w-full flex-col gap-8 overflow-x-auto py-16 px-8">
              <div
                className="flex w-full cursor-pointer justify-center text-4xl"
                onClick={() => setInfoContentId("")}
              >
                <AiFillCloseCircle />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-4xl font-black">{content.name}</div>
                  <div className="text-base">{content.description}</div>
                </div>
              </div>
              <div className="aspect-video">
                <ReactPlayer
                  url={content.sponsoredVideo}
                  height="100%"
                  width="100%"
                />
              </div>
              <div className="flex justify-center text-4xl">
                <div className="flex max-w-xs gap-4">
                  <div>
                    <AiFillPlayCircle />
                  </div>
                  <div>
                    <RiDownloadCloudFill />
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
