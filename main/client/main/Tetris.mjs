import Status from './Tetris/Status.js'
import Board from './Tetris/Board.js'
import BoardHold from './Tetris/BoardHold.js'
import BoardNext from './Tetris/BoardNext.js'
import Tetromino from './Tetris/Tetromino.js'
import QueuePrototypeTetromino from './Tetris/QueuePrototypeTetromino.js'
import listenToKeys from './Tetris/Tetris.prototype.listenToKeys.js'
function Tetris(){
    this._stdout=''
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
    this._status_game=new Status(this._tetromino,()=>this._stdout)
}
Tetris.prototype.listenToKeys=listenToKeys
Object.defineProperty(Tetris.prototype,'view',{get(){
    let
        div=document.createElement('div')
    div.style.width='640px'
    div.style.height='480px'
    div.appendChild(this._board.view)
    div.appendChild(this._board_hold.view)
    div.appendChild(this._board_next.view)
    div.appendChild(this._status_game.view)
    this._queue_prototype_tetrominoes.pop()
    this._board.update_html()
    this._board_hold.update_html()
    this._board_next.update_html()
    return div
}})
Tetris.prototype.setup=function(){
    document.getElementById('div_board').appendChild(this._tetromino.view)
    this._tetromino.update_html()
    this._tetromino.set_autofall()
    this._queue_prototype_tetrominoes.on('pop',ev=>{
        ev.then(()=>{
            this._board_next.update_html()
        })
    })
    this.listenToKeys()
}
export default Tetris
