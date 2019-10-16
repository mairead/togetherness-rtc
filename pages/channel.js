import { Link, Router } from "../routes";
import Head from 'next/head';

import styled from "styled-components";

import { isClient, seedGen } from "../libs/utils";

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
    message: ""
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
  }

  initChannel = async () => {
    console.log("Init channel ID", this.props.id);
    var started = false;
    var peer = await RTC.initChannel(this.props.id);
    this.setState({
      userID: peer.id
    });
    var Events = RTC.getEvents();

    RTC.connectToPeers(this.props.id);

    Events.on("message", async message => {
      console.log(`Message: ${message.connection.peer}:`, message.data);

      if (message.data.cmd === "message") {
        this.updateHistory({
          msg: message.data.msg,
          type: "partner",
          sender: message.connection.peer,
          time: Date.now()
        });
      } else if (message.data.cmd === "error") {
        this.updateHistory({
          msg: `${message.data.error}`,
          type: "system",
          sender: message.connection.peer,
          time: Date.now()
        });
        this.setState({
          alert: true,
          alertText: message.data.error
        });
      }
    });
    Events.on("peerJoined", async message => {
      console.log(`Peer Joined:`, message.connection.peer);
      this.updateHistory({
        msg: "Peer Connected",
        type: "system",
        sender: message.connection.peer,
        time: Date.now()
      });
      this.setState({
        channel: "connected",
        peers: [...new Set([...this.state.peers, message.connection.peer])],
        title: "Channel established"
      });
    });
    Events.on("peerLeft", message => {
      console.log("Peer Left:", message.connection.peer);
      this.updateHistory({
        msg: "Peer Disconnected",
        type: "system",
        sender: message.connection.peer,
        time: Date.now()
      });
      this.setState({
        channel: "share",
        peers: this.state.peers.filter(item => item != message.connection.peer),
        title: "Waiting for peers to connect..."
      });
      RTC.connectToPeers(this.props.id);
    });
  };

  updateHistory = data => {
    var history = this.state.history;
    history.push(data);
    this.setState({ history });
  };

  sendMessage = e => {
    e.preventDefault();
    if (!this.state.message) return;
    this.updateHistory({
      msg: this.state.message,
      type: "me",
      sender: "me",
      time: Date.now()
    });
    RTC.broadcastMessage({ cmd: "message", msg: this.state.message });
    console.log("Sending message", this.state.message);
    this.setState({ message: "" });
  };

  render() {
    return (
      <div>
        <Head>
          <title>Togetherness</title>
          <link href="//db.onlinewebfonts.com/c/4b76b99051d6848168d9f187b7eeb9c1?family=RosewoodW01-Regular" rel="stylesheet" type="text/css"/>
        </Head>
        <p>Why not invite a friend so that you can play together? {isClient ? window.location.href : null} </p>
        }
        <Board userId={this.state.userID} usersTotal={this.state.peers.length}/>
        <p className="credits">RTC functionality created by mariocao here: https://github.com/mariocao/next-webrtc</p>
        <style jsx>{`
          p {
            font-family: arial;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
          }
          .credits {
            font-size: 10px;
            text-transform: none;
          }
        `}
        </style>
      </div>
    );
  }
}
