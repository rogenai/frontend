import { Scene } from 'phaser';
import { OtherPlayer, Player } from '../object/Player';
import { Enemy, Orc, ShooterOrc } from '../object/Enemy';
import { Entity, SpriteObject } from '../object/Entity';
import { io, Socket } from 'socket.io-client';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera | undefined;
    background: Phaser.GameObjects.Image | undefined;
    gameText: Phaser.GameObjects.Text | undefined;
    player: Player | undefined;
    entities: Entity[] = [];
    objects: Phaser.Physics.Arcade.Group | undefined;
    platforms: Phaser.Physics.Arcade.StaticGroup | undefined;
    level: number[][] = [];
    id: string = "";
    socket: Socket | undefined;
    name: string | undefined;
    playerId: string = "";

    constructor ()
    {
        super('Game');
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
        this.name = data.username;
        const token = localStorage.getItem('token');

        this.socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, { query: {
            roomId: this.id,
            token: token
        }});

        this.events.once('shutdown', () => {
            this.socket?.disconnect();
        });
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

        this.player = new Player(this, 'player', 20, 10, 0, 0, this.name!, this.playerId);

        this.socket?.on('init', (data) => {
            this.playerId = data.id;
            this.player!.x = data.spawnX;
            this.player!.y = data.spawnY;

            data.platforms.forEach((plat: any) => {
                const platform = this.platforms!.create(plat.x, plat.y, 'wall');
                platform.setSize(tilesize, tilesize);
                platform.setDisplaySize(tilesize, tilesize);
            });
            
            data.entities.forEach((entity: any) => {
                if (entity.id === this.playerId) return;

                let ent: Entity | undefined = undefined;

                if (entity.entity === 'player') {
                    console.log("Player created", entity.id, this.playerId);
                    ent = new OtherPlayer(this, 'player', 20, 10, entity.x, entity.y, entity.name, entity.id);
                }

                if (entity.entity === 'orc') {
                    ent = new Orc(this, entity.x, entity.y, entity.id);
                }

                if (entity.entity === 'ranged_orc') {
                    ent = new ShooterOrc(this, entity.x, entity.y, entity.id);
                }

                if (ent === undefined) return;

                this.entities.push(ent);
            });
            console.log(this.playerId);
        });


        this.socket?.on('action', (data) => {
            const ent = this.entities.find((e) => e.id === data.id);
            if (data.id === this.playerId) return;
            if (!ent) {
                console.log("Entity not found", data.id);
                console.log(this.entities);
                return;
            }
            ent.action(data);
        });

        this.socket?.on('join', (player) => {
            if (this.entities.some((p) => p.id === player.id)) return;
            const pl = new OtherPlayer(this, 'player', 20, 10, player.x, player.y, player.name, player.id);
            this.entities.push(pl);
        });

        this.socket?.on('leave', (player) => {
            this.entities = this.entities.filter((p) => p.id !== player.id);
        });

        this.socket?.on('data', (data) => {
            data.forEach((entity: any) => {
                if (entity.id === this.playerId) return;
                const ent = this.entities.filter((p) => p.id === entity.id)[0];
                if (ent === undefined) return;
                if (ent.type !== "player") {
                    this.tweens.add({
                        targets: ent,
                        ease: 'Expo.easeInOut',
                        x: entity.x,
                        y: entity.y,
                        duration: 700
                    });
                    return;
                }
                ent.x = entity.x;
                ent.y = entity.y;
            });
        });

        this.camera.startFollow(this.player!);
        this.camera.zoom = 2;

        this.physics.add.collider(this.objects, this.platforms, (a, b) => {
            if ((a as any).type === "bullet") {
                a.destroy();
            }
        });

        this.physics.add.overlap(this.objects, this.objects, (a, b) => {
            (a as any).collide(b);
            (b as any).collide(a);
        }, undefined, this);
    }

    update() {
        if (this.player!.health <= 0) {
            this.changeScene();
        }

        this.entities = this.entities.filter((e) => e.health > 0);
    }

    changeScene()
    {
        this.scene.start('GameOver');
    }
}
