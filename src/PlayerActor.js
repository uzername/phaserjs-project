/// https://github.com/photonstorm/phaser3-examples/blob/master/public/src/animation/create%20animation%20from%20sprite%20sheet.js
import { ActorMain } from './ActorMain';
import { UtilClass } from './Utils';
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
        // inspired by tileset movement example
        if (Phaser.Input.Keyboard.JustDown(this.keyFront) || Phaser.Input.Keyboard.JustDown(this.keyFrontNum)) {
            // moving to front    
            if (!this.scene.checkIsWall(this.x, this.y - UtilClass.SPRITEHEIGHT)) {
                this.y -= UtilClass.SPRITEHEIGHT;
            }
            this.setFrame(3);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyLeft) || Phaser.Input.Keyboard.JustDown(this.keyLeftNum)) {
            // moving to left
            if (!this.scene.checkIsWall(this.x - UtilClass.SPRITEWIDTH, this.y )) {
                this.x -= UtilClass.SPRITEWIDTH;
            }
            this.setFrame(0);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyBack) || Phaser.Input.Keyboard.JustDown(this.keyBackNum)) {
            // moving to back
            if (!this.scene.checkIsWall(this.x, this.y + UtilClass.SPRITEHEIGHT)) {
                this.y += UtilClass.SPRITEHEIGHT;
            }
            this.setFrame(2);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyRight) || Phaser.Input.Keyboard.JustDown(this.keyRightNum)) {
            // moving to right
            if (!this.scene.checkIsWall(this.x + UtilClass.SPRITEWIDTH, this.y)) {
                this.x += UtilClass.SPRITEWIDTH;
            }
            this.setFrame(1);
        }
    }
}