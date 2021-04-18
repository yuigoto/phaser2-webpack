import Main from "core/main";
import "styles/main.scss";

/**
 * Phaser CE Base
 * ----------------------------------------------------------------------
 * A simple Phaser CE application boilerplate.
 * 
 * @version 0.0.1
 */
if (window) {
  window.onload = () => {
    new Main();
  };
}
