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
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var phaserGame = new Phaser.Game(config);

function preload ()
{
    this.load.image('roof', 'assets/grass.png');
}

function create ()
{
    
    this.add.image(0, 0, 'roof').setOrigin(0,0);
    var roofHeight = this.textures.get('roof').getSourceImage().height;
    var roofWidth = this.textures.get('roof').getSourceImage().width;
    // for(let i = 0; i <= 800 - roofWidth; i+=roofWidth ){
    //     for(let j = 0; j < 600 - roofHeight; j+=roofHeight){
    //         this.add.image(i, j, 'roof').setOrigin(0,0);
    //         this.add.image(i, j, 'roof');
    //         console.log("test");
    //     }
    // }
}

function update ()
{
}