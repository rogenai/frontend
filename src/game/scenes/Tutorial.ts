import { Scene } from 'phaser';
import { OtherPlayer, Player, TutorialPlayer } from '../object/Player';
import { Enemy, Orc, ShooterOrc } from '../object/Enemy';
import { Entity, SpriteObject } from '../object/Entity';
import axiosInstance from '@/src/app/axiosInstance';

export class Tutorial extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera | undefined;
    background: Phaser.GameObjects.Image | undefined;
    gameText: Phaser.GameObjects.Text | undefined;
    player: TutorialPlayer | undefined;
    entities: Entity[] = [];
    objects: Phaser.Physics.Arcade.Group | undefined;
    platforms: Phaser.Physics.Arcade.StaticGroup | undefined;
    level: number[][] = [];
    id: string = "";
    ruleText: Phaser.GameObjects.Text | undefined;

    constructor ()
    {
        super('Tutorial');
    }

    preload() {
        this.load.spritesheet('orc_idle', 'assets/orc.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('orc_walk', 'assets/orc_walk.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('orc_attack', 'assets/orc_attack.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('sorc_idle', 'assets/sorc.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('sorc_walk', 'assets/sorc_walk.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('player_walk', 'assets/player_walk.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 7 });
        this.load.spritesheet('player_idle', 'assets/player_idle.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('player_attack1', 'assets/player_attack1.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('player_attack2', 'assets/player_attack2.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5 });
        this.load.spritesheet('player_attack3', 'assets/player_attack3.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 8 });
    }
    
    init(data: any) {
        this.id = data.id;
        this.level = data.level;
    }

    create()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#3d3d3d');
        
        this.platforms = this.physics.add.staticGroup();
        this.objects = this.physics.add.group();

        const tilesize = 30;
        const offset = 0;

        this.anims.create({
            key: 'orc_idle',
            frames: this.anims.generateFrameNumbers('orc_idle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'orc_walk',
            frames: this.anims.generateFrameNumbers('orc_walk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'orc_attack',
            frames: this.anims.generateFrameNumbers('orc_attack', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        })

        this.anims.create({
            key: 'sorc_idle',
            frames: this.anims.generateFrameNumbers('sorc_idle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'sorc_walk',
            frames: this.anims.generateFrameNumbers('sorc_walk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'player_walk',
            frames: this.anims.generateFrameNumbers('player_walk', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'player_attack1',
            frames: this.anims.generateFrameNumbers('player_attack1', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        })
        
        this.anims.create({
            key: 'player_attack2',
            frames: this.anims.generateFrameNumbers('player_attack2', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        })

        this.anims.create({
            key: 'player_attack3',
            frames: this.anims.generateFrameNumbers('player_attack3', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: 0
        })

        
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++)
            {
                const floor = this.add.image(j * tilesize + offset, i * tilesize + offset, 'floor');
                floor.setDisplaySize(tilesize, tilesize);
            }
        }  

        for (let i = 0; i < this.level.length; i++) {
            for (let j = 0; j < this.level[i].length; j++) {
                if (this.level[i][j] === 1) {
                    const enemy = new Orc(this, i * tilesize + offset, j * tilesize + offset, "orcID");
                }
                if (this.level[i][j] === 2) {
                    const platform = this.platforms!.create(i * tilesize + offset, j * tilesize + offset, 'wall');
                    platform.setSize(tilesize, tilesize);
                    platform.setDisplaySize(tilesize, tilesize);
                    console.log("Platform", i * tilesize + offset, j * tilesize + offset);
                }

                if (this.level[i][j] === 3) {
                    this.player = new TutorialPlayer(this, 'player', 20, 10, i * tilesize + offset, j * tilesize + offset, "Player", "playerID");
                }

                if (this.level[i][j] === 4) {
                    const enemy = new ShooterOrc(this, i * tilesize + offset, j * tilesize + offset, "shooterID");
                }
            }
        }

        if (!this.player) {
            this.player = new TutorialPlayer(this, 'player', 20, 10, 0, 0, "Player", "playerID");
            console.log(this.level);
            console.log(this.id);
        }
        
        this.camera.startFollow(this.player!);
        this.camera.zoom = 2;

        this.physics.add.collider(this.objects, this.platforms, (a, b) => {
            if ((a as any).type === "bullet") {
                a.destroy();
            }
        });
        
        this.ruleText = this.add.text(10, 10, "WASD - for moving\nMouse Left Click - for attacking\nESC - for leaving to main page", { fontSize: '8px', color: '#fff', resolution: 2 });

        this.physics.add.overlap(this.objects, this.objects, (a, b) => {
            (a as any).collide(b);
            (b as any).collide(a);
        }, undefined, this);
    }

    update() {
        this.ruleText!.x = this.player!.x - 50;
        this.ruleText!.y = this.player!.y - 50;


        if (this.player!.health <= 0) {
            this.changeScene();
        }
    }
    

    changeScene()
    {
        this.scene.start('GameOver');
    }
}
