import Status from                  './Tetris/Status.mjs'
import Board from                   './Tetris/Board.js'
import BoardHold from               './Tetris/BoardHold.js'
import BoardNext from               './Tetris/BoardNext.js'
import Tetromino from               './Tetris/Tetromino.js'
import QueuePrototypeTetromino from './Tetris/QueuePrototypeTetromino.js'
import listenToKeys from            './Tetris/Tetris.prototype.listenToKeys.js'
import doe from                     '../../../lib/doe.mjs'
function Tetris(){
    this._status={
        time:0,
    }
    this._board=new Board
    this._queue_prototype_tetrominoes=new QueuePrototypeTetromino
    this._tetromino=new Tetromino(
        this._queue_prototype_tetrominoes.access(0),
        this._queue_prototype_tetrominoes,
        this._board
    )
    this._board_hold=new BoardHold(this._tetromino)
    this._board_next=new BoardNext(
        this._tetromino,
        this._queue_prototype_tetrominoes
    )
    this._status_game=new Status(this._tetromino)
    this._queue_prototype_tetrominoes.out={
        pop:ev=>{
            ev.then(()=>{
                this._board_next.update_html()
            })
        },
    }
    this._queue_prototype_tetrominoes.pop()
    this._board.update_html()
    this._board_hold.update_html()
    this._board_next.update_html()
    this._tetromino.update_html()
    this._tetromino.set_autofall()
    this.ui=doe.div(
        {className:'tetris',tabIndex:-1},
        doe(this._board.view,this._tetromino.view),
        this._board_hold.view,
        this._board_next.view,
        this._status_game.view
    )
    listenToKeys.call(this)
    this._installation={}
}
Tetris.style=`
    .tetris{
        width:640px;
        height:480px;
    }
`
Tetris.prototype.advance=function(time){
    this._status.time+=time
}
Tetris.prototype.install=function(){
    this._installation.animationFrameRequest
    let processAnimationFrame=()=>{
        this._installation.animationFrameRequest=
            requestAnimationFrame(processAnimationFrame)
        let now=~~performance.now()
        this.advance(now-this._installation.startTime)
        this._installation.startTime=now
    }
    this._installation.animationFrameRequest=
        requestAnimationFrame(processAnimationFrame)
    this._installation.startTime=~~performance.now()
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
export default Tetris
