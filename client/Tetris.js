let npm={
    events:()=>module.import('https://cdn.rawgit.com/anliting/module/ba2cb12b7f16bf066fc82d2ebd24200d6c857856/node/events.js')
}
module.debug=true
module=module.share({npm})
Promise.all([
    module.shareImport('Status.js'),
    module.shareImport('Board.js'),
    module.shareImport('BoardHold.js'),
    module.shareImport('BoardNext.js'),
    module.shareImport('Tetromino.js'),
    module.shareImport('QueuePrototypeTetromino.js'),
    module.shareImport('Tetris.prototype.listenToKeys.js'),
]).then(modules=>{
let
    Status=modules[0],
    Board=modules[1],
    BoardHold=modules[2],
    BoardNext=modules[3],
    Tetromino=modules[4],
    QueuePrototypeTetromino=modules[5]
module.export=Tetris
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
Tetris.prototype.listenToKeys=modules[6]
Object.defineProperty(Tetris.prototype,'view',{get(){
    let
        div=document.createElement('div')
    div.id='div_game'
    div.style.width='640px'
    div.style.height='480px'
    div.appendChild(this._board.view)
    div.appendChild(this._board_hold.view)
    div.appendChild(this._board_next.view)
    div.appendChild(this._status_game.view)
    this._queue_prototype_tetrominoes.pop()
    return div
}})
Tetris.prototype.setup=function(){
    this._board.update_html()
    this._board_hold.build_html()
    this._board_hold.update_html()
    this._board_next.build_html()
    this._board_next.update_html()
    this._tetromino.build_html()
    this._tetromino.update_html()
    this._tetromino.set_autofall()
    this._queue_prototype_tetrominoes.on('pop',ev=>{
        ev.then(()=>{
            this._board_next.update_html()
        })
    })
    this.listenToKeys()
}
})
