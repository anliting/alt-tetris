import Status from                  './Tetris/Status.mjs'
import Board from                   './Tetris/Board.js'
import BoardHold from               './Tetris/BoardHold.js'
import BoardNext from               './Tetris/BoardNext.js'
import Tetromino from               './Tetris/Tetromino.js'
import QueuePrototypeTetromino from './Tetris/QueuePrototypeTetromino.js'
import listenToKeys from            './Tetris/Tetris.prototype.listenToKeys.js'
import doe from                     '../../lib/doe.mjs'
function Game(){
    this.status={
        godChoice:[0,0,0,0,0,0,0],
    }
}
Game.prototype.start=function(){
    this.god.getNext(this.status.godChoice)
}
Game.prototype.setNext=function(next){
    if(this.status.current==undefined){
        this.status.current=next
    }else
        this.status.next=next
    this.status.godChoice[next]=1
    if(this.status.godChoice.reduce((a,b)=>a+b)==7)
        this.status.godChoice=[0,0,0,0,0,0,0]
    if(this.status.next==undefined)
        this.god.getNext(this.status.godChoice)
}
function God(){
}
God.prototype.getNext=function(choice){
    let a=~~(Math.random()*(7-choice.reduce((a,b)=>a+b)))
    for(let i=0;i<7;i++)
        if(choice[i])
            a++
        else if(i==a)
            this.game.setNext(i)
}
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
    this._board=new Board
    this._queue_prototype_tetrominoes=new QueuePrototypeTetromino
    this._tetromino=new Tetromino(
        this._queue_prototype_tetrominoes.access(0),
        this._queue_prototype_tetrominoes
    )
    this._tetromino.drop=()=>{
        this._board.insert(this._tetromino)
        this._board.update_html()
        this._tetromino.become_next()
        this._tetromino.return_source()
    }
    this._tetromino.valid_transfer=(dx,dy,dd)=>{
        let direction_new=((this._tetromino.direction+dd)%4+4)%4
        for(let r=0;r<this._tetromino.prototype.size;r++)
            for(let c=0;c<this._tetromino.prototype.size;c++){
                let x_expandedboard=this._tetromino.x+dx+c
                let y_expandedboard=this._tetromino.y+dy+this._tetromino.prototype.size-1-r
                let value_expandedboard=
                    0<=x_expandedboard
                    &&x_expandedboard<10
                    &&0<=y_expandedboard
                    &&y_expandedboard<24
                        ?this._board.array[x_expandedboard][y_expandedboard]
                        :
                            0<=x_expandedboard
                            &&x_expandedboard<10
                            &&0<=y_expandedboard
                                ?0
                                :1;
                if(
                    value_expandedboard&&
                    this._tetromino.prototype.array[direction_new][r][c]
                )
                    return 0
            }
        return 1
    }
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
Tetris.prototype.start=function(){
    this._start=~~performance.now()
    this._game.start()
}
Tetris.prototype.install=function(){
    this._installation.animationFrameRequest
    let processAnimationFrame=()=>{
        this._installation.animationFrameRequest=
            requestAnimationFrame(processAnimationFrame)
        //console.log(~~performance.now()-this._start)
    }
    this._installation.animationFrameRequest=
        requestAnimationFrame(processAnimationFrame)
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
export default Tetris
