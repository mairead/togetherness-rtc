import Background from '../components/Background';
import Link from 'next/link';

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return query;
  }

  render() {
    return (
      <div className="slide-container">
        <div className="slide">
          <Background />
          <h1>Together</h1>
          <p className="sub">NextJS, StyledComponents, PeerJs & WebRTC</p>
        </div>
        <div className="slide">
          <Background />
          <h2>Why?</h2>
          <img alt="Github is more like a field of broken dreams" src="static/github.png" className="twit-img"/>
          <img alt="Github is a graveyard of good intentions" src="static/github2.png" className="twit-img" />
        </div>

        <div className="slide">
          <video controls width="750">
            <source src="static/together.webm" type="video/webm" />
          </video>
        </div>
        <div className="slide text-slide">
          <Background />
          <p className="bullet">Interactive art project using RTC</p>
          <p className="bullet">Really excited about making something online for the first time in five years</p>
          <p className="bullet">Took too much on to learn instead of concentrating on one thing</p>
        </div>

        <div className="slide">
          <Background />
          <h2>How?</h2>
        </div>
        <div className="slide text-slide">
          <Background />
          <p className="bullet">Next JS - Isomorphic server & React Builder</p>
          <p className="bullet">Create Next app CLI - scaffold project in one line in terminal</p>
          <p className="bullet">Webpack implementation is obfuscated</p>
        </div>
        <div className="slide">
          <img alt="80% configuring front end frameworks" src="static/meta-chart.png" className="chart-img"/>
          <p className="credits"><a href="https://www.meta-chart.com/pie">www.meta-chart.com/pie</a></p>
        </div>

        <div className="slide text-slide">
          <Background />
          <p className="bullet">Styled components - Bundled with Next, CSS in JS</p>
          <p className="bullet">Or, What I like to call world of interpolation</p>
          <p className="bullet">Serendipity</p>
          <p className="bullet">HSLA JS generative CSS art</p>
        </div>

        <div className="slide">
          <img alt="HSV Colour wheel" src="static/HSV_color_solid_cylinder.png" className="chart-img"/>
          <p className="credits">SharkD [CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0)]</p>
        </div>

        <div className="slide">
          <img alt="code sample of generating HSLA value" src="static/code1.png" className="code-img"/>
          <img alt="code sample of CSS with dynamic value" src="static/code2.png" className="code-img" />
        </div>

        <div className="slide text-slide">
          <Background />
          <p className="bullet">Peer JS - Browser based RTC server</p>
          <p className="bullet">WebRTC - Based on Mario Cao's NextJS Web RTC repo</p>
          <p className="bullet">
            <Link href="/index" >
              <a>Demo</a>
            </Link>
          </p>
        </div>

        <div className="slide">
          <Background />
          <h2>What?</h2>
          <img alt="UDP Halloween costume worried no one would get it" src="static/udp.png" className="twit-img"/>
        </div>

        <div className="slide">
          <Background />
          <p className="quote">"My biggest gripe recently is people who decide in 2018 that peerJS is what they need for their WebRTC application. A project with 402 lines of code, last updated in 2015 (!). You can’t use such code with WebRTC. Code older than a year is stale or dead already. WebRTC is still too new and too dynamic."</p>
          <p className="credits"><a href="https://bloggeek.me/mistakes-developing-webrtc-applications">bloggeek.me/mistakes-developing-webrtc-applications</a></p>
        </div>

        <div className="slide">
          <img alt="ICE and TURN server architecture" src="static/toptal-turn.jpg" className="large-chart-img"/>
          <p className="credits"><a href="https://www.toptal.com/webrtc/taming-webrtc-with-peerjs">https://www.toptal.com/webrtc/taming-webrtc-with-peerjs - Mahmud Riwan</a></p>
        </div>

        <div className="slide text-slide">
          <Background />
          <p className="bullet">UDP (User Datagram Protocol)</p>
          <p className="bullet">SDP (Session Description Protocol )</p>
          <p className="bullet">STUN (Session Traversal Utilities for NAT)</p>
          <p className="bullet">TURN (Traversal Using Relays around NAT)</p>
          <p className="bullet">ICE (Interactive Connectivity Establishment)</p>
          <p className="bullet">NAT (Network Address Translation)</p>
        </div>

        <div className="slide text-slide">
          <Background />
          <p className="bullet">Xirsys - Paid ICE service</p>
          <p className="bullet">Create SSL for Proxied server requests</p>
          <p className="bullet">Deployment to Heroku - Hobby type to use SSL</p>
          <p className="bullet">Here be dragons</p>
        </div>

        <div className="slide">
          <img alt="Xirsys example of peerJS ICE server request" src="static/xirsys.png" className="chart-img"/>
          <p className="credits"><a href="https://xirsys.com/peerjs/">xirsys.com/peerjs/</a></p>
        </div>

        <div className="slide">
          <img alt="Screenshot of RTC test site" src="static/rtc.png" className="chart-img"/>
          <p className="credits">https://test.webrtc.org/</p>
        </div>

        <div className="slide">
          <Background />
          <h2>Finally?</h2>
        </div>

        <div className="slide text-slide">
          <Background />
          <p className="bullet">*Spoiler* - I didn't get the job because my prototype code wasn't tidy enough</p>
          <p className="bullet">I'm looking for devs to join me at Chaos Camp</p>
          <p className="bullet">I'm looking for artists to join me at Together</p>
          <p className="bullet">Tweet me at @tiny_m</p>
        </div>

        <div className="slide text-slide">
          <Background />
          <p>Bibliographie</p>
          <p className="bullet">https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/</p>
          <p className="bullet">https://bloggeek.me/mistakes-developing-webrtc-applications/</p>
          <p className="bullet">https://testrtc.com/</p>
          <p className="bullet">https://www.toptal.com/webrtc/taming-webrtc-with-peerjs</p>
          <p className="bullet">https://webrtcglossary.com/</p>
        </div>




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
        .slide-container {
          width: 1280px;
          margin: 0 auto;
          text-align: center;
          font-size: 30px;
        }
        .slide {
          position: relative;
          height: 640px;
          border-bottom: 1px solid black;
        }
        h1, h2 {
          font-size: 150px;
          font-weight: normal;
          text-transform: uppercase;
          font-family: "CountryWestern";
          z-index: 10;
        }
        .bullet {
          z-index: 9;
        }
        .bullet:before {
          content:"• ";
        }
        .twit-img {
          width: 600px;
          margin: 20px;
          z-index: 8;
        }
        .chart-img {
          width: 750px;
          margin-top: 25px;
        }
        .large-chart-img {
          width: 550px;
          margin: 20px
        }
        .code-img {
          width: 600px;
          margin: 20px;
        }
        .quote {
          width: 1000px;
          margin: 120px auto;
          font-size: 40px
        }
        video {
          padding-top: 100px;
        }
        .slide .bullet {
          text-align: left;
        }
        .text-slide {
          padding-top: 100px;
        }
        .credits {
          font-size: 12px;
        }
      `}
      </style>
      </div>
    );
  }
}
