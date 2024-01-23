import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import "./imageSlider.css";

interface IProps {
  photos: string[];
  slideNumber: number;
  setSlideNumber: (slideNumber: number) => void;
  setOpen: (open: boolean) => void;
}

const ImageSlider = ({
  photos,
  slideNumber,
  setSlideNumber,
  setOpen,
}: IProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const photosLength = photos.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="slider">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="close"
        onClick={() => setOpen(false)}
      />
      <div className="sliderWrapper" ref={ref}>
        {photosLength > 1 && ( <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="arrow left-arrow"
          onClick={() =>
            setSlideNumber(
              slideNumber === 0 ? photos.length - 1 : slideNumber - 1
            )
          }
        />)}
        <img
          src={photos[slideNumber]}
          alt=""
          className="sliderImg"
          draggable={false}
        />
        { photosLength > 1 && ( <FontAwesomeIcon
          icon={faCircleArrowRight}
          className="arrow right-arrow"
          onClick={() =>
            setSlideNumber(
              slideNumber === photos.length - 1 ? 0 : slideNumber + 1
            )
          }
        />)}
      </div>
      {photosLength > 1 && (
          <div className="sliderNumber">
            {slideNumber + 1}/{photosLength}
          </div>
        )}
    </div>
  );
};

export default ImageSlider;
