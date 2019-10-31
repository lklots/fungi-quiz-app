import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Magnifier from 'react-magnifier';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import './useWindowSize.js';

import './Carousel.css';
import useWindowSize from './useWindowSize.js';

const PIC_MAX_HEIGHT_PERCENT = 40;
const PIC_MAX_WIDTH_PX = 500; // iNaturalist medium image width is 500px

export default function Carousel({photos}) {

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const images = photos.map( (pic, i) => {
    const { width, height } = calcAspectRatioFit(pic.origWidth, pic.origHeight, PIC_MAX_WIDTH_PX, (PIC_MAX_HEIGHT_PERCENT * windowHeight)/100);
    return (
      <div key={i} className="carousel-slide">
        <Magnifier src={pic.url} width={width} height={height} />
      </div>
    );
  });
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />
  };
  return (
    // HACKS: contain the width of the carousel and leave some space for the arrows.
    <div className="carousel-container" style={{width: Math.min(PIC_MAX_WIDTH_PX-100, windowWidth-100)+"px" }}>
      <Slider {...settings}>
        {images}
      </Slider>
    </div>
  );
}

function calcAspectRatioFit(width, height, maxWidth, maxHeight) {
  const ratio = Math.min(maxWidth / width, maxHeight / height);
  return { width: width*ratio, height: height*ratio };
}

function ArrowNext(props) {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="carousel-arrow-next">
      <ArrowForwardRoundedIcon color="action" fontSize="large" />
    </div>
  );
}

function ArrowPrev(props) {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="carousel-arrow-prev">
      <ArrowBackRoundedIcon color="action" fontSize="large" />
    </div>
  );
}

