import classnames from "classnames";
import * as React from "react";
import * as styles from "./overlay.css";

export const Overlay: React.FunctionComponent = () => (
  <div className={styles.overlay}>
    <div className={styles.overlayText}>
      <p className={styles.overlayTitle}>Developer</p>
      <p className={styles.overlaySubtitle}>
        <a href="http://github.com/psastras/" target="_blank">
          Github
        </a>{" "}
        <a href="https://www.linkedin.com/in/psastras/" target="_blank">
          LinkedIn
        </a>
      </p>
      <p
        className={classnames(
          styles.overlaySubtitle,
          styles.overlaySubSubtitle
        )}
      >
        <a href="https://instagram.com/psastras/" target="_blank">
          <i className="fab fa-instagram" />
        </a>{" "}
        <a href="http://twitter.com/psastras" target="_blank">
          <i className="fab fa-twitter" />
        </a>
      </p>
    </div>
  </div>
);
