import Phaser from 'phaser';

export class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }
    preload() {
        this.load.image('tilesetwalls_', require("/finalgraphics/walls.png"));
        this.load.image('tilesetstatues_', require("/finalgraphics/statues.png"));
        this.load.image('tilesetstairs_', require("/finalgraphics/stairs.png"));
        //this.load.spritesheet('tilesetstairs_', require("/finalgraphics/stairs.png"), { frameWidth: 32, frameHeight: 32 });
        this.load.image('tilesetfloors_', require("/finalgraphics/floors.png"));
        this.load.tilemapTiledJSON('map0', require("/finalmaps/map0.json"));
        this.load.spritesheet('hobgoblin_controllable_sprites', require("/finalgraphics/hobgoblin_controllable.png"), { frameWidth: 32, frameHeight: 32 });
        console.log("preloader");
    }
    create() {
        this.scene.start("SceneMansion");
    }
   
}