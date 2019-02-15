import constant from                './constant.mjs'
import isValidTransfer from         './isValidTransfer.mjs'
import Board from                   './Game/Board.mjs'
import _to from                     './Game/_to.mjs'
import _processEvent from           './Game/_processEvent.mjs'
let initialY=[-2,-1,-1,0,-1,-1,-1]
function Game(){
    this._status={
        godChoice:[0,0,0,0,0,0,0],
        key:{},
        down:{
            mode:'gravity',
        },
    }
    this._board=new Board
}
Game.prototype._checkLand=function(t){
    let land=!this._isValidTransfer(0,-1,0)
    if(!!this._status.land==land)
        return
    this._status.land=this._status.land?undefined:{time:t}
}
Game.prototype._drop=function(t){
    this._set.board=1
    this._board.put(
        this._status.current.type,
        this._status.current.direction,
        this._status.current.x,
        this._status.current.y,
    )
    this._set.current=1
    this._status.current=undefined
    if(this._board.existLineClear())
        this._status.clearLine={time:t}
    else
        this._getCurrent(t)
}
Game.prototype._getCurrent=function(t){
    if(this._status.next==undefined)
        return
    this._setCurrent(t,this._status.next)
    this._set.next=1
    delete this._status.next
    this.god.getNext(this._status.godChoice)
}
Game.prototype._isValidTransfer=function(dx,dy,dd){
    return isValidTransfer(
        this._status.current,this._board.array,dx,dy,dd
    )
}
Game.prototype._rotate=function(t,mode){
    let
        dd=mode==0?-1:1,
        c=this._status.current,
        wk=constant.srsWallKick[c.type][2*c.direction+mode]
    for(let i=0;i<5;i++)
        if(this._isValidTransfer(wk[i][0],wk[i][1],dd))
            return this._transfer(t,wk[i][0],wk[i][1],dd)
}
Game.prototype._setCurrent=function(t,type){
    this._set.current=1
    this._status.current={
        type,
        direction:0,
        x:5+Math.floor(-constant.shape[type][0].length/2),
        y:20+initialY[type],
    }
    this._status.down.start=t
    if(this._status.horizontalMove)
        this._status.horizontalMove.time=t
    this._status.land=undefined
    this._checkLand(t)
}
Game.prototype._setNext=function(t,next){
    if(this._status.current==undefined)
        this._setCurrent(t,next)
    else{
        this._set.next=1
        this._status.next=next
    }
    this._status.godChoice[next]=1
    if(this._status.godChoice.reduce((a,b)=>a+b)==7)
        this._status.godChoice=[0,0,0,0,0,0,0]
    if(this._status.next==undefined)
        this.god.getNext(this._status.godChoice)
}
Game.prototype._transfer=function(t,dx,dy,dd){
    this._set.current=1
    this._status.current.x+=dx
    this._status.current.y+=dy
    this._status.current.direction=((
        this._status.current.direction+dd
    )%4+4)%4
    this._checkLand(t)
}
Game.prototype._to=_to
Game.prototype._processEvent=_processEvent
Game.prototype.in=function(event){
    this._set={}
    this._processEvent(event)
    if(this._set.board)
        this.ui.set(['board',this._board.array])
    if(this._set.current)
        this.ui.set(['current',this._status.current])
    if(this._set.hold)
        this.ui.set(['hold',this._status.hold])
    if(this._set.next)
        this.ui.set(['next',this._status.next])
}
Game.prototype.to=function(t){
    this._set={}
    this._to(t)
    if(this._set.board)
        this.ui.set(['board',this._board.array])
    if(this._set.current)
        this.ui.set(['current',this._status.current])
    if(this._set.next)
        this.ui.set(['next',this._status.next])
}
Object.defineProperty(Game.prototype,'status',{get(){
    return this._status
}})
export default Game
