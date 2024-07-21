import { Game } from "../scenes/Game";
import { SpriteObject } from "./Entity";

export class Bullet extends SpriteObject {
    constructor(scene: Phaser.Scene, x: number, y: number, velocityX: number, velocityY: number) {
        super(scene, "bullet", 6, 12, x, y);
        this.type = "bullet";
        this.body!.velocity.x = velocityX;
        this.body!.velocity.y = velocityY;
        this.setRotation(Math.atan2(velocityY, velocityX));
        this.body!.setSize(6, 12);
        this.setAngle(Phaser.Math.RadToDeg(Math.atan2(velocityY, velocityX)));
        this.scale = 0.5;
    }

    protected animState(): void {
        return;
    }
}