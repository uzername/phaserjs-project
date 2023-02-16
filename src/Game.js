import Phaser from 'phaser';
import { Player } from './PlayerActor.js';
import { UtilClass } from './Utils.js'
import { MessageService } from './MessageService.js'

export class SceneMansion extends Phaser.Scene {
    FloorsLayer = null;
    StairsLayer = null;
    WallLayer = null;
    DecorLayer = null;
    player = null;

    constructor() {
        super("SceneMansion");
    }
    preload() {

    }
    create() {
        let map = this.make.tilemap({ key: "mansion0" });
        
        
        
        let tilesetFloors = map.addTilesetImage("tilesetfloors", "tilesetfloors_");
        let tilesetStairs = map.addTilesetImage("tilesetstairs", "tilesetstairs_");
        let tilesetWall = map.addTilesetImage("tilesetwalls", "tilesetwalls_");
        let tilesetStatue = map.addTilesetImage("tilesetstatues", "tilesetstatues_");

        this.FloorsLayer = map.createLayer("Floors", tilesetFloors);
        this.StairsLayer = map.createLayer("stairs", tilesetStairs);
        this.WallLayer = map.createLayer("Walls", tilesetWall);
        this.DecorLayer = map.createLayer("Decor", tilesetStatue);
        // Using the this.map.filterObjects() function, select the required objects from the required layer. 
        // The first argument is the layers name, the second one is the callback function for filtering. 
        this.spawnPoints = map.filterObjects("playerspawns", obj => obj.name === "playerspawn");
        this.WallLayer.setCollisionByProperty({ collides: true });
        // spawnpoint 0 is always there. put there player
        var playerXpixel = this.spawnPoints[0].x; var playerYpixel = this.spawnPoints[0].y;
        this.player = new Player(this, playerXpixel + UtilClass.SPRITEWIDTH / 2, playerYpixel + UtilClass.SPRITEHEIGHT / 2);
        this.initCamera();
        console.log("Scene Mansion created");
        MessageService.addMessage("You have stumbled across the abandoned mansion. You feel that owner may arrive soon");
    }
    update() {
        this.player.update();
    }
    // bind camera to player
    initCamera() {
        this.cameras.main.startFollow(this.player, true, 1, 1);
    }
    // close door at xPixel, yPixel
    closeDoor(xPixel, yPixel) {
        var tileWall = this.WallLayer.getTileAtWorldXY(xPixel, yPixel, true, this.cameras.main);        
            if (('doorstate' in tileWall.properties) && (tileWall.properties.doorstate == "OPEN")) {
                tileWall.properties.doorstate = "CLOSED"
                // now - I found  door -  change it to closed
                this.WallLayer.removeTileAtWorldXY(xPixel, yPixel);
                this.WallLayer.putTileAtWorldXY(tileWall.index - 3, xPixel, yPixel)
                var tmpTile = this.WallLayer.getTileAtWorldXY(xPixel, yPixel, true, this.cameras.main);
                tmpTile.properties.doorstate = "CLOSED";
                tmpTile.properties.collides = true;

                if ((tileWall.index >= UtilClass.LONGDOORH_STARTINDEX) && (tileWall.index <= UtilClass.LONGDOORH_ENDINDEX)) {
                    // seek for all horizontal doors tiles and open them too
                    var horizontalClosingFunction = function (dH, thisthis) {
                        var ptrdoor = 1; var proceedHorizontal = true;
                        while (proceedHorizontal) {
                            var tileDoorH = thisthis.WallLayer.getTileAtWorldXY(xPixel + dH * ptrdoor * UtilClass.SPRITEWIDTH, yPixel, true, thisthis.cameras.main);
                            if ((tileDoorH.index >= UtilClass.LONGDOORH_STARTINDEX) && (tileDoorH.index <= UtilClass.LONGDOORH_ENDINDEX)) {
                                tileDoorH.properties.doorstate = "CLOSED";
                                thisthis.WallLayer.removeTileAtWorldXY(xPixel + dH * ptrdoor * UtilClass.SPRITEWIDTH, yPixel);
                                thisthis.WallLayer.putTileAtWorldXY(tileDoorH.index - 3, xPixel + dH * ptrdoor * UtilClass.SPRITEWIDTH, yPixel)
                                tmpTile = thisthis.WallLayer.getTileAtWorldXY(xPixel + dH * ptrdoor * UtilClass.SPRITEWIDTH, yPixel, true, thisthis.cameras.main);
                                tmpTile.properties.doorstate = "CLOSED";
                                tmpTile.properties.collides = true;
                            } else { proceedHorizontal = false; }
                            ptrdoor++
                        }
                    }
                    horizontalClosingFunction(-1, this);
                    horizontalClosingFunction(+1, this);
                }
            }
            
    }
    // try to use something. xPixel, yPixel - position of character in pixels
    useSomething(xPixel, yPixel) {
        // try to close door       
        var tileTest0 = this.WallLayer.getTileAtWorldXY(xPixel, yPixel - UtilClass.SPRITEHEIGHT, true, this.cameras.main);
        if ((tileTest0 != null) && (tileTest0.index != -1) && ('doorstate' in tileTest0.properties) && (tileTest0.properties.doorstate == "OPEN")) {
            this.closeDoor(xPixel, yPixel - UtilClass.SPRITEHEIGHT);
        } else {
            tileTest0 = this.WallLayer.getTileAtWorldXY(xPixel, yPixel + UtilClass.SPRITEHEIGHT, true, this.cameras.main);
            if ((tileTest0 != null) && (tileTest0.index != -1) && ('doorstate' in tileTest0.properties) && (tileTest0.properties.doorstate == "OPEN")) {
                this.closeDoor(xPixel, yPixel + UtilClass.SPRITEHEIGHT);
            } else {
                tileTest0 = this.WallLayer.getTileAtWorldXY(xPixel - UtilClass.SPRITEWIDTH, yPixel, true, this.cameras.main);
                if ((tileTest0 != null) && (tileTest0.index != -1) && ('doorstate' in tileTest0.properties) && (tileTest0.properties.doorstate == "OPEN")) {
                    this.closeDoor(xPixel - UtilClass.SPRITEWIDTH, yPixel);
                } else {
                    tileTest0 = this.WallLayer.getTileAtWorldXY(xPixel + UtilClass.SPRITEWIDTH, yPixel, true, this.cameras.main);
                    if ((tileTest0 != null) && (tileTest0.index != -1) && ('doorstate' in tileTest0.properties) && (tileTest0.properties.doorstate == "OPEN")) {
                        this.closeDoor(xPixel + UtilClass.SPRITEWIDTH, yPixel);
                    }
                }
            }
        }

    }
    // check whether this tile is wall. Or door
    checkIsWall(xPixel, yPixel) {
        var tileWall = this.WallLayer.getTileAtWorldXY(xPixel, yPixel, true, this.cameras.main);
        if ((tileWall != null) && (tileWall.index != -1) && ('collides' in tileWall.properties) && (tileWall.properties.collides == true)) {
            if (('doorstate' in tileWall.properties) && (tileWall.properties.doorstate == "CLOSED")) {                                
                // now - I found closed door -  change it to opened
                this.WallLayer.removeTileAtWorldXY(xPixel, yPixel);
                this.WallLayer.putTileAtWorldXY(tileWall.index + 3, xPixel, yPixel);
                var tmpTile = this.WallLayer.getTileAtWorldXY(xPixel, yPixel, true, this.cameras.main);
                tmpTile.properties.doorstate = "OPEN";
                tmpTile.properties.collides = false;
                if ((tileWall.index >= UtilClass.LONGDOORH_STARTINDEX)&& (tileWall.index <= UtilClass.LONGDOORH_ENDINDEX)) {
                    // seek for all horizontal doors tiles and open them too
                    var horizontalOpeningFunction = function (dH, thisthis) {
                        var ptrdoor = 1; var proceedHorizontal = true;
                        while (proceedHorizontal) {
                            var tileDoorH = thisthis.WallLayer.getTileAtWorldXY(xPixel + dH * ptrdoor * UtilClass.SPRITEWIDTH, yPixel, true, thisthis.cameras.main);
                            if ((tileDoorH.index >= UtilClass.LONGDOORH_STARTINDEX) && (tileDoorH.index <= UtilClass.LONGDOORH_ENDINDEX)) {
                                tileDoorH.properties.doorstate = "OPEN";
                                thisthis.WallLayer.removeTileAtWorldXY(xPixel +dH* ptrdoor * UtilClass.SPRITEWIDTH, yPixel);
                                thisthis.WallLayer.putTileAtWorldXY(tileDoorH.index + 3, xPixel + dH * ptrdoor * UtilClass.SPRITEWIDTH, yPixel);                                
                                tmpTile = thisthis.WallLayer.getTileAtWorldXY(xPixel + dH * ptrdoor * UtilClass.SPRITEWIDTH, yPixel, true, thisthis.cameras.main);
                                tmpTile.properties.doorstate = "OPEN";
                                tmpTile.properties.collides = false;
                            } else { proceedHorizontal = false; }
                            ptrdoor++
                        }
                    }
                    horizontalOpeningFunction(-1,this);
                    horizontalOpeningFunction(+1,this);
                } 
            }
            return true;
        } else {
            return false;
        }
        
    }

}