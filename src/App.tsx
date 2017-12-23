import { h, Component } from "preact";
import { Nav } from "./components/Nav";
import { Canvas } from "./components/Canvas";
import { Main } from "./components/Main";

namespace App {
  export interface Props {}
  export interface State {}
}

export class App extends Component<App.Props, App.State> {
  render(): JSX.Element {
    return (
      <div>
        <Canvas />
        <div style={{ position: "absolute", zIndex: 2, width: "100vw" }}>
          <section class="hero is-fullheight">
            <Nav />
            <Main />
          </section>
        </div>
      </div>
    );
  }
}
