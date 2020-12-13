import Phaser from "phaser";
import { SceneEnum } from "../utils/constants/SceneEnum";
import { AssetEnum } from "../utils/constants/AssetEnum";
import { Button } from "../gameObjects/button";
import { IconEnum } from "../utils/constants/IconEnum";
import { BtnEnum } from "../utils/constants/BtnEnum";
import {
  AnimConfig,
  SpritesheetEnum,
} from "../utils/constants/SpritesheetEnum";
import { scaleImage } from "../utils/functions/resize";

export class Animation extends Phaser.Scene {
  private background: Phaser.GameObjects.Image | undefined;
  private label: Phaser.GameObjects.Text | undefined;
  private returnBtn: Button | undefined;
  private mc: Phaser.GameObjects.Sprite | undefined;
  private currentAnim: string;
  private currentTween: Phaser.Tweens.Tween | undefined;
  constructor() {
    super({ key: SceneEnum.ANIMATION });
    this.currentAnim = "";
  }

  preload() {
    AnimConfig.forEach((config) => {
      console.log({
        frames: this.anims.generateFrameNames(config.key),
        ...config,
      });
      this.anims.create({
        frames: this.anims.generateFrameNames(config.key),
        ...config,
      });
    });
  }

  create() {
    this.background = this.add
      .image(0, 0, AssetEnum.GREEN_BACKGROUND)
      .setOrigin(0);

    this.label = this.add
      .text(0, 0, "Escena de animaciones", {
        fontSize: "10em",
      })
      .setOrigin(0.5, -0.25);

    this.returnBtn = new Button(
      this,
      0,
      0,
      "Regresar",
      IconEnum.BELL,
      BtnEnum.SECONDARY,
      true
    );

    this.mc = this.add.sprite(0, 0, SpritesheetEnum.IDLE, 0);
    const scale = () => this.resize();
    this.scale.on("resize", scale);
    this.events.once("shutdown", () => this.scale.off("resize", scale));
    this.resize();
    this.setBtnInteractive();
  }

  setBtnInteractive() {
    this.returnBtn!.enableInteractive().onClick(() =>
      this.scene.start(SceneEnum.MAIN_MENU)
    );
    this.mc!.play(SpritesheetEnum.IDLE);

    const moveMc = ({ x, y }: { x: number; y: number }) => {
      if (this.currentTween && this.currentTween.isPlaying())
        this.currentTween.stop();
      this.currentTween = this.tweens.add({
        targets: [this.mc],
        x,
        y,
        onStart: () => {
          if (y < this.mc!.y) {
            if (this.currentAnim !== SpritesheetEnum.WALK_BACK) {
              this.currentAnim = SpritesheetEnum.WALK_BACK;
              this.mc!.play(this.currentAnim);
            }
            this.mc!.setFlipX(x > this.mc!.x);
          } else {
            if (this.currentAnim !== SpritesheetEnum.WALK_FRONT) {
              this.currentAnim = SpritesheetEnum.WALK_FRONT;
              this.mc!.play(this.currentAnim);
            }
            this.mc!.setFlipX(x > this.mc!.x);
          }
        },
        onComplete: () => {
          this.currentAnim = SpritesheetEnum.IDLE;
          this.mc!.play(this.currentAnim);
        },
      });
    };

    this.input.on("pointerdown", moveMc);
    this.events.once("shutdown", () => this.input.off("pointerdown", moveMc));
  }

  resize() {
    const { width, height } = this.game.canvas;
    this.background!.setDisplaySize(width, height);
    this.label!.setPosition(width / 2, 0).setFontSize(height / 15);
    this.mc!.setPosition(width / 2, height / 2);
    scaleImage(this.mc!, width, height, 0, 2);
    this.returnBtn!.resize(width / 2, height / 4, 10);
    this.returnBtn!.setPosition(
      width / 2,
      height - this.returnBtn!.getHeight()
    );
  }
}
