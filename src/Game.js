import Phaser from 'phaser';
import { Player } from './PlayerActor.js';

export class scene1 extends Phaser.Scene {
    constructor() {
        super("scene1");
    }
    preload() {

    }
    create() {
        let map = this.make.tilemap({ key: "mansion0" });
        
        
        
        let tilesetFloors = map.addTilesetImage("tilesetfloors", "tilesetfloors_");
        let tilesetStairs = map.addTilesetImage("tilesetstairs", "tilesetstairs_");
        let tilesetWall = map.addTilesetImage("tilesetwalls", "tilesetwalls_");
        let tilesetStatue = map.addTilesetImage("tilesetstatues", "tilesetstatues_");

        const FloorsLayer = map.createLayer("Floors", tilesetFloors);
        const StairsLayer = map.createLayer("stairs", tilesetStairs);
        const WallLayer = map.createLayer("Walls", tilesetWall);
        const DecorLayer = map.createLayer("Decor", tilesetStatue);
        
        
        
        WallLayer.setCollisionByProperty({ collides: true });

        this.player = new Player(this, 0+32/2, 0+32/2);
        console.log("scene1");
    }
    update() {
        this.player.update();
    }
}