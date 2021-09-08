/**
 * states/title
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
export class Title extends Phaser.State {
  create() {
    const fill = this.game.add.graphics(0, 0);
    fill.alpha = 1;
    fill.beginFill(0x6d6d6d, 1);
    fill.drawRect(0, 0, 640, 360);
    fill.endFill();

    const text = this.game.add.text(4, 4, "Hello, World!", {
      font: "yx_ui",
      fontSize: 16,
    });

    const sprite = this.game.add.sprite(64, 64, "sprite.dial");
    sprite.x = 80;
    sprite.y = 80;
    sprite.rotation = 35;

    const corridor = this.game.add.sprite(128, 128, "spritesheet.corridor");
    corridor.animations.add(
      "move",
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      30,
      true
    );
    corridor.animations.play("move");

    const sound = this.game.add.sound("sound.door", 0.5, false);
    sound.play();
  }
}
