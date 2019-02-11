import Game from                    './Tetris/Game.mjs'
import God from                     './Tetris/God.mjs'
import Ui from                      './Tetris/Ui.mjs'
function processAnimationFrame(){
    let computeStart=performance.now()
    this._game.to(~~computeStart-this._start)
    this._ui.drawGame(this._game.status)
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
        getNext:choice=>this._god.getNext(choice),
    }
    this._god=new God
    this._god.game={
        setNext:next=>this._inGame(['setNext',next]),
    }
    this._ui=new Ui
    this._ui.game={
        in:event=>this._inGame(event),
    }
    this._installation={}
    this._processAnimationFrame=processAnimationFrame.bind(this)
    this.ui=this._ui.node
}
Tetris.style=``
Tetris.prototype._inGame=function(a){
    this._game.in([~~performance.now()-this._start,...a])
}
Tetris.prototype._frameSecond=null
Tetris.prototype.start=function(){
    this._start=~~performance.now()
    this._god.getNext(this._game.status.godChoice)
}
Tetris.prototype.install=function(){
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame)
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
Tetris.prototype.frameSecond=null
export default Tetris
