import LoaderInner from "assets/img/ui/loader-inner.png";
import LoaderOuter from "assets/img/ui/loader-outer.png";

/**
 * states/Boot
 * ----------------------------------------------------------------------
 * Bootstraps the game.
 * 
 * @since  0.0.1
 */
export default class Boot extends Phaser.State {
  preload () {
    // Sets the game to render as crisp as possible
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    // Preload loader images
    this.load.image("loader-inner", LoaderInner, false);
    this.load.image("loader-outer", LoaderOuter, false);
  }

  create () {
    // Sets multitouch, but we only need one, for now
    this.input.maxPointers = 1;

    // No stage smoothing
    this.stage.smoothed = false;

    // Pauses the game if tab/window loses focus
    this.stage.disableVisibilityChange = true;

    // Scaling for devices
    if (this.game.device.desktop) {
      // DESKTOP SPECIFIC
      this.scale.pageAlignHorizontally = true;
    } else {
      // MOBILE SPECIFIC
    }

    // Fire preloader
    this.state.start("Preload");
  }
}
