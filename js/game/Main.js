class Game{
    constructor(){
        this.data = {};
        this.init();
    }

    init(main){
        // Crée les données vides
        this.data = {};
        this.start = Date.now();
        // Chargement de la sauvegarde
        this.load();
        // Initialisation de la grille du jeu
        this.initGrid(main);
        this.lastFrame = Date.now();
        this.elapsed = 0;
        // Initialisationd e la position de la caméra et du zoom
        this.posX = 0;
        this.posY = 0;
        this.scale = 1;
    }

    drawMoney(main){
        // Affichage du fond puis de la valeur de la money
        let background = main.add.image(10,10,'money-bg').setOrigin(0,0);
        background.scaleX = 0.6;
        background.scaleY = 0.6;
        main.add.text(110, 38, parseInt(this.data.amount) + "$", { color: 'white', align: 'center', fontFamily: "'Brush Script MT', cursive", fontSize: 35});
    }

    addAttraction(main, price, texture){
        if(this.data.attractions == null){
            this.data.attractions = [];
        }

        // Ajoute seulement si il y a assez d'argent
        if(this.data.amount >= price){
            // Calcul des coordonnées
            let x = Math.floor(this.data.attractions.length/5);
            let y = this.data.attractions.length % 5;

            // Ajout de l'attraction et suppression de la money
            this.data.attractions.push(new Attraction(x, y, texture));
            this.data.amount -= price;
            this.save();
            return true;
        }
        this.save();
        return false;
    }

    drawTime(main){
        // Affiche le fond derrière puis la valeur du temps de jeu
        let background = main.add.image(window.innerWidth - 270,10,'time-bg').setOrigin(0,0);
        background.scaleX = 0.6;
        background.scaleY = 0.6;
        main.add.text(window.innerWidth - 170, 38, new Date(Date.now() - this.start).toISOString().slice(11, 19), { color: 'white', align: 'center', fontFamily: "'Brush Script MT', cursive", fontSize: 35});
    }

    drawTiles(main){
        // Affichage de toutes les tuiles
        for(let i = 0; i < this.data.tiles.length; i++){
            this.data.tiles[i].display(main, this.posX, this.posY, this.scale);
        }
    }

    drawAttractions(main){
        // Affichage de toutes les attractions
        for(let i = 0; i < this.data.attractions.length; i++){
            this.data.attractions[i].display(main, this.posX, this.posY, this.scale);
        }
    }

    drawMenu(main){
        // Calcul du prix de l'attraction
        let price = (this.data.attractions.length - 1) * this.data.attractions.length * 500 + 100;
        // Affichage du menu et des attractions que l'on peut choisir
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

        // Rendre les images cliquables
        img1.on('pointerdown', function() {if(addAttraction(price, image1)) location.reload();});
        img2.on('pointerdown', function() {if(addAttraction(price, image2)) location.reload();});
    }

    drawAddButton(main){
        // Affiche le bouton
        let add = main.add.image(window.innerWidth - 50,window.innerHeight - 50,'close-button').setInteractive();
        add.rotation = Math.PI / 4;
        add.scaleX = 0.5;
        add.scaleY = 0.5;
        // Rend le bouton fonctionel
        add.on('pointerdown', function(){ openMenu()});
    }

    openMenu(){
        // Ouverture du menu, reroll des attractions achetables
        let att1 = parseInt(Math.random() * 6);
        let att2 = parseInt(Math.random() * 6);

        switch(att1){
            case 0:
                this.image1 = 'circus';
                break;
            case 1:
                this.image1 = 'bigwheel';
                break;
            case 2:
                this.image1 = 'house';
                break;
            case 3:
                this.image1 = 'tower';
                break;
            case 4:
                this.image1 = 'manege';
                break;
            default:
                this.image1 = 'carousel';
                break;
        }
        switch(att2){
            case 0:
                this.image2 = 'circus';
                break;
            case 1:
                this.image2 = 'bigwheel';
                break;
            case 2:
                this.image1 = 'house';
                break;
            case 3:
                this.image1 = 'tower';
                break;
            case 4:
                this.image1 = 'manege';
                break;
            default:
                this.image2 = 'carousel';
                break;
        }
        this.menu = true;
    }

    closeMenu(){
        this.menu = false;
    }

    update(){
        // Calculer
        this.elapsed = Date.now() - this.lastFrame;
        this.lastFrame = Date.now();
        // Ajouter 
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
        // Appel de toutes les fonctions de render
        main.add.image(960,530,'background');
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
        // Crée la grille des Tuiles
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

    showAmount(){
        console.log(this.data.amount);
    }

    save(){
        // Enregistre en localStorage le JSON des données
        localStorage.setItem('gameSave', JSON.stringify(this.data));
    }

    load(){
        // Charge les données depuis localStorage
        this.data = JSON.parse(localStorage.getItem('gameSave'));
        if(this.data == null){
            this.data = {};
            this.data.attractions = [];
            this.data.amount = 100;
        }
        // Convertis le tableau d'Attractions en Objet Attractions
        let attractions = [];
        for(let i = 0; i < this.data.attractions.length; i++){
            attractions.push(new Attraction(this.data.attractions[i].x, this.data.attractions[i].y, this.data.attractions[i].tex));
        }
        this.data.attractions = attractions;
    }
}

class Tile{
    constructor(x, y){
        this.x = x;
        this.y = y;

        this.grassHeight = 128;
        this.grassWidth = 256;
        let img = Math.floor(Math.random() * 2);
        // initialisation de la texture de la tuine
        if(img == 0){
            this.type = "ground-1";
        }else{
            this.type = "ground-2";
        }
    }

    display(main, vueX = 0, vueY = 0, zoom = 1){
        // Affichage e l'image aux bonnes coordonnées
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
        // Calcul de la valeur de l'attraction (ce que l'attraction raporte)
        this.worth = 100 * (x + 1) * (y + 1);
    }

    display(main, vueX = 0, vueY = 0, zoom = 1){
        // Affichage aux bonnes coordonnées
        let imageHeight = main.textures.get(this.tex).getSourceImage().height;
        this.image = main.add.image(window.innerWidth / 2 + (this.x - this.y) * 0.5 * zoom * 256 + vueX, window.innerHeight / 2 + 128 * (0.5 * zoom * (this.y + this.x - 4)) + vueY - (imageHeight * zoom) / 4, this.tex);
        this.image.scaleY = zoom;
        this.image.scaleX = zoom;
    }

    update(game){
        // Update (rajoute la money à game)
        game.addMoney(this.worth * game.getElapsed() / 10000);
    }
}

// Création de la configuration du jeu
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

// Initialisation des variables de game et Phaser.Game
var phaserGame = new Phaser.Game(config);
var game = new Game(100,0, phaserGame);
var music;

// Ajout des événements pour le déplacement
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

// Ajout des événements pour le zoom
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
    // Initiialisation des Sprites
    this.load.image('roller-coaster', 'assets/roller-coaster.png');
    this.load.image('carousel', 'assets/carousel.png');
    this.load.image('circus', 'assets/circus.png');
    this.load.image('bigwheel', 'assets/bigwheel.png');
    this.load.image('house', 'assets/house.png');
    this.load.image('tower', 'assets/tower.png');
    this.load.image('manege', 'assets/manege.png');

    this.load.image('money-bg', 'assets/money-bg.png');
    this.load.image('time-bg', 'assets/time-bg.png');
    this.load.image('menu-bg', 'assets/menu-bg.png');
    this.load.image('close-button', 'assets/close_button.png');

    this.load.image('sub-title', 'assets/sub-title.png');

    this.load.image('ground-1', 'assets/ground-1.png');
    this.load.image('ground-2', 'assets/ground-2.png');

    this.load.image('background', 'assets/background.jpg')

    this.load.audio('music', ["sounds/main.mp3", "sounds/main.ogg"]);

    // Initilisation de la game
    game.init(this);
}

function create ()
{
     
    //Lecture de musique
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

// Fonctions à appeller dans les event
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
    // Fonction update de phaser (appelée à chaque Frame)
    this.add.displayList.removeAll();
    game.update();
    game.render(this);
    game.save();
}

function clear(){
    // Réinitialisation de la partie
    localStorage.clear();
    game.load();
    location.reload();
}
