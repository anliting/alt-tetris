import Game from                    './Tetris/Game.mjs'
import God from                     './Tetris/God.mjs'
import Ui from                      './Tetris/Ui.mjs'
function processAnimationFrame(){
    let frameStart=performance.now()
    this._game.to(~~frameStart-this._start)
    this._ui.drawGame(this._game.status)
    let frameEnd=performance.now()
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame)
    let s=this._uiPerformanceStatistics
    if(1e3<=frameStart-s.current.start){
        s.history.push(s.current)
        s.current={
            start:      frameStart,
            frameCount: 0,
            frameTime:  0,
        }
    }
    s.current.frameCount++
    s.current.frameTime+=frameEnd-frameStart
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
Tetris.prototype.start=function(){
    this._start=~~performance.now()
    this._god.getNext(this._game.status.godChoice)
}
Tetris.prototype.install=function(){
    this._uiPerformanceStatistics={
        history:    [],
        current:    {
            start:          performance.now(),
            frameCount:     0,
            frameTime:      0,
        }
    }
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame)
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
export default Tetris
