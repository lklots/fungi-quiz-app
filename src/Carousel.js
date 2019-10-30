import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Magnifier from 'react-magnifier';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import './Carousel.css';

const MAX_HEIGHT = 400;
const MAX_WIDTH = 500;

export default function Carousel({photos}) {
  const images = photos.map( (pic, i) => {
    const { width, height } = calcAspectRatioFit(pic.origWidth, pic.origHeight, MAX_WIDTH, MAX_HEIGHT);
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
    <div className="carousel-container">
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

