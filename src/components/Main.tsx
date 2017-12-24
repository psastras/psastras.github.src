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
          <div class="columns">
            <div class="column animated fadeInLeft">
              <h1 class="title has-text-light">Paul Sastrasinh</h1>
              <h2 class="subtitle has-text-light">Software Developer, NYC</h2>
            </div>
            <div class="column">
              <div class="buttons animated fadeInDown">
                <a
                  class="button is-primary is-medium"
                  href="https://github.com/psastras"
                >
                  <span class="icon">
                    <i class="fa fa-github" />
                  </span>
                  <span>Github</span>
                </a>
                <a
                  class="button is-primary is-medium"
                  href="https://www.linkedin.com/in/paul-sastrasinh-82480153/"
                >
                  <span class="icon">
                    <i class="fa fa-linkedin" />
                  </span>

                  <span>LinkedIn</span>
                </a>
              </div>
              <div class="buttons animated fadeInUp">
                <a
                  class="button is-white is-outlined is-medium"
                  href="https://medium.com/@paul.sastrasinh"
                >
                  <span class="icon">
                    <i class="fa fa-medium" />
                  </span>
                </a>
                <a
                  class="button is-white is-outlined is-medium"
                  href="https://500px.com/psastras"
                >
                  <span class="icon">
                    <i class="fa fa-500px" />
                  </span>
                </a>
                <a
                  class="button is-white is-outlined is-medium"
                  href="https://www.instagram.com/psastras/"
                >
                  <span class="icon">
                    <i class="fa fa-instagram" />
                  </span>
                </a>
                <a
                  class="button is-white is-outlined is-medium"
                  href="https://twitter.com/psastras"
                >
                  <span class="icon">
                    <i class="fa fa-twitter" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
