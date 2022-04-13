class Game{
    constructor(amount, rebirth){
        this.amount = amount;
        this.rebirthCount = rebirth;
        this.data = {};
        this.start = Date.now();
        this.menu = false;
    }

    init(){
        this.initGrid();
        this.start = Date.now();
        this.menu = false;
    }

    toggleMenu(){
        if(this.menu == true){
            this.menu = false;
        }else{
            this.menu = true;
        }
    }

    setMenu(value){
        this.menu = value;
    }

    drawMoney(main){
        main.add.text(0, 0, this.amount + "$", { color: 'white', align: 'center', backgroundColor:'blue', padding:10 });
    }

    drawTest(main){
        let text = main.add.text(0,window.innerHeight - 60, "+", { color: 'white', align: 'center', backgroundColor:'blue', padding:10 }).setInteractive();
        text.on('pointerdown', function(){console.log(main)});
    }

    drawTime(main){
        main.add.text(window.innerWidth - 260, 0, "Temps de jeu : " + new Date(Date.now() - this.start).toISOString().slice(11, 19), { color: 'white', align: 'center', backgroundColor:'blue', padding:10 });
    }

    drawAttractions(main){
        for(let i = 0; i < this.data.grid.height; i++){
            console.log("Test");
        }
    }

    drawMenu(main){
        console.log("Menu");
    }

    render(main){
        this.drawMoney(main);
        this.drawAttractions(main);
        this.drawTime(main);
        this.drawTest(main);
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

    withdrow(amount){
        this.amount -= amount;
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
var game = new Game(100,0, phaserGame);

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

    let test = new Tile(0,0);
}

function update ()
{
    game.render(this);
}