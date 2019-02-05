import Board from                   './Tetris/Board.mjs'
import Tetromino from               './Tetris/Tetromino.js'
import QueuePrototypeTetromino from './Tetris/QueuePrototypeTetromino.js'
import listenToKeys from            './Tetris/Tetris.prototype.listenToKeys.js'
import Game from                    './Tetris/Game.mjs'
import God from                     './Tetris/God.mjs'
import doe from                     '../../lib/doe.mjs'
import constant from                './constant.mjs'
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
            this._game.setNext(next)
        },
    }
    this._node={}
    this._nodeCache={}
    this._board=new Board
    this._queue_prototype_tetrominoes=new QueuePrototypeTetromino
    this._tetromino=new Tetromino(
        this._queue_prototype_tetrominoes.access(0),
        this._queue_prototype_tetrominoes
    )
    this._tetromino.drop=()=>{
        this._board.insert(this._tetromino)
        setTimeout(()=>{this._board.update()},200)
        this._tetromino.become_next()
        this._tetromino.return_source()
    }
    this._tetromino.valid_transfer=(dx,dy,dd)=>{
        let direction_new=((this._tetromino.direction+dd)%4+4)%4
        for(let r=0;r<this._tetromino.prototype.size;r++)
        for(let c=0;c<this._tetromino.prototype.size;c++)
        if(this._tetromino.prototype.array[direction_new][r][c]){
            let x=this._tetromino.x+dx+c
            let y=this._tetromino.y+dy+this._tetromino.prototype.size-1-r
            if(!(
                0<=x&&x<10&&0<=y&&y<24&&
                !this._board.array[x][y]
            ))
                return 0
        }
        return 1
    }
    this._queue_prototype_tetrominoes.out={
        pop:ev=>{
            ev.then(()=>{
            })
        },
    }
    this._queue_prototype_tetrominoes.pop()
    this._tetromino.update_html()
    this._tetromino.set_autofall()
    this.ui=doe.div(
        {className:'tetris',tabIndex:-1},
        this._node.canvas=doe.canvas({width:640,height:480}),
        doe.div(
            n=>{doe(n.style,{
                position:'absolute',
                left:'160px',
                top:'80px',
            })},
            this._tetromino.view
        ),
    )
    this._nodeCache.context=this._node.canvas.getContext('2d')
    listenToKeys.call(this)
    this._installation={}
}
Tetris.style=`
    .tetris{
        width:640px;
        height:480px;
    }
`
Tetris.prototype._drawBoardAt=function(atX,atY){
    for(let x=0;x<10;x++)
    for(let y=0;y<20;y++){
        this._nodeCache.context.fillStyle=
            this._board.array[x][y]||'black'
        this._nodeCache.context.fillRect(atX+17*x,atY+17*(20-1-y),16,16)
    }
}
Tetris.prototype._drawTetrominoAt=function(atX,atY,id){
    let n=constant.shape[id][0].length
    for(var r=0;r<n;r++)
    for(var c=0;c<n;c++)
    if(constant.shape[id][0][r][c]){
        this._nodeCache.context.fillStyle=color[id]||'black'
        this._nodeCache.context.fillRect(atX+17*c,atY+17*r,16,16)
    }
}
Tetris.prototype.start=function(){
    this._start=~~performance.now()
    this._game.start()
}
Tetris.prototype.install=function(){
    let processAnimationFrame=()=>{
        this._installation.animationFrameRequest=
            requestAnimationFrame(processAnimationFrame)
        this._nodeCache.context.fillStyle='darkgray'
        this._nodeCache.context.fillRect(0,0,640,480)
        this._drawBoardAt(160,80)
        this._drawTetrominoAt(400,80,
            this._queue_prototype_tetrominoes.access(0).id
        )
        if(this._game.status.hold!=undefined)
            this._drawTetrominoAt(80,80,this._game.status.hold)
    }
    this._installation.animationFrameRequest=
        requestAnimationFrame(processAnimationFrame)
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
export default Tetris
