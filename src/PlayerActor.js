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

        this.keyFrontNum = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT);
        this.keyLeftNum = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR);
        this.keyBackNum = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO);
        this.keyRightNum = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX);
        this.keyBackRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE);
        this.keyBackLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE);
        this.keyFrontLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN);
        this.keyFrontRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE);

        this.keyUse = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.keyMvDownOrWait = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
        this.keyMvUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
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
        if (Phaser.Input.Keyboard.JustDown(this.keyBackRight) ) {
            // moving to right and back
            if (!this.scene.checkIsWall(this.x + UtilClass.SPRITEWIDTH, this.y + UtilClass.SPRITEHEIGHT)) {
                this.x += UtilClass.SPRITEWIDTH;
                this.y += UtilClass.SPRITEHEIGHT;
            }
            this.setFrame(2);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyBackLeft)) {
            // moving to left and back
            if (!this.scene.checkIsWall(this.x - UtilClass.SPRITEWIDTH, this.y + UtilClass.SPRITEHEIGHT)) {
                this.x -= UtilClass.SPRITEWIDTH;
                this.y += UtilClass.SPRITEHEIGHT;
            }
            this.setFrame(0);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyFrontLeft)) {
            // moving to left and front
            if (!this.scene.checkIsWall(this.x - UtilClass.SPRITEWIDTH, this.y - UtilClass.SPRITEHEIGHT)) {
                this.x -= UtilClass.SPRITEWIDTH;
                this.y -= UtilClass.SPRITEHEIGHT;
            }
            this.setFrame(3);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyFrontRight)) {
            // moving to right and front
            if (!this.scene.checkIsWall(this.x + UtilClass.SPRITEWIDTH, this.y - UtilClass.SPRITEHEIGHT)) {
                this.x += UtilClass.SPRITEWIDTH;
                this.y -= UtilClass.SPRITEHEIGHT;
            }
            this.setFrame(1);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyUse)) {
            // trying to use something. Close a door...
            this.scene.useSomething(this.x, this.y);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyMvUp)) {
            if (this.keyMvUp.shiftKey) {
                //console.log("UP")
                this.scene.useStairsOrPortal(this.x, this.y, "UP");
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyMvDownOrWait)) {
            if (this.keyMvUp.shiftKey) {
                //console.log("DOWN")
                this.scene.useStairsOrPortal(this.x, this.y, "DOWN");
            }
        }
    }
}