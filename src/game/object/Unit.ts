export class Unit extends Phaser.Physics.Arcade.Sprite {
    health: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: any, health: number) {
        super(scene, x, y, texture);
        this.health = health;
    }

    update() {
        
    }
}