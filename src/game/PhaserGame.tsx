import { useEffect, useLayoutEffect, useRef} from 'react';
import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { GameOver } from './scenes/GameOver';

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainGame,
        GameOver
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: false
        }
    }
};

export const PhaserGame = ({ level }: { level: number[][] }) => {
    const game = useRef<Phaser.Game | null>(null!);

    useLayoutEffect(() =>
    {
        game.current = new Game({ ...config, parent: 'game-container' });

        
        return () =>
        {
            if (game.current)
            {
                game.current.destroy(true);
            }
        }
    }, []);

    useEffect(() => {
        window.onresize = () => {
            game.current!.scale.resize(window.innerWidth, window.innerHeight);
        };
        
        if (window) {
            if (game.current) {
                game.current!.scale.resize(window.innerWidth, window.innerHeight);
            }

            game.current!.scene.start('Game', { level });
        }
    }, []);
    
    return (
        <div id="game-container"></div>
    );
}
