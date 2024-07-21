import { Game } from "../scenes/Game";

export class SpriteObject extends Phaser.Physics.Arcade.Sprite {
    sprite: string;
    size: number;
    type: string;
    hitbox: number;

    constructor(scene: Phaser.Scene, sprite: string, size: number, hitbox: number, x: number, y: number) {
        super(scene, x, y, sprite);
        this.sprite = sprite;
        this.type = "default";
        this.size = size;
        this.hitbox = hitbox;
        this.state = "";
        this.init();
    }

    private init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        (this.scene as Game).objects!.add(this);

        this.setSize(this.size, this.size);
        this.setDisplaySize(this.size, this.size);
        this.scale = 1;
    }

    protected animState() {
        this.play(this.sprite + "_" + this.state, true);
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this.animState();
        this.body?.setSize(this.hitbox, this.hitbox);
    }

    collide(other: SpriteObject) {}
}

export class Entity extends SpriteObject {
    health: number;
    max_health: number;
    maxHealthBar: Phaser.GameObjects.Rectangle;
    healthBar: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, sprite: string, size: number, hitbox: number, x: number, y: number, health: number) {
        super(scene, sprite, size, hitbox, x, y);
        this.health = health;
        this.max_health = health;
        this.maxHealthBar = this.scene.add.rectangle(this.x, this.y - this.size / 2 - 5, this.size, 4, 0x000000)
        this.healthBar = this.scene.add.rectangle(this.x, this.y - this.size / 2 - 5, this.size, 4, 0x00ff00)
        this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.lateUpdate());
    }

    protected preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        this.healthBar.width = this.health * this.size / this.max_health;
    }

    lateUpdate() {
        this.healthBar.x = this.x;
        this.healthBar.y = this.y - this.size / 2 - 5;
        this.maxHealthBar.x = this.x;
        this.maxHealthBar.y = this.y - this.size / 2 - 5;

        if (this.health <= 0) {
            this.healthBar.destroy();
            this.maxHealthBar.destroy();
            this.destroy();
        }
    }
}