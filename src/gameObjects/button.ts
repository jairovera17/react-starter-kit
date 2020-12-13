import Phaser from "phaser";
import { BtnEnum } from "../utils/constants/BtnEnum";
import { IconEnum } from "../utils/constants/IconEnum";
import { scaleImage } from "../utils/functions/resize";
const Image = Phaser.GameObjects.Image;
const Text = Phaser.GameObjects.Text;

const ButtonLabelStyle = {
  fontFamily: "arial",
  fontSize: "5em",
  color: "white",
};

export class Button extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Image;
  private icon: Phaser.GameObjects.Image;
  private label: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    icon: IconEnum,
    background = BtnEnum.PRIMARY,
    addExisting = false
  ) {
    super(scene, x, y);
    this.background = new Image(scene, 0, 0, background);
    this.icon = new Image(scene, 0, 0, icon).setOrigin(0.2, 0.5);
    this.label = new Text(scene, 0, 0, label, ButtonLabelStyle).setOrigin(
      0.35,
      0.5
    );
    this.add([this.background, this.icon, this.label]);
    if (addExisting) scene.add.existing(this);
  }

  public enableInteractive(): this {
    const commonProps = {
      targets: [this],
      duration: 175,
      ease: "Power3",
    };
    this.background
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerover", () => {
        this.scene.tweens.add({ scale: 1.25, ...commonProps });
      })
      .on("pointerout", () => {
        this.scene.tweens.add({ scale: 1, ...commonProps });
      });
    return this;
  }

  public onClick(cb: () => void) {
    this.background.on("pointerdown", cb);
  }

  public removeOnClick(): void {
    this.background.off("pointerdown");
  }

  public disable(): void {
    this.background.disableInteractive();
  }

  public getHeight(): number {
    return this.background.displayHeight;
  }

  public resize(
    availableSpaceWidth: number,
    availableSpaceHeight: number,
    padding = 0,
    scaleMultiplier = 1
  ) {
    scaleImage(
      this.background,
      availableSpaceWidth,
      availableSpaceHeight,
      padding,
      scaleMultiplier
    );
    this.icon.setScale(this.background.scale);
    const position = this.background.getLeftCenter();
    this.icon.setPosition(position.x, position.y);
    this.label.setFontSize(this.background.displayHeight * 0.5);
  }
}
