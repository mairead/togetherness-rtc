import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Background from '../components/Background';
import Letter from '../components/Letter';
import MousePointer from '../components/MousePointer';

class Board extends Component {
  static propTypes = {
    userId: PropTypes.string,
    usersList: ImmutablePropTypes.map,
  }

  constructor(props) {
    super(props);

    this.state = {
      // x: 0,
      // y: 0,
      // boardOffset: 0,
      width: 0,
      height: 0,
    };

    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // componentDidMount() {
  //   this.updateWindowDimensions();
  //   window.addEventListener('resize', this.updateWindowDimensions);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateWindowDimensions);
  // }

  // updateWindowDimensions() {
  //   const boardOffset = (window.innerWidth - 800) / 2;
  //   // console.log('boardOffset', boardOffset);
  //   this.setState({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //     // boardOffset,
  //   });
  // }

  render() {
    const { userId, usersList } = this.props;
    const letterArray = ['t', 'o', 'g', 'e', 't', 'h', 'e', 'r'];
    // const { x, y } = this.state;
    const userIds = Object.keys(usersList.toJS());
    return (
      <div className="board">
        {userIds.map((userId) => (
          <MousePointer
            key={userId}
            colour={usersList.getIn([userId, 'mousePointerColour'])}
            xPos={usersList.getIn([userId, 'x'])}
            yPos={usersList.getIn([userId, 'y'])}
            size={usersList.getIn([userId, 'size'])}
          />
        ))}
        <Background />
        {letterArray.map((char, index) => (
          <Letter
            key={index}
            char={char}
            xPos={index}
            yPos={0}
            usersList={usersList}
          />
        ))}

        <style jsx>{`
          .board {
            margin: 0;
            cursor: none;
            width: 800px;
            height: 400px;
            position: relative;
            z-index:0;
            // border: 1px solid black;
          }
        `}</style>
      </div>
    );
  }
}

export default Board;
