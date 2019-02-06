import doe from                     '../../lib/doe.mjs'
import Game from                    './Tetris/Game.mjs'
import God from                     './Tetris/God.mjs'
import Ui from                      './Tetris/Ui.mjs'
function Tetris(){
    this._game=new Game
    this._game.god={
        getNext:choice=>{
            this._god.getNext(choice)
        },
    }
    this._god=new God
    this._god.game={
        setNext:next=>{
            this._inGame(['setNext',next])
        },
    }
    this._tetromino={}
    this._tetromino.softdrop=()=>{
        if(this._game.transfer(0,-1,0))
            return 1
        this._tetromino.reset_autofall()
        return 0
    }
    this._tetromino.harddrop=()=>{
        while(this._game.transfer(0,-1,0)==0);
        this._game.drop()
    }
    this._tetromino.set_autofall=()=>{
        this._tetromino.id_timeout_autofall=setInterval(
            ()=>{
                if(this._game.transfer(0,-1,0))
                    this._game.drop()
            },
            1e3
        )
    }
    this._tetromino.unset_autofall=()=>{
        clearInterval(this._tetromino.id_timeout_autofall)
    }
    this._tetromino.reset_autofall=()=>{
        this._tetromino.unset_autofall()
        this._tetromino.set_autofall()
    }
    this._tetromino.set_autofall()
    this._ui=new Ui
    this.ui=doe(this._ui.node,{
        onkeydown:event=>{
            switch(event.key){
                case' ':
                    this._tetromino.harddrop()
                    break
                case'ArrowLeft':
                    this._game.transfer(-1,0,0)
                    break
                case'ArrowRight':
                    this._game.transfer(1,0,0)
                    break
                case'ArrowDown':
                    this._tetromino.softdrop()
                    break
                default:
                    this._inGame(['key',event.key])
            }
        },
        onkeyup:event=>{
        },
    })
    this._installation={}
}
Tetris.style=``
Tetris.prototype._inGame=function(a){
    this._game.in([~~performance.now()-this._start,...a])
}
Tetris.prototype.start=function(){
    this._start=~~performance.now()
    this._god.getNext([0,0,0,0,0,0,0])
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
