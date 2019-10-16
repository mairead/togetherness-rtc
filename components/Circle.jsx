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
          }
        `}</style>
      </div>
    )
  }
}

export default Circle;
