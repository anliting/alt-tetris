import constant from                './constant.mjs'
import isValidTransfer from         './isValidTransfer.mjs'
import Board from                   './Game/Board.mjs'
let initialY=[-2,-1,-1,0,-1,-1,-1]
function Game(){
    this._history=[]
    this._status={
        godChoice:[0,0,0,0,0,0,0],
        key:{},
        down:{
            mode:'gravity',
        },
    }
    this._board=new Board
}
Game.prototype._setCurrent=function(t,type){
    this._status.down.start=t
    this._status.current={
        type,
        direction:0,
        x:5+Math.floor(-constant.shape[type][0].length/2),
        y:20+initialY[type],
    }
    this._status.land=undefined
    this._checkLand(t)
}
Game.prototype._setNext=function(t,next){
    if(this._status.current==undefined)
        this._setCurrent(t,next)
    else
        this._status.next=next
    this._status.godChoice[next]=1
    if(this._status.godChoice.reduce((a,b)=>a+b)==7)
        this._status.godChoice=[0,0,0,0,0,0,0]
    if(this._status.next==undefined)
        this.god.getNext(this._status.godChoice)
}
Game.prototype._hold=function(t){
    if(this._status.hold==undefined){
        if(this._status.current==undefined)
            return
        this._status.hold=this._status.current.type
        this._cetCurrent()
        this._getCurrent(t)
    }else if(this._status.current==undefined){
        this._setCurrent(t,this._status.hold)
        this._status.hold=undefined
    }else{
        let temp=this._status.hold
        this._status.hold=this._status.current.type
        this._setCurrent(t,temp)
    }
}
Game.prototype._rotate=function(t,mode){
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
        if(this._transfer(t,wk[i][0],wk[i][1],dd)==0)
            return i
    return 5
}
Game.prototype._drop=function(t){
    this._board.put(
        this._status.current.type,
        this._status.current.direction,
        this._status.current.x,
        this._status.current.y,
    )
    this._status.current=undefined
    this._board.update()
    this._getCurrent(t)
}
Game.prototype._isValidTransfer=function(dx,dy,dd){
    return isValidTransfer(this._status.current,this._board.array,dx,dy,dd)
}
Game.prototype._checkLand=function(t){
    let land=!this._isValidTransfer(0,-1,0)
    if(!!this._status.land==land)
        return
    if(this._status.land)
        this._status.land=undefined
    else
        this._status.land={time:t}
}
Game.prototype._transfer=function(t,dx,dy,dd){
    if(!this._isValidTransfer(dx,dy,dd))
        return 1
    this._status.current.x+=dx
    this._status.current.y+=dy
    this._status.current.direction=((this._status.current.direction+dd)%4+4)%4
    this._checkLand(t)
    return 0
}
Game.prototype._getCurrent=function(t){
    if(this._status.next==undefined)
        return
    this._setCurrent(t,this._status.next)
    delete this._status.next
    this.god.getNext(this._status.godChoice)
}
Game.prototype.in=function(event){
    this._history.push(event)
    switch(event[1]){
        case'setNext':
            this._setNext(event[0],event[2])
            break
        case'keyDown':
            if(this._status.key[event[2]])
                break
            this._status.key[event[2]]=1
            switch(event[2]){
                case'C':
                case'c':
                    this._hold(event[0])
                break
                case'Z':
                case'z':
                    this._rotate(event[0],0)
                break
                case'ArrowUp':
                case'X':
                case'x':
                    this._rotate(event[0],1)
                break
                case'ArrowLeft':
                    this._transfer(event[0],-1,0,0)
                    break
                case'ArrowRight':
                    this._transfer(event[0],1,0,0)
                    break
                case' ':
                    while(this._transfer(event[0],0,-1,0)==0);
                    this._drop(event[0])
                    break
                case'ArrowDown':
                    this._status.down={
                        mode:'softdrop',
                        start:event[0],
                    }
                    if(this._isValidTransfer(0,-1,0))
                        this._transfer(event[0],0,-1,0)
                    break
            }
            break
        case'keyUp':
            if(!this._status.key[event[2]])
                break
            this._status.key[event[2]]=0
            switch(event[2]){
                case'ArrowDown':
                    this._status.down={
                        mode:'gravity',
                        start:event[0],
                    }
                    break
            }
            break
    }
}
Game.prototype.to=function(t){
    for(;this._status.current;){
        if(this._status.land){
            if(1e3<=t-this._status.land.time){
                this._drop(t)
                continue
            }
        }else{
            let interval=this._status.down.mode=='gravity'?1e3:50
            if(interval<=t-this._status.down.start){
                this._transfer(t,0,-1,0)
                this._status.down.start+=interval
                continue
            }
        }
        break
    }
}
Object.defineProperty(Game.prototype,'status',{get(){
    let status=Object.create(this._status)
    status.board=this._board.array
    return status
}})
export default Game
