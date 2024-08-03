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
    nameText: Phaser.GameObjects.Text;
    
    constructor(scene: Phaser.Scene, sprite: string, size: number, hitbox: number, x: number, y: number, name: string, id: string) {
        super(scene, sprite, size, hitbox, x, y, 100, id);
        this.type = "player";
        this.health = 100;
        this.isJerk = false;
        this.isDamage = false;
        this.isCooldownJerk = false;
        this.isAttack = false;
        this.sword = new Sword(scene, x, y);
        this.nameText = this.scene.add.text(x, y, name, { 
            fontSize: '6px', 
            color: '#fff',
            resolution: 2
        });

        this.scene.input.on('pointerdown', (pointer: any) => {
            if (this.isAttack) return;
            this.state = "attack" + (Math.floor(Math.random() * 2) + 1);
            this.isAttack = true;
            
            this.scene.time.delayedCall(400, () => {
                this.scene.physics.collide(this.sword, (this.scene as Game).objects, (a, b) => {
                    if ((b as any).type !== "enemy") return;
                    (this.scene as any).socket.emit("damage", { id: (b as Entity).id, damage: 50 });
                });
            });
            (this.scene as any).socket.emit("attack");
        });

        this.on('animationcomplete', () => {
            this.isAttack = false;
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
            this.setVelocityY(-100);
        }

        if (cursors.down.isDown)
        {
            this.setVelocityY(100);
        }

        if (cursors.right.isDown)
        {
            this.setVelocityX(100);
        }
        
        if (cursors.left.isDown)
        {
            this.setVelocityX(-100);
        }

        if (!(cursors.down.isDown || cursors.up.isDown)) {
            this.setVelocityY(0);
        }

        if (!(cursors.right.isDown || cursors.left.isDown)) {
            this.setVelocityX(0);
        }

        super.preUpdate(time, delta);

        if (this.scene.game.input.mousePointer!.worldX < this.x) {
            this.flipX = true;
        }
        else {
            this.flipX = false;
        }

        if (this.state !== "idle") {
            (this.scene as any).socket?.emit('move', { x: this.x, y: this.y });
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
        this.sword.setPosition(this.x, this.y);
        this.nameText.setPosition(this.x - 7, this.y - 25);
        super.lateUpdate();
    }

    collide(other: SpriteObject): void {
        if (other.type === "bullet") {
            if (this.scene) {
                (this.scene as any).socket.emit("damage-got", 10);
            }
            other.destroy();
        }
    }
}

export class OtherPlayer extends Entity {
    isJerk: boolean;
    isCooldownJerk: boolean;
    isDamage: boolean;
    isAttack: boolean;
    sword: Sword;
    nameText: Phaser.GameObjects.Text;
    
    constructor(scene: Phaser.Scene, sprite: string, size: number, hitbox: number, x: number, y: number, name: string, id: string) {
        super(scene, sprite, size, hitbox, x, y, 100, id);
        console.log("Player created", name);
        this.type = "player";
        this.health = 100;
        this.isJerk = false;
        this.name = name;
        this.isDamage = false;
        this.isCooldownJerk = false;
        this.isAttack = false;
        this.sword = new Sword(scene, x, y);
        this.nameText = this.scene.add.text(x, y, name, { 
            fontSize: '6px', 
            color: '#fff',
            resolution: 2
        });

        this.on('animationcomplete', () => {
            this.isAttack = false;
            (this.scene as any).socket.emit("damage");
        });
    }

    action(data: any) {
        if (this.isAttack) return;
        this.state = "attack" + (Math.floor(Math.random() * 2) + 1);
        this.isAttack = true;
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        
        if (!this.body || this.isAttack) return;

        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.state = "idle";
        }
        else {
            this.state = "walk";
        }
    }

    lateUpdate() {
        this.sword.setPosition(this.x, this.y);
        this.nameText.setPosition(this.x - 7, this.y - 25);
        super.lateUpdate();
    }

    collide(other: SpriteObject): void {
        if (other.type === "bullet") {
            other.destroy();
        }
    }
}