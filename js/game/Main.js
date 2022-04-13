class Game{
    constructor(amount, rebirth, main){
        this.amount = amount;
        this.rebirthCount = rebirth;
        this.data = {};
        this.main = main;
    }

    init(){
        this.initGrid();
    }

    drawMoney(){
        // let text = this.amount + "$"; 
        this.main.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    }

    update(){
        this.drawMoney();
    }

    initGrid(){
        this.data.grid = {};
        for(let i = 1; i <= 5; i++){
            
        }
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
    constructor(x, y, main){
        this.x = x;
        this.y = y;
        this.main = main;
    }

    display(attraction){
        this.main.add.image(this.x,this.y,'grass');
        if(attraction != null){
            console.log("y'a une attraction en : " + this.x + " par " + this.y);
        }
    }
}

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
var game = new Game(100,0, this);

function preload ()
{
    this.load.image('grass', 'assets/grass.png');

    game.init();
}

function create ()
{
    var grassHeight = this.textures.get('grass').getSourceImage().height;
    var grassWidth = this.textures.get('grass').getSourceImage().width;

    var tuiles = [];



    tuiles.push(this.add.image(window.innerWidth / 2, window.innerHeight / 2 - grassHeight * 2, 'grass'));

    this.add.image(window.innerWidth / 2 + grassWidth * 0.5, window.innerHeight / 2 - grassHeight * 1.5, 'grass');
    this.add.image(window.innerWidth / 2 + grassWidth * 1, window.innerHeight / 2 - grassHeight, 'grass');
    this.add.image(window.innerWidth / 2 + grassWidth * 1.5, window.innerHeight / 2 - grassHeight * 0.5, 'grass');
    this.add.image(window.innerWidth / 2 + grassWidth * 2, window.innerHeight / 2, 'grass');

    this.add.image(window.innerWidth / 2 - grassWidth * 0.5, window.innerHeight / 2 - grassHeight * 1.5, 'grass');
    this.add.image(window.innerWidth / 2, window.innerHeight / 2 - grassHeight * 1, 'grass');
    this.add.image(window.innerWidth / 2 + grassWidth * 0.5, window.innerHeight / 2 - grassHeight * 0.5, 'grass');
    this.add.image(window.innerWidth / 2 + grassWidth * 1, window.innerHeight / 2, 'grass');
    this.add.image(window.innerWidth / 2 + grassWidth * 1.5, window.innerHeight / 2 + grassHeight * 0.5, 'grass');

    this.add.image(window.innerWidth / 2 - grassWidth * 1, window.innerHeight / 2 - grassHeight * 1, 'grass');
    this.add.image(window.innerWidth / 2 - grassWidth * 0.5, window.innerHeight / 2 - grassHeight * 0.5, 'grass');
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'grass');
    this.add.image(window.innerWidth / 2 + grassWidth * 0.5, window.innerHeight / 2 + grassHeight * 0.5, 'grass');
    this.add.image(window.innerWidth / 2 + grassWidth * 1, window.innerHeight / 2 + grassHeight, 'grass');

    this.add.text(0,0,"test", {color:white});

    let test = new Tile(0,0,this);
}

function update ()
{
    game.update();
}