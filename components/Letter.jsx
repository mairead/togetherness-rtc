import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MousePointer from '../components/MousePointer';

class Letter extends Component {
  static propTypes = {
    char: PropTypes.string.isRequired,
    xPos: PropTypes.number.isRequired,
    yPos: PropTypes.number.isRequired,
    mouseXPos: PropTypes.number.isRequired,
    mouseYPos: PropTypes.number.isRequired,
    usersList: ImmutablePropTypes.map,
  }

  getFontColour = (boardXPos) => {
    const { usersList } = this.props;

    let fontColour = 'black';

    // TODO Need to build in yPos detection also
    const userIds = Object.keys(usersList.toJS());
    userIds.forEach((userId) => {
      const mouseXPos = usersList.getIn([userId, 'x']);
      const distanceFromCenter = this.getDistanceFromCenter(mouseXPos, boardXPos);
      const hue = (360 / 50) * distanceFromCenter;
      // Letters only turning red on off and not cycling colours?
      if (mouseXPos >= (boardXPos) && mouseXPos <= (boardXPos+100)) {
        // if (mouseXPosAdjusted >= (boardXPos+100) && mouseXPosAdjusted <= (boardXPos+200)) {
        fontColour = `hsl(${hue}, 100%, 50%)`;
      }
    });

    return fontColour;
  }

  getDistanceFromCenter = (mouseXPos, boardXPos) => {
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
          @import url("https://hello.myfonts.net/count/3a62c5");
          @font-face {
            font-family: 'CountryWestern';
            src: url('/static/3A62C5_0_0.eot');
            src: url('/static/3A62C5_0_0.eot?#iefix') format('embedded-opentype'),
              url('/static/3A62C5_0_0.woff2') format('woff2'),
              url('/static/3A62C5_0_0.woff') format('woff'),
              url('/static/3A62C5_0_0.ttf') format('truetype');
            }
          }
          p {
            color: ${fontColour};
            position: absolute;
            bottom: 0;
            left: 0;
            transform: translateX(${translateXPos});
            font-size: 175px;
            text-transform: uppercase;
            font-family: "CountryWestern"
          }
        `}</style>
      </p>
    );
  }
}

export default Letter;
