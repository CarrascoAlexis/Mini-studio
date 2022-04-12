export default class Game{
    constructor(amount, rebirth){
        this.amount = amount;
        this.rebirth = rebirth;
    }

    getMoney(){
        return this.amount;
    }

    addMoney(amount){
        this.amount += (this.rebirth + 1) * amount;
    }

    rebirth(){
        this.rebirth ++;
    }

    showAmount(){
        console.log(this.amount);
    }
}