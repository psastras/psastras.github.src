import * as React from "react";

const styles = require("./overlay.css");

export const Overlay: React.FunctionComponent = () => (
  <div className={styles.overlay}>
    <div className={styles.overlayText}>
      <p className={styles.overlayTitle}>Developer</p>
      <p className={styles.overlaySubtitle}>
        <a href="https://www.linkedin.com/in/psastras/" target="_blank">
          GitHub
        </a>{" "}
        <a href="http://github.com/psastras/" target="_blank">
          LinkedIn
        </a>
      </p>
    </div>
  </div>
);
