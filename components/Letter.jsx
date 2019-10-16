import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MousePointer from '../components/MousePointer';

class Letter extends Component {
  static propTypes = {
    char: PropTypes.string.isRequired,
    xPos: PropTypes.number.isRequired,
    yPos: PropTypes.number.isRequired,
    mouseXPos: PropTypes.number.isRequired,
    mouseYPos: PropTypes.number.isRequired,
  }

  getFontColour = (boardXPos) => {
    const { mouseXPos } = this.props;

    let fontColour = 'black';
    const distanceFromCenter = this.getDistanceFromCenter(boardXPos);

    const hue = (360 / 50) * distanceFromCenter;

    if (mouseXPos >= (boardXPos) && mouseXPos <= (boardXPos+100)) {
    // if (mouseXPosAdjusted >= (boardXPos+100) && mouseXPosAdjusted <= (boardXPos+200)) {
      fontColour = `hsl(${hue}, 100%, 50%)`;
    }

    return fontColour;
  }

  getDistanceFromCenter = (boardXPos) => {
    const { mouseXPos } = this.props;
    const centerOfLetter = boardXPos + 50;
    let distanceFromCenter = 0;

    if (mouseXPos <= centerOfLetter) {
      distanceFromCenter = centerOfLetter - mouseXPos;
    } else if (mouseXPos >= centerOfLetter) {
      distanceFromCenter = mouseXPos - centerOfLetter;
    };

    return distanceFromCenter;
  }

  render () {
    const { char, xPos } = this.props;
    const boardXPos = (100 * xPos);
    const translateXPos = `${boardXPos}px`;
    const fontColour = this.getFontColour(boardXPos);

    return (
      <p>
        {char}
        <style jsx>{`
          @import url(//db.onlinewebfonts.com/c/4b76b99051d6848168d9f187b7eeb9c1?family=RosewoodW01-Regular);
          @font-face {font-family: "RosewoodW01-Regular";
            src: url("//db.onlinewebfonts.com/t/4b76b99051d6848168d9f187b7eeb9c1.woff") format("woff"),
          }
          p {
            color: ${fontColour};
            position: absolute;
            bottom: 0;
            left: 0;
            transform: translateX(${translateXPos});
            font-size: 150px;
            text-transform: uppercase;
            font-family: "RosewoodW01-Regular"
          }
        `}</style>
      </p>
    );
  }
}

export default Letter;
