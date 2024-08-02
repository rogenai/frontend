import { Game } from "../scenes/Game";
import { Bullet } from "./Bullet";
import { Entity, SpriteObject } from "./Entity";


export class Enemy extends Entity {

    constructor(scene: Phaser.Scene, sprite: string, x: number, y: number, health: number, id: string) {
        super(scene, sprite, 20, 10, x, y, health, id);
        this.type = "enemy";
    }

    protected preUpdate(time: number, delta: number): void { 
        super.preUpdate(time, delta);

        if (this.body!.velocity.x === 0 && this.body!.velocity.y === 0) {
            this.state = "idle";
        }
        else if (this.body!.velocity.x > 0) {
            this.flipX = false;
            this.state = "walk";
        }
        else if (this.body!.velocity.x < 0) {
            this.flipX = true;
            this.state = "walk";
        }
    }
}

export class ShooterOrc extends Enemy {

    constructor(scene: Phaser.Scene, x: number, y: number, id: string) {
        super(scene, "sorc", x, y, 100, id);
    }

    action(data: any) {
        const bullet = new Bullet(this.scene, this.x, this.y, data.x * 100, data.y * 100);
    }
}

export class Orc extends Enemy {
    isAttack: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, id: string) {
        super(scene, "orc", x, y, 100, id);
        this.isAttack = false;
    }

    action(data: any) {
        this.state = "attack";
        this.isAttack = true;
        this.scene.time.delayedCall(300, () => {
            (this.scene as any).entities.forEach((entity: any) => {
                if (entity.entity !== "player") return;
                const dst = new Phaser.Math.Vector2(entity.x - this.x, entity.y - this.y);
                if (dst.length() < 30) {
                    entity.health -= 10;
                }
            });

            const player = (this.scene as any).player;
            const dst = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y);
            if (dst.length() < 30) {
                player.health -= 10;
            }
        });

        this.on('animationcomplete', () => this.isAttack = false);
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        if (this.isAttack)
            this.state = "attack";
    }
}