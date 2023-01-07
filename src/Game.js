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
    // check whether this tile is wall
    checkIsWall(xPixel, yPixel) {
        var tileWall = this.WallLayer.getTileAtWorldXY(xPixel, yPixel, true, this.cameras.main);
        if ((tileWall.index != -1) && ('collides' in tileWall.properties) && (tileWall.properties.collides == true)) {
            return true;
        } else {
            return false;
        }
        
    }

}