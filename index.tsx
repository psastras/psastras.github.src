import { h, render } from "preact";
import { App } from "./app";

import "./index.css";
render(<App />, document.getElementById("app"), document.getElementById("app")
  .lastChild as any);
