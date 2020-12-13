export enum SpritesheetEnum {
  IDLE = "idle",
  WALK_FRONT = "walkFront",
  WALK_BACK = "walkBack",
  HEALTH = "healthanim",
}

export const AnimConfig: { [key: string]: any }[] = [
  {
    key: SpritesheetEnum.IDLE,
    frameRate: 8,
    repeat: -1,
  },
  {
    key: SpritesheetEnum.WALK_FRONT,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: SpritesheetEnum.WALK_BACK,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: SpritesheetEnum.HEALTH,
    frameRate: 10,
    repeat: -1,
  },
];
