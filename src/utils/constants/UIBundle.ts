import Phaser from "phaser";
import { BtnEnum } from "./BtnEnum";
import { IconEnum } from "./IconEnum";
import { AssetEnum } from "./AssetEnum";
import { SpritesheetEnum } from "./SpritesheetEnum";

export const UIBundle: { key: string; url: string }[] = [
  {
    key: AssetEnum.GREEN_BACKGROUND,
    url: "backgrounds/greenLandscapeBg.png",
  },
  { key: BtnEnum.PRIMARY, url: "btns/buttonprimary.png" },
  { key: BtnEnum.SECONDARY, url: "btns/buttonsecondary.png" },
  { key: IconEnum.BATTERY, url: "btns/batteryicon.png" },
  { key: IconEnum.CLOUD, url: "btns/cloudicon.png" },
  { key: IconEnum.CAMERA, url: "btns/cameraicon.png" },
  { key: IconEnum.BELL, url: "btns/bellicon.png" },
];

export const SpritesheetBundle: {
  key: string;
  url: string;
  config: Phaser.Types.Loader.FileTypes.ImageFrameConfig;
}[] = [
  {
    key: SpritesheetEnum.IDLE,
    url: "anims/idle.png",
    config: { frameWidth: 96, frameHeight: 160 },
  },
  {
    key: SpritesheetEnum.WALK_FRONT,
    url: "anims/frontWalk.png",
    config: { frameWidth: 120, frameHeight: 192 },
  },
  {
    key: SpritesheetEnum.WALK_BACK,
    url: "anims/backWalk.png",
    config: { frameWidth: 120, frameHeight: 192 },
  },
  {
    key: SpritesheetEnum.HEALTH,
    url: "anims/saveIcon.png",
    config: { frameWidth: 100, frameHeight: 90 },
  },
];
