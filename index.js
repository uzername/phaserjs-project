import Phaser, { Physics } from 'phaser';
import { SceneMansion } from "./src/Game.js"
import { Preloader } from "./src/Preloader.js"
import { UtilClass } from './src/Utils';
import { MessageService } from './src/MessageService.js'

const config = {
    type: Phaser.AUTO,
    width: UtilClass.SPRITEWIDTH * 25,
    height: UtilClass.SPRITEHEIGHT *19,
    pixelArt: true,
    scene: [Preloader, SceneMansion],
    parent: "game-common",
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

MessageService.initMessageDiv(UtilClass.SPRITEHEIGHT * 3, config.width);