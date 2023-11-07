import React from 'react';
import videoFile from './animated.mp4';
import imageFile from './image.jpg';
import './VideoImage.css';


function VideoImage() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <video autoplay loop muted playsinline style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover', objectPosition: '0 0' }}>
        <source src={videoFile} type="video/mp4" />
      </video>
      <img src={imageFile} alt="Image" style={{ position: 'absolute', top: 0, right: 0, objectFit: 'cover', objectPosition: '100% 0' }} />
      <video autoplay loop muted playsinline style={{ position: 'absolute', bottom: 0, right: 0, objectFit: 'cover', objectPosition: '100% 100%' }}>
        <source src={videoFile} type="video/mp4" />
      </video>
      <img src={imageFile} alt="Animated GIF" style={{ position: 'absolute', bottom: 0, left: 0, objectFit: 'cover', objectPosition: '0 100%' }} />
    </div>
  );
}

/*<video autoplay loop muted playsinline className="video">
<source src={videoFile} type="video/mp4" />
</video>
<img src={imageFile} alt="Image" className="image" />

*/ 

export default VideoImage;
