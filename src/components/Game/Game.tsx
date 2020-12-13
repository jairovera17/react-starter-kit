import Phaser from "phaser";
import React, { useEffect } from "react";
import { Main } from "../../scenes/Main";
import { Animation } from "../../scenes/Animation";
import PhaserSpeechSynthesis from "../../utils/classes/PhaserSpeechSynthesis";
import { TextField } from "@material-ui/core";

const DPR = window.devicePixelRatio;
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  backgroundColor: "#000000",
  scale: {
    parent: "phaser-game",
    mode: Phaser.Scale.NONE,
    height: document.documentElement.clientHeight * DPR,
    width: document.documentElement.clientWidth * DPR,
    zoom: 1 / DPR,
  },
  scene: [Main, Animation],
};

export const Game: React.FC = () => {
  let resize: () => void;
  useEffect(() => {
    const voice = new PhaserSpeechSynthesis();
    const game = new Phaser.Game(config);
    resize = resizeGame(game);
    window.addEventListener("resize", resize);
    return () => {
      game.destroy(true);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <div id={"phaser-game"} />;
};

const resizeGame = (game: Phaser.Game) => () => {
  const DPR = window.devicePixelRatio;
  const container = document.getElementById("phaser-game");
  const { clientWidth, clientHeight } = document.documentElement;
  game.scale.resize(clientWidth * DPR, clientHeight * DPR);
};
