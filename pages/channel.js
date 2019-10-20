import { Link, Router } from "../routes";
import Head from 'next/head';
import Immutable from 'immutable';

import styled from "styled-components";

import { isClient, seedGen, getRandomisedNumber } from "../libs/utils";

import Header from "../components/channel/Header";
import Board from '../components/Board';

import RTC from "../libs/rtc";

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return query;
  }

  state = {
    visible: 0,
    connected: false,
    channel: "share",
    userID: undefined,
    peers: [],
    message: "",
    usersList: Immutable.Map(),
  };

  componentDidMount() {
    if (this.props.id === undefined) {
      Router.pushRoute(`/`);
    }
    console.log("Channel ID: " + this.props.id);
    setTimeout(() => {
      this.setState({ visible: 1 });
    }, 300);
    this.initChannel();
    this.setState({ usersList: Immutable.Map() });
  }

  _onMouseMove(e) {
    const { userID } = this.state;
    let { usersList } = this.state;
    RTC.broadcastMessage({ cmd: "message", x: e.pageX, y: e.pageY, userID  });

    usersList = usersList
      .setIn([userID, 'x'], e.pageX)
      .setIn([userID, 'y'], e.pageY);

    this.setState({ usersList });
  }

  _onTouchMove(e) {
    const { userID } = this.state;
    // console.log('is this triggered?', userID); // this is setting channel id instead of unique person
    const touches = e.changedTouches;
    let x = 0;
    let y = 0;

    touches.forEach((touch) => {
      x = touch.screenX;
      y = touch.screenY;
    });
    // iterate through all touches before setting last touched screen Pos
    RTC.broadcastMessage({ cmd: "message", x, y, userID  });
    // this.setState({ x: e.screenX, y: e.screenY });
  }

  initChannel = async () => {
    const { usersList } = this.state;
    console.log("Init channel ID", this.props.id);
    var started = false;
    var peer = await RTC.initChannel(this.props.id);
    const peerId = peer.id;

    this.setState({
      userID: peerId,
      usersList: usersList.set(peerId, Immutable.fromJS({
        x: 0,
        y: 0,
        mousePointerColour: getRandomisedNumber(0, 360),
        size: getRandomisedNumber(50, 150),
      })),
    });

    console.log('props', this.props.id);
    console.log('peer', peer.id);
    console.log('after init', usersList.toJS());
    var Events = RTC.getEvents();

    RTC.connectToPeers(this.props.id);

    Events.on("message", async message => {
      let { usersList } = this.state;
      console.log(`Message: ${message.connection.peer}:`, message.data);
      const userID = message.data.userID;
      console.log('message', usersList.toJS());
      if (message.data.cmd === "message") {
        // TODO update UsersList props
        usersList = usersList
          .setIn([userID, 'x'], message.data.x)
          .setIn([userID, 'y'], message.data.y);

        this.setState({ usersList });
        // this.updateHistory({
        //   msg: message.data.msg,
        //   type: "partner",
        //   sender: message.connection.peer,
        //   time: Date.now()
        // });
      } else if (message.data.cmd === "error") {
        console.log(message.data.error);
        // this.updateHistory({
        //   msg: `${message.data.error}`,
        //   type: "system",
        //   sender: message.connection.peer,
        //   time: Date.now()
        // });
        // this.setState({
        //   alert: true,
        //   alertText: message.data.error
        // });
      }
    });
    Events.on("peerJoined", async message => {
      let { usersList } = this.state;
      console.log(`Peer Joined:`, message.connection.peer);
      // Need to add new key value pair to object

      // TODO here can I randomly generate a colour and pass in as prop to userList
      // OR I could use the number to pick a colour in the HSLA spectrum
      const mousePointerColour = getRandomisedNumber(0, 360);

      usersList = usersList
        .setIn([message.connection.peer, 'mousePointerColour'], mousePointerColour)
        .setIn([message.connection.peer, 'size'], getRandomisedNumber(50, 150));
      // TODO Add userId to usersList component
      this.setState({ usersList });
      // this.updateHistory({
      //   msg: "Peer Connected",
      //   type: "system",
      //   sender: message.connection.peer,
      //   time: Date.now()
      // });
      // this.setState({
      //   channel: "connected",
      //   peers: [...new Set([...this.state.peers, message.connection.peer])],
      //   title: "Channel established"
      // });
    });
    Events.on("peerLeft", message => {
      const { usersList } = this.state;
      console.log("Peer Left:", message.connection.peer);
      usersList.delete(message.connection.peer.id);
      // Is it possible to remove a key value pair from an ibject literal without copying the object?

      // TODO remove userId from usersList component
      this.setState({ usersList });
      // this.updateHistory({
      //   msg: "Peer Disconnected",
      //   type: "system",
      //   sender: message.connection.peer,
      //   time: Date.now()
      // });
      // this.setState({
      //   channel: "share",
      //   peers: this.state.peers.filter(item => item != message.connection.peer),
      //   title: "Waiting for peers to connect..."
      // });

      RTC.connectToPeers(this.props.id);
    });
  };

  // updateHistory = data => {
  //   var history = this.state.history;
  //   history.push(data);
  //   this.setState({ history });
  // };

  // sendMessage = e => {
  //   e.preventDefault();
  //   if (!this.state.message) return;
  //   this.updateHistory({
  //     msg: this.state.message,
  //     type: "me",
  //     sender: "me",
  //     time: Date.now()
  //   });
  //   RTC.broadcastMessage({ cmd: "message", msg: this.state.message });
  //   console.log("Sending message", this.state.message);
  //   this.setState({ message: "" });
  // };

  // TODO board isn't really responsive so mobile doesn't work well

  render() {
    return (
      <div className="outer"
        onMouseMove={this._onMouseMove.bind(this)}
        onTouchMove={this._onTouchMove.bind(this)}
      >
        <Head>
          <title>Togetherness</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <p>Why not invite a friend so that you can play together? {isClient ? window.location.href : null} </p>
        <Board
          userId={this.state.userID}
          usersList={this.state.usersList}
        />

        <p className="credits">RTC functionality created by mariocao here: https://github.com/mariocao/next-webrtc</p>
        <style jsx>{`
          body {
            margin: 0;
            padding: 0;
          }
          .outer {
            border: red 2px solid;
          }
          p {
            position: absolute;
            left: 50%;
            margin-left: -375px;
            font-family: arial;
            font-weight: bold;
            text-align: center;
          }
          .credits {
            font-size: 10px;
            text-transform: none;
            position: absolute;
            left: 50%;
            margin-left: -375px;
          }
        `}
        </style>
      </div>
    );
  }
}
