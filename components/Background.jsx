import React, { Component, Fragment } from 'react';
import Immutable from 'immutable';
import Circle from '../components/Circle';
import { getRandomisedNumber } from "../libs/utils";

class Background extends Component {
  constructor(props) {
    super(props);
    const circleIds = Immutable.List([
      'circle1',
      'circle2',
      'circle3',
      'circle4',
      'circle5',
      'circle6'
    ]);

    let circles =  Immutable.Map();

    circleIds.map((id) => {
      const circleSize = getRandomisedNumber(150, 450);
      circles = circles
        .setIn([id, 'width'], `${circleSize}px`)
        .setIn([id, 'height'], `${circleSize}px`)
        .setIn([id, 'top'], `${getRandomisedNumber(-50, 200)}px`)
        .setIn([id, 'left'], `${getRandomisedNumber(150, 450)}px`)
        .setIn([id, 'colour'], getRandomisedNumber(0, 360));
    });

    this.state = {
      circles,
      circleIds,
    }
  }

  componentDidMount() {
    let { circles, circleIds } = this.state;

    this.setState({ circles, circleIds });
  }

  render() {
    const { circles, circleIds } = this.state;

    return (
      <div>
        {circleIds.map((id) => (
          <Circle
            key={id}
            id={id}
            width={circles.getIn([id, 'width'])}
            height={circles.getIn([id, 'height'])}
            top={circles.getIn([id, 'top'])}
            left={circles.getIn([id, 'left'])}
            colour={circles.getIn([id, 'colour'])}
        />
        ))}
      </div>
      )
  }
}

export default Background;
