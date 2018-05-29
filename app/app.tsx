import { Component, h } from "preact";
import { Box, Renderer } from "./components";
import { BoxScene } from "./scenes";
import THREE = require("three");

export interface AppProps {}
interface AppState {}

export class App extends Component<AppProps, AppState> {
  render(): JSX.Element {
    return (
      <Box
        style={{
          backgroundImage: "radial-gradient(#92FFC0 -35%, #002661 100%)"
        }}
        align="center"
        justify="center"
        pad="large"
        full
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1
          }}
        >
          <Renderer
            init={BoxScene.init}
            draw={BoxScene.draw}
            dispose={BoxScene.dispose}
          />
        </div>
        <div
          style={{
            maxWidth: "960px",
            width: "100%",
            zIndex: 2
          }}
        >
          <Box>
            <h1>Paul Sastrasinh</h1>
            <h6 style={{ letterSpacing: "0.2rem" }}>Software Developer</h6>
          </Box>
          <hr style={{ width: "50%", margin: "0" }} />
          <Box pad={{ vertical: "medium", between: "medium" }} direction="row">
            <a
              rel="noopener"
              target="_blank"
              href="https://www.linkedin.com/in/paul-sastrasinh-82480153/"
              style={{ textTransform: "uppercase", letterSpacing: "0.2rem" }}
            >
              LinkedIn
            </a>
            <a
              rel="noopener"
              target="_blank"
              href="https://github.com/psastras"
              style={{ textTransform: "uppercase", letterSpacing: "0.2rem" }}
            >
              Github
            </a>
          </Box>
        </div>
      </Box>
    );
  }
}
