class Game{
    constructor(amount, rebirth){
        this.data = {};
        this.data.amount = amount;
        this.data.rebirthCount = rebirth;
        this.start = Date.now();
        this.lastFrame = Date.now();
        this.elapsed = 0;
        this.posX = 0;
        this.posY = 0;
        this.scale = 1;
        this.visitorSatisfaction = 1;
    }

    init(main){
        this.initGrid(main);
        this.start = Date.now();
        this.menu = false;
        this.lastFrame = Date.now();
        this.elapsed = 0;
        this.posX = 0;
        this.posY = 0;
        this.scale = 1;
        this.visitorSatisfaction = 1;
    }

    drawMoney(main){
        main.add.text(0, 0, this.data.amount + "$", { color: 'white', align: 'center', backgroundColor:'blue', padding:10 });
    }

    drawTime(main){
        main.add.text(window.innerWidth - 260, 0, "Temps de jeu : " + new Date(Date.now() - this.start).toISOString().slice(11, 19), { color: 'white', align: 'center', backgroundColor:'blue', padding:10 });
    }

    drawTiles(main){
        for(let i = 0; i < this.data.tiles.length; i++){
            this.data.tiles[i].display(main, this.posX, this.posY, this.scale);
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
        this.drawTime(main);
        this.drawTiles(main);
    }

    initGrid(main){
        this.data.tiles = [];

        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                this.data.tiles.push(new Tile(i,j));
            }
        }
    }

    getMoney(){
        return this.data.amount;
    }

    addMoney(amount){
        this.data.amount += (this.data.rebirthCount + 1) / 10 * amount;
    }

    withdrow(amount){
        this.data.amount -= amount;
    }

    rebirth(){
        this.data.rebirthCount ++;
    }

    showAmount(){
        console.log(this.data.amount);
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

        this.type = "default";
    }

    setType(type){
        this.type = type;
    }

    display(main, vueX = 0, vueY = 0, zoom = 1){
        this.image = main.add.image(window.innerWidth / 2 + (this.x - this.y) * 0.5 * zoom * this.grassWidth + vueX, window.innerHeight / 2 + this.grassHeight * (0.5 * zoom * (this.y + this.x - 4)) + vueY, this.type);
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
    },
    audio: {
        disableWebAudio: true,
        noAudio: true
    }
};

var phaserGame = new Phaser.Game(config);
var game = new Game(100,0, phaserGame);

document.addEventListener("keypress", function(event) {
	switch(event.key){
        case "d":{
            game.posX -= 10;
            break;
        }
        case "q":{
            game.posX += 10;
            break;
        }
        case "s":{
            game.posY -= 10;
            break;
        }
        case "z":{
            game.posY += 10;
            break;
        }
    }
});
document.addEventListener("wheel", function(event) {
    if(event.deltaY < 0){
        game.scale += 0.1;
    }
    if(event.deltaY > 0){
        game.scale -= 0.1;
    }
});


function preload ()
{
    this.load.image('default', 'assets/grass.png');
    this.load.image('roller-coaster', 'assets/roller-coaster.png');
    this.load.image('carousel', 'assets/carousel.png');

    this.load.audio('music', 'sounds/main.mp3');

    game.init(this);
}

function create ()
{
}

function update ()
{
    this.add.displayList.removeAll();
    game.update(this);
    game.render(this);
}