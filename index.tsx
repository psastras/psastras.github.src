import { h, render } from "preact";
import { App } from "./app";
import "milligram/dist/milligram.css";
import "./index.css";
render(<App />, document.getElementById("app"), document.getElementById("app")
  .lastChild as any);
