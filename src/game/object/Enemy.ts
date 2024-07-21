import { Game } from "../scenes/Game";
import { Bullet } from "./Bullet";
import { Entity, SpriteObject } from "./Entity";


export class Enemy extends Entity {
    actionEvent: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, sprite: string, x: number, y: number, health: number) {
        super(scene, sprite, 20, 10, x, y, health);
        this.type = "enemy";

        this.actionEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: () => this.actionEnemy(),
            callbackScope: this,
            loop: true
        });

    }

    actionEnemy() {}

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

    destroy(fromScene?: boolean) {
        this.actionEvent.destroy();
        super.destroy(fromScene);
    }
}

export class ShooterOrc extends Enemy {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, "sorc", x, y, 100);
    }

    actionEnemy() {
        const x = Math.floor(Math.random() * 3) - 1;
        const y = Math.floor(Math.random() * 3) - 1;
        this.setVelocity(x * 50, y * 50);
        
        const gameScene = this.scene as Game;

        const dst = new Phaser.Math.Vector2(gameScene.player!.x - this.x, gameScene.player!.y - this.y);
        if (dst.length() < 100) {
            const bullet = new Bullet(this.scene, this.x, this.y, dst.normalize().x * 100, dst.normalize().y * 100);
        }
    }
}

export class Orc extends Enemy {
    isAttack: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, "orc", x, y, 100);
        this.isAttack = false;
    }

    actionEnemy() {
        const x = Math.floor(Math.random() * 3) - 1;
        const y = Math.floor(Math.random() * 3) - 1;
        this.setVelocity(x * 50, y * 50);
        
        const gameScene = this.scene as Game;

        const dst = new Phaser.Math.Vector2(gameScene.player!.x - this.x, gameScene.player!.y - this.y);
        if (dst.length() < 30) {
            this.state = "attack";
            this.isAttack = true;
            this.scene.time.delayedCall(300, () => {
                const dst = new Phaser.Math.Vector2(gameScene.player!.x - this.x, gameScene.player!.y - this.y);
                if (dst.length() < 30) {
                    gameScene.player!.health -= 10;
                }
            });
            this.on('animationcomplete', () => this.isAttack = false);
        }
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        if (this.isAttack)
            this.state = "attack";
    }
}