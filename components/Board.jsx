import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Background from '../components/Background';
import Letter from '../components/Letter';
import MousePointer from '../components/MousePointer';

class Board extends Component {
  static propTypes = {
    userId: PropTypes.string,
    usersTotal: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      boardOffset: 0,
      width: 0,
      height: 0,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const boardOffset = (window.innerWidth - 800) / 2;
    // console.log('boardOffset', boardOffset);
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      // boardOffset,
    });
  }

  // _onMouseMove(e) {
  //   const { boardOffset } = this.state;
  //   const boardMousePosX = e.screenX - boardOffset;
  //   console.log(boardOffset, boardMousePosX);
  //   this.setState({ x: boardMousePosX, y: e.screenY });
  // }

  render() {
    const { userId, usersTotal, usersList } = this.props;
    const letterArray = ['t', 'o', 'g', 'e', 't', 'h', 'e', 'r'];
    const { x, y } = this.state;

    // TODO Doesn't currently include
    console.log('list in board component', usersList.toJS());
    // TODO UsersList is an object literal, maybe I need an Immutable Map and keys?
    const userIds = Object.keys(usersList.toJS());
    console.log('whats userIds?', userIds);

    console.log(usersList.get(['OUC5b33jvN-1', 'size']));
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
        <p><span className="left">{userId}</span><span>{x},{y}</span><span className="right">Users:{usersTotal}</span></p>
        <Background />
        {letterArray.map((char, index) => (
          <Letter
            key={index}
            char={char}
            xPos={index}
            yPos={0}
            usersList={usersList}
            mouseXPos={x}
            mouseYPos={y}
          />
        ))}

        <style jsx>{`
          .board {
            margin: 0;
            // cursor: none;
            width: 800px;
            height: 400px;
            position: relative;
            z-index:0;
            border: 1px solid black;
          }
          p {
            margin: 5px;
            display: flex;
            width: 100%;
            text-align: center;
            font-size: 12px;
            text-transform: none;
          }
          span {
            width: 33%;
          }
          .right {
            position: absolute;
            right: 10px;
            bottom: 10px;
            font-weight: bold;
            text-align: right;
          }
          .left {
            text-align: left;
          }
        `}</style>
      </div>
    );
  }
}

export default Board;
