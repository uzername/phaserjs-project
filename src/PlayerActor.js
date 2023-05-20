/// https://github.com/photonstorm/phaser3-examples/blob/master/public/src/animation/create%20animation%20from%20sprite%20sheet.js
import { ActorMain } from './ActorMain';
import { MessageService } from './MessageService';
import { UtilClass } from './Utils';
const inputMode = {
    NONE: 0,
    TALK: 1,
    USE: 2
}
export class Player extends ActorMain {    
    /// scene and coordinates to use
    constructor(scene, x, y) {
        super(scene, x, y, 'hobgoblin_controllable_sprites', 0);
        this.inputModeCurrent = inputMode.NONE;
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
        this.keyTalk = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.keyMvDownOrWait = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
        this.keyMvUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
    }
    update() {
        // inspired by tileset movement example
        if (Phaser.Input.Keyboard.JustDown(this.keyFront) || Phaser.Input.Keyboard.JustDown(this.keyFrontNum)) {            
            if (this.inputModeCurrent === inputMode.TALK) {
                
                this.inputModeCurrent = inputMode.NONE;
                MessageService.toggleDirectionsDisplay();
                this.scene.talkToSomeone(this.x, this.y - UtilClass.SPRITEHEIGHT);
            } else {
                // moving to front    
                if (!this.scene.checkIsWall(this.x, this.y - UtilClass.SPRITEHEIGHT) && !this.scene.checkIsStoryNPC(this.x, this.y - UtilClass.SPRITEHEIGHT)) {
                    this.y -= UtilClass.SPRITEHEIGHT;
                }
            }
            this.setFrame(3);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyLeft) || Phaser.Input.Keyboard.JustDown(this.keyLeftNum)) {
            if (this.inputModeCurrent === inputMode.TALK) {
                this.inputModeCurrent = inputMode.NONE;
                MessageService.toggleDirectionsDisplay();
                this.scene.talkToSomeone(this.x - UtilClass.SPRITEWIDTH, this.y);
            } else {
                // moving to left
                if (!this.scene.checkIsWall(this.x - UtilClass.SPRITEWIDTH, this.y) && !this.scene.checkIsStoryNPC(this.x - UtilClass.SPRITEWIDTH, this.y)) {
                    this.x -= UtilClass.SPRITEWIDTH;
                }
            }
            this.setFrame(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyBack) || Phaser.Input.Keyboard.JustDown(this.keyBackNum)) {
            if (this.inputModeCurrent === inputMode.TALK) {
                this.inputModeCurrent = inputMode.NONE;
                MessageService.toggleDirectionsDisplay();
                this.scene.talkToSomeone(this.x, this.y + UtilClass.SPRITEHEIGHT);
            } else {
                // moving to back
                if (!this.scene.checkIsWall(this.x, this.y + UtilClass.SPRITEHEIGHT) && !this.scene.checkIsStoryNPC(this.x, this.y + UtilClass.SPRITEHEIGHT)) {
                    this.y += UtilClass.SPRITEHEIGHT;
                }
            }
            this.setFrame(2);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyRight) || Phaser.Input.Keyboard.JustDown(this.keyRightNum)) {
            if (this.inputModeCurrent === inputMode.TALK) {
                this.inputModeCurrent = inputMode.NONE;
                MessageService.toggleDirectionsDisplay();
                this.scene.talkToSomeone(this.x + UtilClass.SPRITEWIDTH, this.y);
            } else {
                // moving to right
                if (!this.scene.checkIsWall(this.x + UtilClass.SPRITEWIDTH, this.y) && !this.scene.checkIsStoryNPC(this.x + UtilClass.SPRITEWIDTH, this.y)) {
                    this.x += UtilClass.SPRITEWIDTH;
                }
            }
            this.setFrame(1);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyBackRight)) {
            if (this.inputModeCurrent === inputMode.TALK) {
                this.inputModeCurrent = inputMode.NONE;
                MessageService.toggleDirectionsDisplay();
                this.scene.talkToSomeone(this.x + UtilClass.SPRITEWIDTH, this.y+UtilClass.SPRITEHEIGHT);
            } else {
                // moving to right and back
                if (!this.scene.checkIsWall(this.x + UtilClass.SPRITEWIDTH, this.y + UtilClass.SPRITEHEIGHT) && !this.scene.checkIsStoryNPC(this.x + UtilClass.SPRITEWIDTH, this.y + UtilClass.SPRITEHEIGHT) ) {
                    this.x += UtilClass.SPRITEWIDTH;
                    this.y += UtilClass.SPRITEHEIGHT;
                }
            }
            this.setFrame(2);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyBackLeft)) {
            if (this.inputModeCurrent === inputMode.TALK) {
                this.inputModeCurrent = inputMode.NONE;
                MessageService.toggleDirectionsDisplay();
                this.scene.talkToSomeone(this.x - UtilClass.SPRITEWIDTH, this.y + UtilClass.SPRITEHEIGHT);
            } else {
                // moving to left and back
                if (!this.scene.checkIsWall(this.x - UtilClass.SPRITEWIDTH, this.y + UtilClass.SPRITEHEIGHT) && !this.scene.checkIsStoryNPC(this.x - UtilClass.SPRITEWIDTH, this.y + UtilClass.SPRITEHEIGHT) ) {
                    this.x -= UtilClass.SPRITEWIDTH;
                    this.y += UtilClass.SPRITEHEIGHT;
                }
            }
            this.setFrame(0);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyFrontLeft)) {
            if (this.inputModeCurrent === inputMode.TALK) {
                this.inputModeCurrent = inputMode.NONE;
                MessageService.toggleDirectionsDisplay();
                this.scene.talkToSomeone(this.x - UtilClass.SPRITEWIDTH, this.y - UtilClass.SPRITEHEIGHT);
            } else {
                // moving to left and front
                if (!this.scene.checkIsWall(this.x - UtilClass.SPRITEWIDTH, this.y - UtilClass.SPRITEHEIGHT) && !this.scene.checkIsStoryNPC(this.x - UtilClass.SPRITEWIDTH, this.y - UtilClass.SPRITEHEIGHT)) {
                    this.x -= UtilClass.SPRITEWIDTH;
                    this.y -= UtilClass.SPRITEHEIGHT;
                }
            }
            this.setFrame(3);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyFrontRight)) {
            if (this.inputModeCurrent === inputMode.TALK) {
                this.inputModeCurrent = inputMode.NONE;
                MessageService.toggleDirectionsDisplay();
                this.scene.talkToSomeone(this.x + UtilClass.SPRITEWIDTH, this.y - UtilClass.SPRITEHEIGHT);
            } else {
                // moving to right and front
                if (!this.scene.checkIsWall(this.x + UtilClass.SPRITEWIDTH, this.y - UtilClass.SPRITEHEIGHT) && !this.scene.checkIsStoryNPC(this.x + UtilClass.SPRITEWIDTH, this.y - UtilClass.SPRITEHEIGHT)) {
                    this.x += UtilClass.SPRITEWIDTH;
                    this.y -= UtilClass.SPRITEHEIGHT;
                }
            }
            this.setFrame(1);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyUse)) {
            // trying to use something. Close a door...
            this.scene.useSomething(this.x, this.y);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyTalk)) {
            this.inputModeCurrent = inputMode.TALK;
            MessageService.toggleDirectionsDisplay();
            
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyMvUp)) {
            if (this.keyMvUp.shiftKey) {
                //console.log("UP")
                this.scene.useStairsOrPortal(this.x, this.y, "UP");
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyMvDownOrWait)) {
            if (this.keyMvDownOrWait.shiftKey) {
                //console.log("DOWN")
                this.scene.useStairsOrPortal(this.x, this.y, "DOWN");
            }
        }
    }
}