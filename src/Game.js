import Phaser from 'phaser';
import { Player } from './PlayerActor.js';
import { UtilClass } from './Utils.js'
import { MessageService } from './MessageService.js'
import { StoryMode } from './StoryMode.js'
import { ActorNPC } from './ActorNPC.js';

export class SceneMansion extends Phaser.Scene {
    FloorsLayer = null;
    StairsLayer = null;
    WallLayer = null;
    DecorLayer = null;
    player = null;
    playerXpixel = 0; playerYpixel = 0;
    currentNPCs = [];

    constructor() {
        super("SceneMansion");
    }
    preload() {

    }
    // Defalut map: "map0"
    loadActualMap(mapID) {
        this.map = this.make.tilemap({ key: mapID });
        let tilesetFloors = this.map.addTilesetImage("tilesetfloors", "tilesetfloors_");
        let tilesetStairs = this.map.addTilesetImage("tilesetstairs", "tilesetstairs_");
        let tilesetWall = this.map.addTilesetImage("tilesetwalls", "tilesetwalls_");
        let tilesetStatue = this.map.addTilesetImage("tilesetstatues", "tilesetstatues_");
        this.FloorsLayer = this.map.createLayer("Floors", tilesetFloors);
        this.StairsLayer = this.map.createLayer("Stairs", tilesetStairs);
        this.WallLayer = this.map.createLayer("Walls", tilesetWall);
        this.DecorLayer = this.map.createLayer("Decor", tilesetStatue);
        // Using the this.map.filterObjects() function, select the required objects from the required layer. 
        // The first argument is the layers name, the second one is the callback function for filtering. 
        this.spawnPoints = this.map.filterObjects("playerspawns", obj => obj.name === "playerspawn");
        //this.WallLayer.setCollisionByProperty({ collides: true });
        // spawnpoint 0 is always there. put there player
        if (StoryMode.storyState == "INIT") {
            this.playerXpixel = this.spawnPoints[0].x; this.playerYpixel = this.spawnPoints[0].y;
        }
        this.player = new Player(this, this.playerXpixel + UtilClass.SPRITEWIDTH / 2, this.playerYpixel + UtilClass.SPRITEHEIGHT / 2);
        this.initCamera();
        console.log("map reloaded: " + mapID);
        if (StoryMode.storyState == "INIT") {
            MessageService.addMessage("You have stumbled across the abandoned mansion. You feel that owner may arrive soon");
            StoryMode.storyState = "PROLOGUE";
        } else {
            MessageService.addMessage("You arrived to another location");
        }
    }
    // add "talkable" NPCs to map
    loadActualNPCs(mapID) {
        this.currentNPCs.length = 0;
        for (var singleNPC in StoryMode.storyNPCs[mapID]) {
            var NPCinst = new ActorNPC(this,
                StoryMode.storyNPCs[mapID][singleNPC].coordX * UtilClass.SPRITEWIDTH + UtilClass.SPRITEWIDTH / 2,
                StoryMode.storyNPCs[mapID][singleNPC].coordY * UtilClass.SPRITEHEIGHT + StoryMode.storyNPCs[mapID][singleNPC].sizeH/2,
                StoryMode.storyNPCs[mapID][singleNPC].sprite
            )
            NPCinst.Behavior = StoryMode.storyNPCs[mapID][singleNPC].isHostile;
            NPCinst.Name = singleNPC;
            NPCinst.setFrame(StoryMode.storyNPCs[mapID][singleNPC].sprite_index);
            this.currentNPCs.push(NPCinst);
        }
    }
    create() {        
        this.loadActualMap(StoryMode.currentMap);        
        this.loadActualNPCs(StoryMode.currentMap);
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
    // try to talk to someone. Used to drive story. xPixel, yPixel - position of DESIRED dir. We can talk only to someone at nearby square
    talkToSomeone(xPixel, yPixel) {
        for (var singleNPC in StoryMode.storyNPCs[StoryMode.currentMap]) {
            var XC = StoryMode.storyNPCs[StoryMode.currentMap][singleNPC].coordX * UtilClass.SPRITEWIDTH + UtilClass.SPRITEWIDTH / 2;
            var YC = StoryMode.storyNPCs[StoryMode.currentMap][singleNPC].coordY * UtilClass.SPRITEHEIGHT + StoryMode.storyNPCs[StoryMode.currentMap][singleNPC].sizeH / 2;
            // it's a crutch I dunno
            if (StoryMode.storyNPCs[StoryMode.currentMap][singleNPC].sizeH == UtilClass.SPRITEHEIGHTLARGE) {
                YC += UtilClass.SPRITEHEIGHT / 2;
            }
            
            if ((XC == xPixel) && (YC == yPixel)) {
                // we found it, transfer handling to StoryMode
                StoryMode.talkToNPC(singleNPC);
            }
        }

    }

    checkIsStoryNPC(xPixel, yPixel) {
        for (var singleNPC in StoryMode.storyNPCs[StoryMode.currentMap]) {
            var XC = StoryMode.storyNPCs[StoryMode.currentMap][singleNPC].coordX * UtilClass.SPRITEWIDTH + UtilClass.SPRITEWIDTH / 2;
            var YC = StoryMode.storyNPCs[StoryMode.currentMap][singleNPC].coordY * UtilClass.SPRITEHEIGHT + StoryMode.storyNPCs[StoryMode.currentMap][singleNPC].sizeH / 2;
            // it's a crutch I dunno
            if (StoryMode.storyNPCs[StoryMode.currentMap][singleNPC].sizeH == UtilClass.SPRITEHEIGHTLARGE) {
                YC += UtilClass.SPRITEHEIGHT / 2;
            }

            if ((XC == xPixel) && (YC == yPixel)) {
                // we found it
                return true;
            }
        }
        return false;

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
    // ascend or descend - portal, stairs. Initiate scene reload
    useStairsOrPortal(xPixel, yPixel, direction) {
        console.log("[" + xPixel + ";" + yPixel + "]" + direction);
        var objectParamCallback = function (obj) {
            return ((xPixel - UtilClass.SPRITEWIDTH / 2 == obj.x) && (yPixel - UtilClass.SPRITEHEIGHT / 2 == obj.y))
        }
        var locatedObject = this.map.findObject("AccessPoints", objectParamCallback);
        if (locatedObject === null) {
            MessageService.addMessage("You cannot leave this area right here");
            return;
        } else {
            console.log(locatedObject.properties);
            StoryMode.currentMap = locatedObject.properties.find(element => element.name == "destmap").value;
            this.playerXpixel = locatedObject.properties.find(element => element.name == "destX").value;
            this.playerYpixel = locatedObject.properties.find(element => element.name == "destY").value;
            if ((StoryMode.currentMap == "") || (StoryMode.currentMap == null)) {
                MessageService.addMessage("You have no idea where this path may take you. Better leave it");
            } else {
                this.player.destroy();
                this.scene.restart();
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