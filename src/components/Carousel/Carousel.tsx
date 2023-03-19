/* eslint-disable @next/next/no-img-element */
import { infoContentAtom } from "@/atoms";
import Debouncer from "@/utils/Debouncer";
import { ContentType, type Content } from "@prisma/client";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { TbBoxMultiple2, TbMovie } from "react-icons/tb";
import { GiUnderwearShorts } from "react-icons/gi";

type Props = {
  contents: Content[];
};

const Carousel = ({ contents }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const debouncerRef = useRef(new Debouncer());
  const [, setInfoContentId] = useAtom(infoContentAtom);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="flex flex-col py-2 px-4 lg:px-16">
      <div className="text-2xl font-black">New Releases</div>
      <div
        ref={ref}
        className="scrollbar-hide flex gap-1 overflow-x-auto"
        onMouseDown={(event) => {
          const carousel = ref.current;
          if (!carousel) return;

          let didMove = false;

          const pos = {
            left: carousel.scrollLeft,
            top: carousel.scrollTop,
            x: event.clientX,
            y: event.clientY,
          };

          const mouseMoveHandler = (event: MouseEvent) => {
            const deltaX = event.clientX - pos.x;
            const deltaY = event.clientY - pos.y;
            carousel.scrollTop = pos.top - deltaY;
            carousel.scrollLeft = pos.left - deltaX;
            if (Math.abs(deltaX) >= 8 || Math.abs(deltaY) >= 8) {
              didMove = true;
              setIsDragging(true);
            }
          };

          const mouseUpHandler = () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
            if (didMove) debouncerRef.current.exec(() => setIsDragging(false));
          };

          document.addEventListener("mousemove", mouseMoveHandler);
          document.addEventListener("mouseup", mouseUpHandler);
        }}
      >
        {contents.map((content, index) => (
          <div
            key={`new-realeases-${index}`}
            onClick={() => !isDragging && setInfoContentId(content.id)}
            className="relative flex h-40 w-32 shrink-0 grow-0 flex-col gap-1"
          >
            <div className="relative aspect-square h-40 overflow-hidden rounded-sm">
              <div className="group absolute inset-0 cursor-pointer transition-all">
                <div className="hidden h-full w-full items-center justify-center bg-black bg-opacity-50 group-hover:flex">
                  <div className="text-6xl">
                    <MdInfoOutline />
                  </div>
                </div>
              </div>
              <img
                src={content.smallPicture || ""}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 z-20  flex w-full items-center gap-1 bg-black bg-opacity-50 p-2">
              <div>
                {content.type === ContentType.MOVIE && (
                  <TbMovie className="text-lg" />
                )}
                {content.type === ContentType.SERIE && (
                  <TbBoxMultiple2 className="text-lg" />
                )}
                {content.type === ContentType.SHORT && (
                  <GiUnderwearShorts className="text-lg" />
                )}
              </div>
              <div className="truncate text-sm">{content.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
