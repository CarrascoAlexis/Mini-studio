class Game{
    constructor(){
        this.data = {};
        this.init();
    }

    init(main){
        this.data = {};
        this.start = Date.now();
        this.load();
        this.initGrid(main);
        this.lastFrame = Date.now();
        this.elapsed = 0;
        this.posX = 0;
        this.posY = 0;
        this.scale = 1;
        this.texs = ['']
    }

    drawMoney(main){
        let background = main.add.image(10,10,'money-bg').setOrigin(0,0);
        background.scaleX = 0.6;
        background.scaleY = 0.6;
        main.add.text(110, 38, parseInt(this.data.amount) + "$", { color: 'white', align: 'center', fontFamily: "'Brush Script MT', cursive", fontSize: 35});
    }

    addAttraction(main, price, texture){
        if(this.data.attractions == null){
            this.data.attractions = [];
        }

        if(this.data.amount >= price){
            let x = Math.floor(this.data.attractions.length/5);
            let y = this.data.attractions.length % 5;

            this.data.attractions.push(new Attraction(x, y, texture));
            this.data.amount -= price;
            this.save();
            return true;
        }
        this.save();
        return false;
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

    drawAttractions(main){
        for(let i = 0; i < this.data.attractions.length; i++){
            this.data.attractions[i].display(main, this.posX, this.posY, this.scale);
        }
    }

    drawMenu(main){
        let price = (this.data.attractions.length - 1) * this.data.attractions.length * 500 + 100;
        main.add.image(window.innerWidth / 2, window.innerHeight / 2, 'menu-bg');
        let height = main.textures.get('menu-bg').getSourceImage().height;
        let width = main.textures.get('menu-bg').getSourceImage().width;
        let close = main.add.image(window.innerWidth / 2 + width / 2, window.innerHeight / 2 - height / 2, 'close-button').setInteractive();
        close.scaleX = 0.5;
        close.scaleY = 0.5;
        main.add.text(window.innerWidth / 2 - 150,200,"Prix de l'amélioration : " + price + "$", { color: 'white', align: 'center', fontFamily: "'Brush Script MT', cursive", fontSize: 35});
        close.on('pointerdown', function(){ closeMenu()})

        let img1 = main.add.image(window.innerWidth / 2 - width / 4, window.innerHeight / 2, this.image1).setInteractive();
        let img2 = main.add.image(window.innerWidth / 2 + width / 4, window.innerHeight / 2, this.image2).setInteractive();

        let image1 = this.image1;
        let image2 = this.image2;

        img1.on('pointerdown', function() {if(addAttraction(price, image1)) location.reload();})
        img2.on('pointerdown', function() {if(addAttraction(price, image2)) location.reload();})

    }

    drawAddButton(main){
        let add = main.add.image(window.innerWidth - 50,window.innerHeight - 50,'close-button').setInteractive();
        add.rotation = Math.PI / 4;
        add.scaleX = 0.5;
        add.scaleY = 0.5;
        // add.on('pointerdown', function(){ this.openMenu();})
        add.on('pointerdown', function(){ openMenu()});
    }

    openMenu(){
        let att1 = parseInt(Math.random() * 3);
        let att2 = parseInt(Math.random() * 3);

        switch(att1){
            case 0:
                this.image1 = 'circus';
                break;
            case 1:
                this.image1 = 'bigwheel';
                break;
            default:
                this.image1 = 'carousel';
                break;
        }
        switch(att2){
            case 0:{
                this.image2 = 'circus';
                break;
            }
            case 1:{
                this.image2 = 'bigwheel';
                break;
            }
            default:{
                this.image2 = 'carousel';
                break;
            }
        }
        this.menu = true;
    }

    closeMenu(){
        this.menu = false;
    }

    update(){
        this.elapsed = Date.now() - this.lastFrame;
        this.lastFrame = Date.now();
        for(let i = 0; i < this.data.attractions.length; i++){
            let value = this.data.attractions[i].worth * this.elapsed / 10000;
            this.data.amount += value;
        }
        if(this.data.attractions.length == 25){
            clear();
        }
    }

    getElapsed(){
        return this.elapsed;
    }

    render(main){
        this.drawTiles(main);
        this.drawAttractions(main);
        this.drawMoney(main);
        this.drawTime(main);
        this.drawAddButton(main);
        if(this.menu == true){
            this.drawMenu(main);
        }
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
        if(this.data == null){
            this.data = {};
            this.data.attractions = [];
            this.data.amount = 100;
        }
        let attractions = [];
        for(let i = 0; i < this.data.attractions.length; i++){
            attractions.push(new Attraction(this.data.attractions[i].x, this.data.attractions[i].y, this.data.attractions[i].tex));
        }
        this.data.attractions = attractions;

        this.time = localStorage.getItem
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
    constructor(x, y, texture){
        this.x = x;
        this.y = y;
        this.tex = texture;
        this.worth = 100 * (x + 1) * (y + 1);
    }

    display(main, vueX = 0, vueY = 0, zoom = 1){
        let imageHeight = main.textures.get(this.tex).getSourceImage().height;
        this.image = main.add.image(window.innerWidth / 2 + (this.x - this.y) * 0.5 * zoom * 256 + vueX, window.innerHeight / 2 + 128 * (0.5 * zoom * (this.y + this.x - 4)) + vueY - (imageHeight * zoom) / 4, this.tex);
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
        disableWebAudio: true
    }
};

var phaserGame = new Phaser.Game(config);
var game = new Game(100,0, phaserGame);
var music;

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
    this.load.image('roller-coaster', 'assets/roller-coaster.png');
    this.load.image('carousel', 'assets/carousel.png');
    this.load.image('circus', 'assets/circus.png');
    this.load.image('bigwheel', 'assets/bigwheel.png');
    this.load.image('house', 'assets/house.png');
    this.load.image('tower', 'assets/tower.png');

    this.load.image('money-bg', 'assets/money-bg.png');
    this.load.image('time-bg', 'assets/time-bg.png');
    this.load.image('menu-bg', 'assets/menu-bg.png');
    this.load.image('close-button', 'assets/close_button.png');

    this.load.image('sub-title', 'assets/sub-title.png');

    this.load.image('ground-1', 'assets/ground-1.png');
    this.load.image('ground-2', 'assets/ground-2.png');

    this.load.audio('music', ["sounds/main.mp3", "sounds/main.ogg"]);

    game.init(this);
}

function create ()
{
  this.music= this.sound.add("music");

  var musicConfig = {
    mute:false,
    volume:100,
    rate:1,
    detune:0,
    seek:0,
    loop:true,
    delay:0
  }
  this.music.play(musicConfig);
}

function openMenu(){
    game.openMenu();
}
function closeMenu(){
    game.closeMenu();
}
function addAttraction(price, texture){
    return game.addAttraction(this, price, texture);
}

function update ()
{
    this.add.displayList.removeAll();
    game.update();
    game.render(this);
    game.save();
}

function clear(){
    localStorage.clear();
    game.load();
    location.reload();
}
