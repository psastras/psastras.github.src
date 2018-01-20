import { h, render } from "preact";
import { App } from "./App";
import "bulma/css/bulma.css";
import "font-awesome/css/font-awesome.css";
import "animate.css/animate.css";
import "./index.css";

const root = document.getElementById("root");

if (root) {
  render(<App />, root, root.lastChild as Element);
}

declare const module: any;
if (module.hot) {
  module.hot.accept();
}
