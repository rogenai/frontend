"use client"
import { useEffect, useLayoutEffect, useRef} from 'react';
import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { AUTO, Game } from 'phaser';
import { Preloader, TutorialPreloader } from './scenes/Preloader';
import { GameOver } from './scenes/GameOver';
import { Tutorial } from './scenes/Tutorial';

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
        GameOver,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: false
        }
    }
};

const tutorialConfig: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        TutorialPreloader,
        Tutorial,
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

export const PhaserGame = ({ level, id, username }: { level: number[][], id: string, username: string }) => {
    const game = useRef<Phaser.Game | null>(null!);
    
    useLayoutEffect(() =>
    {
        game.current = new Game({ ...(id === "tutorial" ? tutorialConfig : config), parent: 'game-container' });

        
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

            if (id === 'tutorial') {
                game.current!.scene.start('Tutorial', { level, id });
            }
            else {
                game.current!.scene.start('Game', { level, id, username });
            }
        }
    }, []);
    
    return (
        <div id="game-container"></div>
    );
}
