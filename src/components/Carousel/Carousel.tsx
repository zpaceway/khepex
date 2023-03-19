/* eslint-disable @next/next/no-img-element */
import { type Content } from "@prisma/client";
import { useRef } from "react";
import { MdInfoOutline } from "react-icons/md";

type Props = {
  contents: Content[];
};

const Carousel = ({ contents }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="z-10 -mt-28">
      <div className="flex flex-col py-2 px-4 text-2xl md:px-16">
        <div className="font-black">New Releases</div>
        <div
          ref={ref}
          className="scrollbar-hide flex gap-4 overflow-x-auto"
          onMouseDown={(event) => {
            const carousel = ref.current;
            if (!carousel) return;

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
            };

            const mouseUpHandler = () => {
              document.removeEventListener("mousemove", mouseMoveHandler);
              document.removeEventListener("mouseup", mouseUpHandler);
            };

            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
          }}
        >
          {contents.map((content, index) => (
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
                src={content.smallPicture || ""}
                alt=""
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
