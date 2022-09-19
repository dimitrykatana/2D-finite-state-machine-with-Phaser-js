let cursors, player, run, jump, backsound, camera;
class loading extends Phaser.Scene{
    constructor(){
        super("loadingGame");
    }
    preload (){
        // preloading assets.
        this.load.image('background', './assets/background1.png')
        this.load.image('background2', './assets/background2.png')
        this.load.image('background3', './assets/background3.png')
        this.load.audio("music", "/assets/audio/step.mp3"),
        this.load.audio("music2", "/assets/audio/jumping.mp3"),
        this.load.audio("music3", "/assets/audio/forest.mp3"),
        this.load.tilemapTiledJSON('map', './assets/map.json');
        this.load.image('tilez', './assets/oak.png')
        this.load.spritesheet("ana", "./assets/char_blue.png", {frameWidth: 56, frameHeight: 56})
    };
    create(){
        cursors = this.input.keyboard.createCursorKeys();  
        run = this.sound.add('music')
        jump = this.sound.add('music2')
        backsound = this.sound.add('music3')
        let bg = this.add.image(0, 0, 'background')
        let bg3 = this.add.image(0, 0, 'background2')
        let bg4 = this.add.image(0, 0, 'background3')
        bg.displayWidth = 79*16
        bg.displayHeight = 720
        bg3.displayWidth = 79*16
        bg3.displayHeight = 720
        bg4.displayWidth = 79*16
        bg4.displayHeight = 720
        bg.setOrigin(0)
        bg3.setOrigin(0)
        bg4.setOrigin(0)
        backsound.setLoop(true)
        backsound.play()
        
        let map = this.add.tilemap('map');
        map.heightInPixels = 720
        map.widthInPixels = 1280
	    let tileset = map.addTilesetImage('oak', 'tilez');
	    let backgroundLayer = map.createLayer('BG', [tileset], 0, 0);	
        backgroundLayer.width = WIDTH

        player = new Char(this,20,bg.displayHeight/2)
        const { body } = player;

        this.input.keyboard.on('keydown-SPACE', () =>{
            if (body.onFloor()) {
                // player can only double jump if it is on the floor
                this.canDoubleJump = true;
                body.setVelocityY(-450);
            }else if (this.canDoubleJump) {
                // player can only jump 2x (double jump)
                this.canDoubleJump = false;
                body.setVelocityY(-450);
                jump.play()
            }
        });

        player.animation()
        player.setOrigin(0,1)
        
        // creating physics and collisions
        this.physics.world.setBounds( 0, 0, 79*16, 720 );
        this.physics.add.collider(player, backgroundLayer);
        backgroundLayer.setCollisionByProperty({collides: true})
        
        // setting up the camera
        // const graphics = this.add.graphics().fillStyle(0).fillCircle(360, 360, 76).setVisible(false);
        // const mask = graphics.createGeometryMask();
        const { main } = this.cameras;
        // main.setMask(mask)
        main.startFollow(player)
        main.setZoom(1.8)
        main.setBounds(0,0,79*16,720) 
        var particles = this.add.particles("blue");

        var emitter = particles.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 1, end: 2.5 },
            tint: { start: 0xff945e, end: 0xff945e },
            speed: 1,
            accelerationY: -10,
            angle: { min: -85, max: -95 },
            rotate: { min: -180, max: 180 },
            lifespan: { min: 1000, max: 5000 },
            quantity: { min: 1, max: 3 },
            delay: 0,
            blendMode: "ADD",
            frequency: 1000,
            x: { min: 0, max: 800 },
            y: { min: 0, max: 600 }
        });      
        emitter.startFollow(player);
    };
    update(time, delta){

        player.movement()
        //running sound
        if(player.body.onFloor() === false || cursors.right.isUp && cursors.left.isUp){
            run.stop()
        }else if(run.isPlaying == false){
            run.play()
        }
    }
}