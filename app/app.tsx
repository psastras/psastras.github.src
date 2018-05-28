import { h, Component } from "preact";
import { Box } from "./components";

export interface AppProps {}
interface AppState {}

export class App extends Component<AppProps, AppState> {
  render() {
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
            maxWidth: "960px",
            width: "100%"
          }}
        >
          <Box>
            <h1>Paul Sastrasinh</h1>
            <h6 style={{ letterSpacing: "0.2rem" }}>Software Developer</h6>
          </Box>
          <hr style={{ width: "50%", margin: "0" }} />
          <Box pad={{ vertical: "medium", between: "medium" }} direction="row">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/paul-sastrasinh-82480153/"
              style={{ textTransform: "uppercase", letterSpacing: "0.2rem" }}
            >
              LinkedIn
            </a>
            <a
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
