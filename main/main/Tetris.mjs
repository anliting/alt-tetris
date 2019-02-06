import doe from                     '../../lib/doe.mjs'
import Game from                    './Tetris/Game.mjs'
import God from                     './Tetris/God.mjs'
import constant from                './Tetris/constant.mjs'
let color=[
    '#00FFFF',  // Aqua
    '#0000FF',  // Standard Blue
    '#FFA500',  // Standard Orange
    '#FFFF00',  // Standard Yellow
    '#00FF00',  // Standard Lime
    '#800080',  // Standard Purple
    '#FF0000',  // Standard Red
]
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
    this._uiCache={}
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
    this.ui=doe.canvas({
        className:'tetris',tabIndex:-1,width:640,height:480,
        onkeydown:event=>{
            switch(event.key){
                case' ':
                    this._tetromino.harddrop()
                    break
                case'ArrowLeft':
                    this._game.transfer(-1,0,0)
                    break
                case'ArrowUp':
                    this._game.rotate(1)
                    break
                case'ArrowRight':
                    this._game.transfer(1,0,0)
                    break
                case'ArrowDown':
                    this._tetromino.softdrop()
                    break
                case'C':
                case'c':
                    this._game.hold()
                    break
                case'X':
                case'x':
                    this._game.rotate(1)
                    break
                case'Z':
                case'z':
                    this._game.rotate(0)
                    break
            }
        },
        onkeyup:event=>{
        },
    })
    this._uiCache.context=this.ui.getContext('2d')
    this._installation={}
}
Tetris.style=``
Tetris.prototype._inGame=function(a){
    this._game.in([~~performance.now()-this._start,...a])
}
Tetris.prototype._drawBoardAt=function(atX,atY){
    for(let x=0;x<10;x++)
    for(let y=0;y<20;y++){
        this._uiCache.context.fillStyle=
            this._game.board.array[x][y]==undefined
        ?
            'black'
        :
            color[this._game.board.array[x][y]]
        this._uiCache.context.fillRect(atX+17*x,atY+17*(20-1-y),16,16)
    }
    if(this._game.status.current){
        let
            p=this._shadowPosition(),
            c=this._game.status.current
        this._drawTetrominoShapeAt(
            atX+17*p[0],
            atY+17*(20-(p[1]+constant.shape[c.type][0].length)),
            c.type,
            c.direction,
            'gray'
        )
        this._drawTetrominoAt(
            atX+17*this._game.status.current.x,
            atY+17*(20-(c.y+constant.shape[c.type][0].length)),
            this._game.status.current.type,
            this._game.status.current.direction
        )
    }
}
Tetris.prototype._drawTetrominoAt=function(atX,atY,id,direction=0){
    this._drawTetrominoShapeAt(atX,atY,id,direction,color[id])
}
Tetris.prototype._drawTetrominoShapeAt=function(atX,atY,id,direction,color){
    this._uiCache.context.fillStyle=color
    let
        shape=constant.shape[id][direction],
        n=shape.length
    for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(shape[r][c])
        this._uiCache.context.fillRect(atX+17*c,atY+17*r,16,16)
}
Tetris.prototype._shadowPosition=function(){
    let delta_y__shadow=0
    while(this._game.valid_transfer(0,delta_y__shadow-1,0))
        delta_y__shadow--
    return[
        this._game.status.current.x,
        this._game.status.current.y+delta_y__shadow
    ]
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
        this._installation.animationFrameRequest=
            requestAnimationFrame(processAnimationFrame)
        this._uiCache.context.fillStyle='darkgray'
        this._uiCache.context.fillRect(0,0,640,480)
        this._drawBoardAt(160,80)
        if(this._game.status.next!=undefined)
            this._drawTetrominoAt(400,80,this._game.status.next)
        if(this._game.status.hold!=undefined)
            this._drawTetrominoAt(80,80,this._game.status.hold)
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
    }
    this._installation.animationFrameRequest=
        requestAnimationFrame(processAnimationFrame)
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
export default Tetris
