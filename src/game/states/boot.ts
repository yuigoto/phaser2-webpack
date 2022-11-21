/**
 * game/scenes/boot
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

/**
 * Boot scene.
 */
export class Boot extends Phaser.State {
  /**
   * Scene key.
   */
  static SCENE_KEY = 'boot';

  /**
   * Preloads all assets.
   */
  preload() {
    // Sets the game to render as crisp as possible
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    this.load.image(
      'loader.inner',
      require('@/assets/img/ui/loader.inner.png'),
      false
    );
    this.load.image(
      'loader.outer',
      require('@/assets/img/ui/loader.outer.png'),
      false
    );
  }

  /**
   * Creates the scene.
   */
  create() {
    this.state.start('preload');
  }
}
