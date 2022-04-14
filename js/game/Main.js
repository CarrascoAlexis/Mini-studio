class Game{
    constructor(amount, rebirth){
        this.data = {};
        this.data.amount = amount;
        this.data.rebirthCount = rebirth;
    }

    init(main){
        this.initGrid(main);
        this.start = Date.now();
        this.lastFrame = Date.now();
        this.elapsed = 0;
        this.posX = 0;
        this.posY = 0;
        this.scale = 1;
        this.data.visitorSatisfaction = 1;
    }

    drawMoney(main){
        let background = main.add.image(10,10,'money-bg').setOrigin(0,0);
        background.scaleX = 0.6;
        background.scaleY = 0.6;
        main.add.text(110, 38, parseInt(this.data.amount) + "$", { color: 'white', align: 'center', fontFamily: "'Brush Script MT', cursive", fontSize: 35});
    }

    drawTime(main){
        let background = main.add.image(window.innerWidth - 270,10,'time-bg').setOrigin(0,0);
        background.scaleX = 0.6;
        background.scaleY = 0.6;
        main.add.text(window.innerWidth - 170, 38, new Date(Date.now() - this.start).toISOString().slice(11, 19), { color: 'white', align: 'center', fontFamily: "'Brush Script MT', cursive", fontSize: 35});
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
        this.drawTiles(main);
        this.drawMoney(main);   
        this.drawTime(main);
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
        this.data.amount += (this.data.rebirthCount + 1) / 10 * amount * this.data.visitorSatisfaction;
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
        
        this.grassHeight = 128;
        this.grassWidth = 256;
        let img = Math.floor(Math.random() * 2);
        if(img == 0){
            this.type = "ground-1";
        }else{
            this.type = "ground-2";
        }
    }

    setType(type){
        this.type = type;
    }

    display(main, vueX = 0, vueY = 0, zoom = 1){
        this.image = main.add.image(window.innerWidth / 2 + (this.x - this.y) * 0.5 * zoom * this.grassWidth + vueX, window.innerHeight / 2 + this.grassHeight * (0.5 * zoom * (this.y + this.x - 4)) + vueY, this.type);
        this.image.scaleY = zoom;
        this.image.scaleX = zoom;
    }
}

class Attraction{
    constructor(x,y,type, texture){
        this.x = x;
        this.y = y;
        this.type = type;
        this.texture = texture;
        this.worth = 100 * (x + 1) * (y + 1);
    }

    display(main, vueX = 0, vueY = 0, zoom = 1){
        this.image = main.add.image(window.innerWidth / 2 + (this.x - this.y) * 0.5 * zoom * this.grassWidth + vueX, window.innerHeight / 2 + this.grassHeight * (0.5 * zoom * (this.y + this.x - 4)) + vueY, this.texture);
        this.image.scaleY = zoom;
        this.image.scaleX = zoom;
    }

    update(game){
        game.addMoney(this.worth * game.getElapsed() / 10000);
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

let test = new Attraction(0,0, "coaster", "roller-coaster");


function preload ()
{
    this.load.image('roller-coaster', 'assets/roller-coaster.png');
    this.load.image('carousel', 'assets/carousel.png');

    this.load.image('money-bg', 'assets/money-bg.png');
    this.load.image('time-bg', 'assets/time-bg.png');

    this.load.image('sub-title', 'assets/sub-title.png');

    this.load.image('ground-1', 'assets/ground-1.png');
    this.load.image('ground-2', 'assets/ground-2.png');

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
    test.update(game);
}