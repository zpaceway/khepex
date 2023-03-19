/* eslint-disable @next/next/no-img-element */
import { infoContentAtom } from "@/atoms";
import { type Content } from "@prisma/client";
import { useAtom } from "jotai";
import {
  AiFillPlayCircle,
  AiFillPlusCircle,
  AiOutlineCloseSquare,
} from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { RiDownloadCloudFill } from "react-icons/ri";
import { BsPlayBtnFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import Button from "../Button";
import { FaGlobe, FaWindowClose } from "react-icons/fa";

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
          <div className="absolute inset-0 -z-10 bg-black bg-opacity-40 shadow-inner"></div>
          <div className="flex flex-col overflow-auto">
            <div className="flex aspect-video overflow-hidden">
              <ReactPlayer
                controls
                url={content.sponsoredVideo}
                height="100%"
                width="100%"
              />
            </div>
            <div className="scrollbar-hide flex w-full flex-col gap-2 overflow-x-auto px-4 pt-2 pb-16">
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
                    <div className="text-3xl font-black">{content.name}</div>
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
