import Phaser from "phaser";
import { AssetEnum } from "../utils/constants/AssetEnum";
import { SceneEnum } from "../utils/constants/SceneEnum";
import { SpritesheetBundle, UIBundle } from "../utils/constants/UIBundle";
import { Button } from "../gameObjects/button";
import { BtnEnum } from "../utils/constants/BtnEnum";
import { IconEnum } from "../utils/constants/IconEnum";
import PhaserSpeechSynthesis from "../utils/classes/PhaserSpeechSynthesis";
import { get, set, has } from "lodash";

export class Main extends Phaser.Scene {
  private background: Phaser.GameObjects.Image | undefined;
  private audioButton: Button | undefined;
  private tweensButton: Button | undefined;
  private animButton: Button | undefined;
  private buttons: Button[];
  private voice: PhaserSpeechSynthesis | undefined;

  constructor() {
    super({ key: SceneEnum.MAIN_MENU });
    this.buttons = [];
  }

  init() {
    !has(this.game, "voice") && this.createVoice();
    this.voice = get(this.game, "voice");
  }

  createVoice() {
    const voice = new PhaserSpeechSynthesis();
    set(this.game, "voice", voice);
  }

  preload() {
    UIBundle.forEach(({ key, url }) =>
      this.load.image(key, window.location.pathname + url)
    );
    SpritesheetBundle.forEach(({ key, url, config }) =>
      this.load.spritesheet(key, url, config)
    );
    this.load.on("progress", (progress: number) =>
      console.log(Math.floor(progress * 100))
    );
    this.voice!.setVoices();
  }

  create() {
    this.background = this.add
      .image(0, 0, AssetEnum.GREEN_BACKGROUND)
      .setOrigin(0);

    this.audioButton = new Button(this, 250, 250, "Audio", IconEnum.CAMERA);
    this.tweensButton = new Button(this, 250, 250, "Tweens", IconEnum.CLOUD);
    this.animButton = new Button(
      this,
      250,
      250,
      "Animar",
      IconEnum.BATTERY,
      BtnEnum.SECONDARY
    );
    this.buttons = [this.audioButton, this.tweensButton, this.animButton];

    const scale = () => this.resize();
    this.scale.on("resize", scale);
    this.events.once("shutdown", () => this.scale.off("resize", scale));
    this.resize();
    this.setBtnInteractive();
  }

  setBtnInteractive() {
    this.buttons.forEach((btn, index) => {
      this.add.existing(btn);
    });
    this.animButton!.enableInteractive();
    this.audioButton!.enableInteractive();
    this.animButton!.onClick(() => this.scene.start(SceneEnum.ANIMATION));
    this.audioButton!.onClick(() => this.voice!.speak("Aguacate con queso"));
    this.tweens.add({
      targets: this.tweensButton,
      scale: 1.25,
      repeat: -1,
      yoyo: true,
      ease: "Power3",
      duration: 500,
    });
  }

  resizeBtn() {
    const { width, height } = this.game.canvas;
    const aWidth = width > height ? width / 4 : width / 2;
    const aHeight = height / this.buttons.length;
    this.buttons.forEach((btn) => {
      btn.resize(aWidth, aHeight, 10);
    });
  }

  resize() {
    const { width, height } = this.game.canvas;
    this.background!.setDisplaySize(width, height);

    this.resizeBtn();

    Phaser.Actions.GridAlign(this.buttons, {
      x: width / 2,
      y: height * 0.25,
      cellHeight: this.buttons[0].getHeight() + 100,
      height: -1,
      position: Phaser.Display.Align.CENTER,
    });
  }
}
