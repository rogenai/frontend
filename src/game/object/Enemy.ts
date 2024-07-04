export class Enemy {
    obj: any;
    health: number;

    constructor(obj: any) {
        this.health = 300;
        this.obj = obj;
        this.obj.setCollideWorldBounds(true);
        this.obj.setSize(20, 20);
        this.obj.setDisplaySize(20, 20);
    }

    update() {
    }
}