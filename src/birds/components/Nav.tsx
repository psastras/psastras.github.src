import { h, Component } from "preact";

namespace Nav {
  export interface Props {}
  export interface State {}
}

export class Nav extends Component<Nav.Props, Nav.State> {
  render(): JSX.Element {
    return (
      <div class="hero-head">
        <header class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <span class="navbar-burger burger" data-target="navbarMenuHeroC">
                <span />
                <span />
                <span />
              </span>
            </div>
            <div id="navbarMenuHeroC" class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item is-active">Home</a>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
