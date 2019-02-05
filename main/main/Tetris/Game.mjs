import Board from                   './Game/Board.mjs'
function Game(){
    this.status={
        godChoice:[0,0,0,0,0,0,0],
    }
    this.board=new Board
}
Game.prototype.start=function(){
    this.god.getNext(this.status.godChoice)
}
Game.prototype.setNext=function(next){
    if(this.status.current==undefined)
        this.status.current=next
    else
        this.status.next=next
    this.status.godChoice[next]=1
    if(this.status.godChoice.reduce((a,b)=>a+b)==7)
        this.status.godChoice=[0,0,0,0,0,0,0]
    if(this.status.next==undefined)
        this.god.getNext(this.status.godChoice)
}
export default Game
