class Game{
    constructor(amount, rebirth){
        this.amount = amount;
        this.rebirthCount = rebirth;
        this.data = {};
        this.start = Date.now();
        this.menu = false;
        this.lastFrame = Date.now();
        this.elapsed = 0;
        this.posX = 0;
        this.posY = 0;
    }

    init(main){
        this.initGrid(main);
        this.start = Date.now();
        this.menu = false;
        this.lastFrame = Date.now();
        this.elapsed = 0;
        this.posX = 0;
        this.posY = 0;
    }

    drawMoney(main){
        main.add.text(0, 0, this.amount + "$", { color: 'white', align: 'center', backgroundColor:'blue', padding:10 });
    }

    drawTime(main){
        main.add.text(window.innerWidth - 260, 0, "Temps de jeu : " + new Date(Date.now() - this.start).toISOString().slice(11, 19), { color: 'white', align: 'center', backgroundColor:'blue', padding:10 });
    }

    drawAttractions(main){
        for(let i = 0; i < this.data.grid.height; i++){
            console.log("Test");    
        }
    }

    drawTiles(main){
        for(let i = 0; i < this.tiles.length; i++){
            this.tiles[i].display(main, null);
        }
    }

    update(main){
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

        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                this.tiles.push(new Tile(i,j));
            }
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
    constructor(x, y){
        this.x = x;
        this.y = y;
        
        this.grassHeight = 78;
        this.grassWidth = 127;
    }

    display(main, vueX = 0, vueY = 0, zoom = 1){
        this.image = main.add.image(window.innerWidth / 2 + (this.x - this.y) * 0.5 * zoom * this.grassWidth + vueX, window.innerHeight / 2 + this.grassHeight * (0.5 * zoom * (this.y + this.x - 4)) + vueY, 'grass');
        this.image.on('pointerdown', function (){ console.log("test")});
        this.image.scaleY = zoom;
        this.image.scaleX = zoom;
    }
}

class Attraction{
    
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

}

function update ()
{
    game.update(this);
    game.render(this);
}