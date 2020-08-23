import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.less"

const CarouseResource = ({
  multimedias,
  alt,
}) => (
    <Carousel
      autoPlay={false}
      thumbWidth={50}
      showThumbs={false}
      width={"50%"}
      className="carousel"
    >
      {
        multimedias.images instanceof Array && multimedias.images.map((image, index) => (
          <div key={index}>
            <img width={50} src={image.url} alt={alt} />
          </div>
        ))
      }
      {
        multimedias.videos instanceof Array && multimedias.videos.map((video, index) => (
          <div key={index}>
            <video autoPlay={false} width="100%" controls={true}>
              <source src={video.url} />
            </video>
          </div>
        ))
      }
      {
        multimedias.audios instanceof Array && multimedias.audios.map((audio, index) => (
          <div key={index}>
            <audio controls={true} className="audio">
              <source src={audio.url} />
            </audio>
          </div>
        ))
      }
    </Carousel>
  )

CarouseResource.defaultProps = {
  multimedias: {},
  alt: "",
}

export default CarouseResource