import Phaser, { Physics } from 'phaser';
import { scene1 } from "./src/Game.js"
import { Preloader } from "./src/Preloader.js"

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    scene: [Preloader,scene1],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                x: 0
                }
            }
        }
};

const game = new Phaser.Game(config);