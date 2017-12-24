import { h, Component } from "preact";
import { Nav } from "./components/Nav";
import { Main } from "./components/Main";
import { Birds } from "./components/Birds";

namespace App {
  export interface Props {}
  export interface State {}
}

export class App extends Component<App.Props, App.State> {
  render(): JSX.Element {
    return (
      <div>
        <Birds />
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
