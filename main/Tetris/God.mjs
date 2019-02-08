function God(){
}
God.prototype.getNext=function(choice){
    let a=~~(Math.random()*(7-choice.reduce((a,b)=>a+b)))
    for(let i=0;i<7;i++)
        if(choice[i])
            a++
        else if(i==a)
            this.game.setNext(i)
}
export default God
