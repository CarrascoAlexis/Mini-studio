class Game{
    constructor(amount, rebirth){
        this.amount = amount;
        this.rebirthCount = rebirth;
        this.data = {};
    }

    getMoney(){
        return this.amount;
    }

    addMoney(amount){
        this.amount += (this.rebirthCount + 1) / 10 * amount;
    }

    rebirth(){
        this.rebirthCount ++;
    }

    showAmount(){
        console.log(this.amount);
    }

    save(){
        localStorage.setItem('gameSave', JSON.stringify(this.data));
    }

    load(){
        this.data = JSON.parse(localStorage.getItem('gameSave'));
    }
}

class Tile{
    constructor(x,y){

    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var phaserGame = new Phaser.Game(config);

function preload ()
{
    this.load.image('grass', 'assets/grass.png');
}

function create ()
{
    var grassHeight = this.textures.get('grass').getSourceImage().height;
    var grassWidth = this.textures.get('grass').getSourceImage().width;

    this.add.image(window.innerWidth / 2, window.innerHeight / 2 - grassHeight * 2, 'grass');
    this.add.image(window.innerWidth / 2 + grassWidth * 0.5, window.innerHeight / 2 - grassHeight * 1.5 -5, 'grass');
}

function update ()
{
}