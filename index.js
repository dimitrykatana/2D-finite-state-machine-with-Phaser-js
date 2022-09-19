// class Button extends Phaser.GameObjects.GameObjectFactory{
//     constructor(x, y, name, scene) {
//         //it works if I call scene in the super. But I still don't know why
//         super(scene)
//     const button = scene.add.text(x, y, name, scene);
//     button.setStyle({ backgroundColor: 'transparent', fontSize: 36})
//     button.setOrigin(0)
//       .setInteractive({ useHandCursor: true })
//       .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
//       .on('pointerout', () => button.setStyle({ fill: '#FFF'}))
//     return button;
//     // If I only use return without the super it works. If I use the super without the return, it
//     //wont change scenes

// };
// };

const WIDTH = 1280
const HEIGHT = 720

const config = {        
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    pixelArt: true,
    antialias: true,
    autoRound: true,
    roundPixels: true,
    scene: [loading],
    scale: {
        mode: Phaser.Scale.FIT,
        
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          // debug : true
        }
      }
};
let game = new Phaser.Game(config);