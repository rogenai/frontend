export class Player {
    obj: Phaser.Physics.Arcade.Sprite;
    facing: string;
    health: number;

    constructor(obj: Phaser.Physics.Arcade.Sprite) {
        this.obj = obj;
        this.obj.setCollideWorldBounds(true);
        this.obj.setSize(20, 20);
        this.obj.setDisplaySize(20, 20);
        this.facing = 'right';
        this.health = 100;
    }

    update() {
    }
}