import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../object/Player';
import { Enemy } from '../object/Enemy';


const swordOffset = 10;
export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera | undefined;
    background: Phaser.GameObjects.Image | undefined;
    gameText: Phaser.GameObjects.Text | undefined;
    player: Player | undefined;
    enemies: Phaser.Physics.Arcade.Group | undefined;
    platforms: Phaser.Physics.Arcade.StaticGroup | undefined;
    sword: Phaser.GameObjects.Image | undefined;
    enemyMoveTimer: Phaser.Time.TimerEvent | undefined;
    
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const map = [
            [2, 2, 2, 2, 2, 2, 2],
            [2, 1, 2, 1, 1, 0, 2],
            [2, 0, 2, 0, 1, 0, 2],
            [2, 1, 1, 1, 0, 0, 2],
            [2, 3, 0, 0, 0, 0, 2],
            [2, 2, 2, 2, 2, 2, 2]
        ];

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#000000');

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);
        
        this.platforms = this.physics.add.staticGroup();

        const tilesize = 30;
        const offset = 200;
        for (let i = 0; i < map.length; i++)
        {
            for (let j = 0; j < map[i].length; j++)
            {
                if (map[i][j] === 2)
                {
                    const platform = this.platforms.create(j * tilesize + offset, i * tilesize + offset, 'wall');
                    platform.setSize(tilesize, tilesize);
                    platform.setDisplaySize(tilesize, tilesize);
                }
            }
        }

        this.enemies = this.physics.add.group();

        for (let i = 0; i < map.length; i++)
        {
            for (let j = 0; j < map[i].length; j++)
            {
                if (map[i][j] === 1)
                {
                    const enemy = new Enemy(this.enemies.create(j * tilesize + offset, i * tilesize + offset, 'enemy'));
                }
            }
        }
        for (let i = 0; i < map.length; i++)
        {
            for (let j = 0; j < map[i].length; j++)
            {
                if (map[i][j] === 3)
                {
                    this.player = new Player(this.physics.add.sprite(j * tilesize + offset, i * tilesize + offset, 'player'));
                }
            }
        }
        this.sword = this.add.image(this.player!.obj.x + swordOffset, this.player!.obj.y, 'sword');

        this.camera.startFollow(this.player!.obj);
        this.camera.setBounds(0, 0, 1024, 768);
        this.camera.zoom = 1.5;
        this.physics.add.collider(this.player!.obj, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);

        this.input.on('pointerdown', (pointer: any) => {
            this.tweens.add({
                targets: this.sword!,
                angle: { from: '0', to: '360' },
                duration: 1000,
                ease: 'Linear',
                onUpdate: () => {
                    this.updateSwordPosition();
                },
                onComplete: () => {
                    this.player!.facing = 'right';
                }
            });
            this.player!.facing = 'none';
        });

        this.enemyMoveTimer = this.time.addEvent({
            delay: 1000,
            callback: this.actionEnemies,
            callbackScope: this,
            loop: true
        });
        
        EventBus.emit('current-scene-ready', this);
    }

    actionEnemies() {
        this.enemies?.getChildren().forEach((enemy: Phaser.GameObjects.GameObject, index) => {
            const x = Math.floor(Math.random() * 3) - 1;
            const y = Math.floor(Math.random() * 3) - 1;
            (enemy as any).setVelocity(x * 50, y * 50);

            // shoot
            
        });
    }

    updateSwordPosition() {
        let angle = this.sword?.angle!;
        
        let tipX = this.player?.obj.x! + swordOffset * Math.cos(Phaser.Math.DegToRad(angle));
        let tipY = this.player?.obj.y! + swordOffset * Math.sin(Phaser.Math.DegToRad(angle));
        
        this.sword!.setPosition(tipX, tipY);
    }

    update(time: number, delta: number): void {
        const cursors = this.input.keyboard!.createCursorKeys();
        this.checkSwordCollision();

        if (cursors.left.isDown)
        {
            this.player?.obj.setVelocityX(-160);
            this.player!.facing = 'left';
        }

        if (cursors.up.isDown)
        {
            this.player?.obj.setVelocityY(-160);
        }

        if (cursors.down.isDown)
        {
            this.player?.obj.setVelocityY(160);
        }

        if (cursors.right.isDown)
        {
            this.player?.obj.setVelocityX(160);
            this.player!.facing = 'right';
        }

        if (!(cursors.down.isDown || cursors.up.isDown)) {
            this.player?.obj.setVelocityY(0);
        }

        if (!(cursors.right.isDown || cursors.left.isDown)) {
            this.player?.obj.setVelocityX(0);
        }

        this.updateSword();
    }

    updateSword() {
        if (this.player?.facing === "none") return;
        switch(this.player?.facing) {
            case 'left':
                this.sword!.scaleX = 1;
                this.sword?.setX(this.player!.obj.x - swordOffset);
                break;
            case 'right':
                this.sword?.setX(this.player!.obj.x + swordOffset);
                this.sword!.scaleX = -1;
                break;
        }
        this.sword?.setY(this.player?.obj.y);
    }

    checkSwordCollision() {
        this.enemies?.getChildren().forEach((enemy: Phaser.GameObjects.GameObject, index) => {
            if (Phaser.Geom.Intersects.RectangleToRectangle(
                this.sword!.getBounds(),
                (enemy as any).getBounds()
            )) {
                console.log('Enemy hit!');
                enemy.destroy();
            }
        });
    }

    changeScene ()
    {
        this.scene.start('GameOver')
    }
}
