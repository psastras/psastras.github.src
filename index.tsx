import { h, render } from "preact";
import { App } from "./app";
import "./index.css";

const element = document.getElementById("app");
render(<App />, element, element.lastChild as any);
