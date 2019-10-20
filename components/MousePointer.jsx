import React from 'react';

const MousePointer = ({ xPos, yPos, colour, size }) => {
  console.log('size in mouse pointer', size);
  const backgroundGradient =
  `radial-gradient(
    hsla(${colour}, 100%, 50%, 80%),
    hsla(${colour}, 100%, 50%, 0),
    hsla(${colour}, 100%, 50%, 0))`;

  return (
    <div>
      <style jsx>{`
        div{
          position: absolute;
          display: block;
          top: ${yPos - (size/2)}px;
          left: ${xPos - (size/2)}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background-image: ${backgroundGradient};
        }
      `}</style>
    </div>
  )

}

export default MousePointer;