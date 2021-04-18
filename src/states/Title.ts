export class Title extends Phaser.State {
  create () {
    const fill: Phaser.Graphics = this.game.add.graphics(0, 0);
    fill.alpha = 1;
    fill.beginFill(0xff00ff);
    fill.drawRect(0, 0, 640, 360);
    fill.endFill();

    const sprite: Phaser.Sprite = this.game.add.sprite(
      64,
      64,
      "sprite-dial"
    );
    sprite.rotation = 35;

    const corridor: Phaser.Sprite = this.game.add.sprite(
      128,
      128,
      "bg-corridor-sprite"
    );
    corridor.animations.add(
      "move",
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      30,
      true
    );
    corridor.animations.play("move");

    const sound: Phaser.Sound = this.game.add.sound(
      "sound-door",
      .5,
      false
    );
    sound.play();
  }
}
