import { Assets } from "game/assets";

export class Preload extends Phaser.State {
  preloadInner: Phaser.Sprite;
  preloadOuter: Phaser.Sprite;

  preload () {
    this.setLoaderImages();

    if (Assets.image) {
      for (let image of Assets.image) {
        if (!image.ignore) {
          this.load.image(
            image.name,
            image.file,
            image.overwrite
          );
        }
      }
    }

    if (Assets.sound) {
      for (let sound of Assets.sound) {
        if (!sound.ignore) {
          this.load.audio(
            sound.name,
            sound.file,
            sound.autoDecode
          );
        }
      }
    }

    if (Assets.spriteSheet) {
      for (let spriteSheet of Assets.spriteSheet) {
        if (!spriteSheet.ignore) {
          this.load.spritesheet(
            spriteSheet.name,
            spriteSheet.file,
            spriteSheet.frameWidth,
            spriteSheet.frameHeight,
            spriteSheet.frameMax,
            spriteSheet.margin,
            spriteSheet.spacing,
            spriteSheet.skipFrames
          );
        }
      }
    }

    if (Assets.bitmapFont) {
      for (let bitmapFont of Assets.bitmapFont) {
        if (!bitmapFont.ignore) {
          this.load.bitmapFont(
            bitmapFont.name,
            bitmapFont.file,
            bitmapFont.atlas,
            bitmapFont.atlasData
          );
        }
      }
    }
    
    // Load your @font-face fonts (i.e.: Google Fonts, etc.) dynamically here.
  }

  create () {
    this.state.start("Title");
  }

  protected setLoaderImages () {
    this.preloadOuter = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      "loader-outer"
    );
    this.preloadOuter.x -= this.preloadOuter.width / 2;
    this.preloadOuter.y -= this.preloadOuter.height / 2;
    
    this.preloadInner = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      "loader-inner"
    );
    this.preloadInner.anchor.setTo(0, 0);
    this.preloadInner.x -= this.preloadInner.width / 2;
    this.preloadInner.y -= this.preloadInner.height / 2;

    this.load.setPreloadSprite(this.preloadInner, 0);
  }
}
