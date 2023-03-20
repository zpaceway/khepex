/* eslint-disable @next/next/no-img-element */
import { infoContentAtom } from "@/atoms";
import Debouncer from "@/utils/Debouncer";
import { ContentType, type Content } from "@prisma/client";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { TbBoxMultiple2, TbMovie } from "react-icons/tb";
import { GiUnderwearShorts } from "react-icons/gi";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

type Props = {
  contents: Content[];
  label: string;
};

const Carousel = ({ contents, label }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const debouncerRef = useRef(new Debouncer());
  const [, setInfoContentId] = useAtom(infoContentAtom);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="flex flex-col py-2 px-4 lg:px-16">
      <div className="relative text-2xl font-black">{label}</div>
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
            className="relative flex h-52 w-40 shrink-0 grow-0 flex-col gap-1"
          >
            <div className="relative aspect-square h-52 overflow-hidden rounded-sm">
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
            <div className="absolute bottom-0 flex w-full items-center gap-1 bg-black bg-opacity-50 p-2">
              {content.rating && (
                <div className="w-6 shrink-0 grow-0">
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
              <div>
                {content.type === ContentType.MOVIE && (
                  <TbMovie className="text-base" />
                )}
                {content.type === ContentType.SERIE && (
                  <TbBoxMultiple2 className="text-base" />
                )}
                {content.type === ContentType.SHORT && (
                  <GiUnderwearShorts className="text-base" />
                )}
              </div>
              <div className="truncate text-xs">{content.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
