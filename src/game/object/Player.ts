import { Game } from "../scenes/Game";
import { Entity, SpriteObject } from "./Entity";

export class Sword extends Phaser.GameObjects.Rectangle {
    isAttack: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 40, 25, 0x00, 0);
        this.scene.physics.add.existing(this);
        this.isAttack = false;
        this.type = "sword";
    }
}

export class Player extends Entity {
    isJerk: boolean;
    isCooldownJerk: boolean;
    isDamage: boolean;
    isAttack: boolean;
    sword: Sword;
    
    constructor(scene: Phaser.Scene, sprite: string, size: number, hitbox: number, x: number, y: number) {
        super(scene, sprite, size, hitbox, x, y, 100);
        this.type = "player";
        this.health = 100;
        this.isJerk = false;
        this.isDamage = false;
        this.isCooldownJerk = false;
        this.isAttack = false;
        this.sword = new Sword(scene, x, y);

        this.scene.input.on('pointerdown', (pointer: any) => {
            if (this.isAttack) return;
            this.state = "attack" + (Math.floor(Math.random() * 2) + 1);
            this.isAttack = true;
            
            this.scene.time.delayedCall(400, () => {
                this.scene.physics.collide(this.sword, (this.scene as Game).objects, (a, b) => {
                    if ((b as any).type === "enemy") {
                        (b as any).health -= 50;
                    }
                });
            });

            this.on('animationcomplete', () => {
                this.isAttack = false;
            });
        });
    }

    protected preUpdate(time: number, delta: number): void {
        const cursors = this.scene.input.keyboard!.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT
        }) as any;

        if (cursors.up.isDown)
        {
            this.setVelocityY(-160);
        }

        if (cursors.down.isDown)
        {
            this.setVelocityY(160);
        }

        if (cursors.right.isDown)
        {
            this.setVelocityX(160);
        }
        
        if (cursors.left.isDown)
            {
                this.setVelocityX(-160);
            }

        if (!(cursors.down.isDown || cursors.up.isDown)) {
            this.setVelocityY(0);
        }

        if (!(cursors.right.isDown || cursors.left.isDown)) {
            this.setVelocityX(0);
        }

        super.preUpdate(time, delta);
        this.sword.setPosition(this.x, this.y);

        if (this.scene.game.input.mousePointer!.worldX < this.x) {
            this.flipX = true;
        }
        else {
            this.flipX = false;
        }

        if (!this.body || this.isAttack) return;

        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.state = "idle";
        }
        else {
            this.state = "walk";
        }
    }

    lateUpdate() {
        this.sword.x = this.x;
        this.sword.y = this.y;
        super.lateUpdate();
    }

    collide(other: SpriteObject): void {
        if (other.type === "bullet") {
            this.health -= 10;
            other.destroy();
        }
    }
}