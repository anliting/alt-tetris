import constant from                './constant.mjs'
import isValidTransfer from         './isValidTransfer.mjs'
import Board from                   './Game/Board.mjs'
let initialY=[-2,-1,-1,0,-1,-1,-1]
function Game(){
    this._history=[]
    this._status={
        godChoice:[0,0,0,0,0,0,0],
    }
    this._board=new Board
}
Game.prototype._setCurrent=function(type){
    this._status.current={
        type,
        direction:0,
        x:5+Math.floor(-constant.shape[type][0].length/2),
        y:20+initialY[type],
    }
}
Game.prototype._setNext=function(next){
    if(this._status.current==undefined)
        this._setCurrent(next)
    else
        this._status.next=next
    this._status.godChoice[next]=1
    if(this._status.godChoice.reduce((a,b)=>a+b)==7)
        this._status.godChoice=[0,0,0,0,0,0,0]
    if(this._status.next==undefined)
        this.god.getNext(this._status.godChoice)
}
Game.prototype._hold=function(){
    if(typeof this._status.hold=='undefined'){
        this._status.hold=this._status.current.type
        this._getCurrent()
    }else{
        let temp=this._status.hold
        this._status.hold=this._status.current.type
        this._setCurrent(temp)
    }
}
Game.prototype._rotate=function(mode){
    /*
     *  Rotate the tetromino with given mode.
     *  Return value: Return the order of wallkick if success,
     *      otherwise return 5.
     */
    let
        dd=mode==0?-1:1,
        c=this._status.current,
        wk=constant.srsWallKick[c.type][2*c.direction+mode]
    for(let i=0;i<5;i++)
        if(this._transfer(wk[i][0],wk[i][1],dd)==0)
            return i
    return 5
}
Game.prototype._drop=function(){
    this._board.put(
        this._status.current.type,
        this._status.current.direction,
        this._status.current.x,
        this._status.current.y,
    )
    this._board.update()
    this._getCurrent()
}
Game.prototype._valid_transfer=function(dx,dy,dd){
    return isValidTransfer(this._status.current,this._board.array,dx,dy,dd)
}
Game.prototype._transfer=function(dx,dy,dd){
    if(!this._valid_transfer(dx,dy,dd))
        return 1
    this._status.current.x+=dx
    this._status.current.y+=dy
    this._status.current.direction=((this._status.current.direction+dd)%4+4)%4
    return 0
}
Game.prototype._getCurrent=function(){
    if(this._status.next==undefined)
        return
    this._setCurrent(this._status.next)
    delete this._status.next
    this.god.getNext(this._status.godChoice)
}
Game.prototype.in=function(event){
    this._history.push(event)
    switch(event[1]){
        case'setNext':
            this._setNext(event[2])
            break
        case'keyDown':
            switch(event[2]){
                case'C':
                case'c':
                    this._hold()
                break
                case'Z':
                case'z':
                    this._rotate(0)
                break
                case'ArrowUp':
                case'X':
                case'x':
                    this._rotate(1)
                break
                case'ArrowLeft':
                    this._transfer(-1,0,0)
                    break
                case'ArrowRight':
                    this._transfer(1,0,0)
                    break
                case' ':
                    while(this._transfer(0,-1,0)==0);
                    this._drop()
                    break
                case'ArrowDown':
                    this._transfer(0,-1,0)
                    break
            }
            break
        case'keyUp':
            break
    }
}
Game.prototype.to=function(t){
}
Object.defineProperty(Game.prototype,'status',{get(){
    let status=Object.create(this._status)
    status.board=this._board.array
    return status
}})
export default Game
