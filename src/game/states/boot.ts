/**
 * game/states/boot
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import LoaderInner from "assets/img/ui/loader.inner.png";
import LoaderOuter from "assets/img/ui/loader.outer.png";

export class Boot extends Phaser.State {
  preload() {
    // Sets the game to render as crisp as possible
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    // Preload loader images
    this.load.image("loader.inner", LoaderInner, false);
    this.load.image("loader.outer", LoaderOuter, false);
  }

  create() {
    this.state.start("preload");
  }
}
