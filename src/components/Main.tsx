import { h, Component } from "preact";

namespace Main {
  export interface Props {}
  export interface State {}
}

export class Main extends Component<Main.Props, Main.State> {
  render(): JSX.Element {
    return (
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Paul Sastrasinh</h1>
          <h2 class="subtitle">@psastras</h2>
          <p>
            <a
              class="button is-primary is-outlined"
              href="https://github.com/psastras"
              style={{ marginRight: "16px" }}
            >
              <span class="icon">
                <i class="fa fa-github" />
              </span>
              <span>Github</span>
            </a>
            <a
              class="button is-primary is-outlined"
              href="https://www.linkedin.com/in/paul-sastrasinh-82480153/"
            >
              <span class="icon">
                <i class="fa fa-linkedin" />
              </span>

              <span>LinkedIn</span>
            </a>
          </p>
        </div>
      </div>
    );
  }
}
