import Board from                   './Game/Board.mjs'
import constant from                '../constant.mjs'
let initialY=[-2,-1,-1,0,-1,-1,-1]
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
        this.status.current={
            type:next,
            direction:0,
            x:5+~~(-constant.shape[next][0].length/2),
            y:20+initialY[next],
        }
    else
        this.status.next=next
    this.status.godChoice[next]=1
    if(this.status.godChoice.reduce((a,b)=>a+b)==7)
        this.status.godChoice=[0,0,0,0,0,0,0]
    if(this.status.next==undefined)
        this.god.getNext(this.status.godChoice)
}
export default Game
