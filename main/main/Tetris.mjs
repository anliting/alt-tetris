import Game from                    './Tetris/Game.mjs'
import God from                     './Tetris/God.mjs'
import Ui from                      './Tetris/Ui.mjs'
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
        history:[],
        start:performance.now(),
        frameCount:0,
        frameTime:0,
    }
    let processAnimationFrame=()=>{
        let frameStart=performance.now()
        this._game.to(~~frameStart-this._start)
        this._ui.drawGame(this._game.status)
        let frameTime=performance.now()-frameStart
        if(1e3<=frameStart-this._uiPerformanceStatistics.start){
            this._uiPerformanceStatistics.history.push({
                start:          frameStart,
                frameCount:     this._uiPerformanceStatistics.frameCount,
                frameTime:      this._uiPerformanceStatistics.frameTime,
            })
            Object.assign(this._uiPerformanceStatistics,{
                start:frameStart,
                frameCount:0,
                frameTime:0,
            })
        }
        this._uiPerformanceStatistics.frameCount++
        this._uiPerformanceStatistics.frameTime+=frameTime
        this._installation.animationFrameRequest=
            requestAnimationFrame(processAnimationFrame)
    }
    this._installation.animationFrameRequest=
        requestAnimationFrame(processAnimationFrame)
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
export default Tetris
