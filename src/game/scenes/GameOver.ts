import { Scene } from "phaser";

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        const rect = this.add.rectangle(screenCenterX, screenCenterY, 468, 32).setStrokeStyle(1, 0xffffff);
        const text = this.add.text(screenCenterX, screenCenterY, 'Game Over', { fontSize: '24px', color: '#ffffff' }).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}