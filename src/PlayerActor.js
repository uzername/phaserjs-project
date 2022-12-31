/// https://github.com/photonstorm/phaser3-examples/blob/master/public/src/animation/create%20animation%20from%20sprite%20sheet.js
import { ActorMain } from './ActorMain';
export class Player extends ActorMain {
    /// scene and coordinates to use
    constructor(scene, x, y) {
        super(scene, x, y, 'hobgoblin_controllable_sprites', 0);
        // KEYS
        this.keyFront = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyBack = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.keyFrontNum = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE);
        this.keyLeftNum = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR);
        this.keyBackNum = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO);
        this.keyRightNum = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        
    }
    update() {

        if ((this.keyFront.isDown) || (this.keyFrontNum.isDown)) {
            // moving to front             
            this.setTexture('hobgoblin_controllable_sprites', 0);
        }
        if ((this.keyLeft.isDown) || (this.keyLeftNum.isDown)) {
            // moving to left
            this.setTexture('hobgoblin_controllable_sprites', 1);
        }
        if ((this.keyBack.isDown) || (this.keyBackNum.isDown)) {
            // moving to back
            this.setTexture('hobgoblin_controllable_sprites', 2);
        }
        if ((this.keyRight.isDown) || (this.keyRightNum.isDown)) {
            // moving to right
            this.setTexture('hobgoblin_controllable_sprites', 3);
        }
    }
}