import React, { Component } from 'react';
import Immutable from 'immutable';

class Circle extends Component {

render() {
  const { id, width, height, top, left, colour } = this.props;
  const idClassName = `${id} circle`;

  const backgroundGradient =
    `radial-gradient(
      hsla(${colour}, 100%, 50%, 80%),
      hsla(${colour}, 100%, 50%, 0),
      hsla(${colour}, 100%, 50%, 0))`;

  const webkitBackgroundGradient =
    `-webkit-radial-gradient(
      hsla(${colour}, 100%, 50%, 80%),
      hsla(${colour}, 100%, 50%, 0),
      hsla(${colour}, 100%, 50%, 0))`;

    return (
      <div key={id} className={idClassName}>
        <style jsx>{`
          div {
            border-radius: 50%;
            position: absolute;
            width: ${width};
            height: ${height};
            top: ${top};
            left: ${left};
            background: ${backgroundGradient};
            background: ${webkitBackgroundGradient};
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
        `}</style>
      </div>
    )
  }
}

export default Circle;
