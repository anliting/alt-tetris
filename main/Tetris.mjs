import Game from                    './Tetris/Game.mjs'
import God from                     './Tetris/God.mjs'
import Ui from                      './Tetris/Ui.mjs'
function processAnimationFrame(){
    let computeStart=performance.now()
    this._game.to(~~computeStart-this._start)
    this._outQueue()
    this._ui.set(this._setUi)
    this._setUi={}
    let computeEnd=performance.now()
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame)
    if(!this.frameSecond)
        return
    let computeEndPoint=~~computeEnd
    if(!this._frameSecond)
        this._frameSecond={
            start:      computeEndPoint,
            count:      0,
            time:       0,
        }
    {
        let s=this._frameSecond
        if(1e3<=computeEndPoint-s.start){
            if(this.frameSecond)
                this.frameSecond(s)
            this._frameSecond={
                start:
                    s.start+(~~((computeEndPoint-s.start)/1000))*1000,
                count: 0,
                time:  0,
            }
        }
    }
    this._frameSecond.count++
    this._frameSecond.time+=computeEnd-computeStart
}
function Tetris(){
    this._game=new Game
    this._game.god={
        getNext:choice=>this._queue.push(()=>this._god.getNext(choice)),
    }
    this._game.ui={
        set:set=>this._setUi[set[0]]=set[1],
    }
    this._god=new God
    this._god.game={
        setNext:next=>this._queue.push(()=>this._inGame(['setNext',next])),
    }
    this._ui=new Ui
    this._ui.game={
        in:event=>{
            this._inGame(event)
        },
    }
    this._setUi={}
    this._installation={}
    this._processAnimationFrame=processAnimationFrame.bind(this)
    this._queue=[]
    this.ui=this._ui.node
}
Tetris.style=``
Tetris.prototype._outQueue=function(){
    for(;this._queue.length;)
        this._queue.shift()()
}
Tetris.prototype._inGame=function(a){
    this._game.in([~~performance.now()-this._start,...a])
    this._outQueue()
}
Tetris.prototype._frameSecond=null
Tetris.prototype.start=function(){
    this._start=~~performance.now()
    this._god.getNext(this._game.status.godChoice)
    this._outQueue()
}
Tetris.prototype.install=function(){
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame)
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
Tetris.prototype.focus=function(){
    this._ui.node.focus()
}
Tetris.prototype.frameSecond=null
export default Tetris
