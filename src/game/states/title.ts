/**
 * game/scenes/title
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

export class Title extends Phaser.State {
  /**
   * Scene key.
   */
  static SCENE_KEY = 'title';

  create() {
    const fill = this.game.add.graphics(0, 0);
    fill.alpha = 1;
    fill.beginFill(0x000000, 1);
    fill.drawRect(0, 0, this.game.width, this.game.height);
    fill.endFill();

    const text = this.game.add.text(4, 4, 'Hello, World!', {
      font: 'yx_ui',
      fontSize: 16,
      fill: '#ffffff',
    });

    const sprite = this.game.add.sprite(128, 128, 'sprite.dial');
    sprite.anchor.set(0.5, 0.5);
    sprite.x = 128;
    sprite.y = 128;
    sprite.rotation = 35;

    const corridor = this.game.add.sprite(64, 64, 'spritesheet.corridor');
    corridor.anchor.set(0.5, 0.5);
    corridor.animations.add(
      'move',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      30,
      true
    );
    corridor.animations.play('move');

    const sound = this.game.add.sound('sound.door', 0.5, false);
    sound.play();
  }
}
