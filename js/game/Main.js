class Game{
    constructor(amount, rebirth){
        this.amount = amount;
        this.rebirthCount = rebirth;
        this.data = {};
        this.start = Date.now();
        this.menu = false;
        this.lastFrame = Date.now();
        this.elapsed = 0;
    }

    init(main){
        this.initGrid(main);
        this.start = Date.now();
        this.menu = false;
        this.lastFrame = Date.now();
        this.elapsed = 0;
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
        //text.on('pointerdown', game.toggleMenu);
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

    drawTiles(main){
        for(let i = 0; i < this.tiles.length; i++){
            this.tiles[i].display(main, 'carousel');
        }
    }

    update(){
        this.elapsed = Date.now() - this.lastFrame;
        this.lastFrame = Date.now();
    }

    getElapsed(){
        return this.elapsed;
    }

    render(main){
        this.drawMoney(main);
        this.drawAttractions(main);
        this.drawTime(main);
        this.drawTiles(main);
    }

    initGrid(main){
        this.data.grid = {};
        this.tiles = [];

        var grassHeight = 78;
        var grassWidth = 127;

        this.tiles.push(new Tile(window.innerWidth / 2, window.innerHeight / 2 - grassHeight * 2));
        this.tiles.push(new Tile(window.innerWidth / 2 + grassWidth * 0.5, window.innerHeight / 2 - grassHeight * 1.5));
        this.tiles.push(new Tile(window.innerWidth / 2 + grassWidth * 1, window.innerHeight / 2 - grassHeight));
        this.tiles.push(new Tile(window.innerWidth / 2 + grassWidth * 1.5, window.innerHeight / 2 - grassHeight * 0.5));
        this.tiles.push(new Tile(window.innerWidth / 2 + grassWidth * 2, window.innerHeight / 2));

        this.tiles.push(new Tile(window.innerWidth / 2 - grassWidth * 0.5, window.innerHeight / 2 - grassHeight * 1.5));
        this.tiles.push(new Tile(window.innerWidth / 2, window.innerHeight / 2 - grassHeight * 1));
        this.tiles.push(new Tile(window.innerWidth / 2 + grassWidth * 0.5, window.innerHeight / 2 - grassHeight * 0.5));
        this.tiles.push(new Tile(window.innerWidth / 2 + grassWidth * 1, window.innerHeight / 2));
        this.tiles.push(new Tile(window.innerWidth / 2 + grassWidth * 1.5, window.innerHeight / 2 + grassHeight * 0.5));
    
        this.tiles.push(new Tile(window.innerWidth / 2 - grassWidth * 1, window.innerHeight / 2 - grassHeight * 1));
        this.tiles.push(new Tile(window.innerWidth / 2 - grassWidth * 0.5, window.innerHeight / 2 - grassHeight * 0.5));
        this.tiles.push(new Tile(window.innerWidth / 2, window.innerHeight / 2));
        this.tiles.push(new Tile(window.innerWidth / 2 + grassWidth * 0.5, window.innerHeight / 2 + grassHeight * 0.5));
        this.tiles.push(new Tile(window.innerWidth / 2 + grassWidth * 1, window.innerHeight / 2 + grassHeight));
    
        this.tiles.push(new Tile(window.innerWidth / 2 - grassWidth * 1.5, window.innerHeight / 2 - grassHeight * 0.5));
        this.tiles.push(new Tile(window.innerWidth / 2 - grassWidth * 1, window.innerHeight / 2));
        this.tiles.push(new Tile(window.innerWidth / 2 - grassWidth * 0.5, window.innerHeight / 2 + grassHeight * 0.5));
        this.tiles.push(new Tile(window.innerWidth / 2, window.innerHeight / 2 + grassHeight));
        this.tiles.push(new Tile(window.innerWidth / 2 + grassWidth * 0.5, window.innerHeight / 2 + grassHeight * 1.5));
    
        this.tiles.push(new Tile(window.innerWidth / 2 - grassWidth * 2, window.innerHeight / 2));
        this.tiles.push(new Tile(window.innerWidth / 2 - grassWidth * 1.5, window.innerHeight / 2 + grassHeight * 0.5));
        this.tiles.push(new Tile(window.innerWidth / 2 - grassWidth, window.innerHeight / 2 + grassHeight * 1));
        this.tiles.push(new Tile(window.innerWidth / 2 - grassWidth * 0.5, window.innerHeight / 2 + grassHeight * 1.5));
        this.tiles.push(new Tile(window.innerWidth / 2, window.innerHeight / 2 + grassHeight * 2));
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
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    display(main, attraction){
        main.add.image(this.x,this.y, 'grass');
        if(attraction != null){
            main.add.image(this.x - 20, this.y, attraction);
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
    this.load.image('roller-coaster', 'assets/roller-coaster.png');
    this.load.image('carousel', 'assets/carousel.png');

    game.init(this);
}

function create ()
{

    var tuiles = [];




    let test = new Tile(0,0);
}

function update ()
{
    game.render(this);
}