class Char extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y  ){
    super(scene, x, y)
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(1.5)
    .setCollideWorldBounds(true)
    .setGravityY(980)
    this.body
    .setSize(24,32,true)
    .setOffset(16,24)
    this.body.drag.x = 0.0012
    this.body.useDamping = true
    }
  animation(){

    const frame = 7.5; 
    const DUREE = 600;
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('ana', { frames: [16, 17, 18, 19, 20, 21, 22, 23] }),
      duration: DUREE,
    });
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('ana', { start: 24, end: 36 }),
      duration: 1200,
      repeatCounter:0
    });
    this.anims.create({
      key: 'standing',
      frames: this.anims.generateFrameNumbers('ana', { start:0, end: 5 }),
      frameRate: frame,
    });
    this.anims.create({
      key: 'hit',
      frames: this.anims.generateFrameNumbers('ana', { start: 8, end: 13}),
      duration: DUREE
    });
    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNumbers('ana', { start: 34, end: 36}),
      duration: 600
    });    
    // this.input.on()
  }
  movement(){
    const speed = 150;
    const { left, right, down } = cursors;

    // I prefer not setting velocity at the beginning. 
    //It deletes the deceleration movement and so decreases smoothness.
    if(left.getDuration()> 125) {
      this.flipX = 180;
      this.body.setVelocityX(-speed);       
      //playing animation on appropriate times
      if(this.body.onFloor() == true){
        this.anims.play('left', true)
      }else{
        this.anims.play("jump", true)
      }
    }else if(right.getDuration()/1000 > 0.125) {
      this.flipX = 0
      this.body.setVelocityX(speed);
      //playing animation on appropriate times
      if(this.body.onFloor() == true){
        this.anims.play("left", true)
      }else{
        this.anims.play("jump", true)
      }
    }else{
      if(this.body.onFloor() == false) {
        this.anims.play("fall", true)
      }else{
        if(down.isDown) {
          this.anims.play('hit', true)
        }else{
          this.anims.play('standing', true)
        }
      }
    }
  }
}