var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default:"arcade",
        arcade: {
            gravity: {y: 0}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player;
var playerTwo
var cursors;

function preload (){
    this.load.image('blob', '../images/blobimg');
}

function create (){
    player = this.physics.add.sprite(100, 100, 'blob');
    player.setBounce(0.2);

    playerTwo = this.physics.add.sprite(300, 300, 'blob');
    playerTwo.setBounce(0.2);
    cursors = this.input.keyboard.createCursorKeys();

    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    player.body.collideWorldBounds = true;
    playerTwo.body.collideWorldBounds = true;

}

function update() {

    this.game.physics.arcade.collide(player, playerTwo);

    if(cursors.left.isDown){
        player.setVelocityX(-160);
    }
    else if(cursors.right.isDown){
        player.setVelocityX(160);
    }
    else{
        player.setVelocityX(0);
    }
    if(cursors.up.isDown){
        player.setVelocityY(-160);
    }
    else if(cursors.down.isDown){
        player.setVelocityY(160);
    }
    else{
        player.setVelocityY(0);
    }

    if(this.key_A.isDown){
        playerTwo.setVelocityX(-160);
    }
    else if(this.key_D.isDown){
        playerTwo.setVelocityX(160);
    }
    else{
        playerTwo.setVelocityX(0);
    }
    if(this.key_W.isDown){
        playerTwo.setVelocityY(-160);
    }
    else if(this.key_S.isDown){
        playerTwo.setVelocityY(160);
    }
    else{
        playerTwo.setVelocityY(0);
    }
}