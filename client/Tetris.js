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
}
Tetris.prototype.listenToKeys=modules[6]
Object.defineProperty(Tetris.prototype,'view',{get(){
    let
        mainDiv=document.createElement('div'),
        boardDiv=document.createElement('div'),
        holdDiv=document.createElement('div'),
        nextDiv=document.createElement('div'),
        statusDiv=document.createElement('div')
    mainDiv.id='div_game'
    mainDiv.style.width='640px'
    mainDiv.style.height='480px'
    boardDiv.id='div_board'
    boardDiv.style.position='absolute'
    boardDiv.style.left='160px'
    boardDiv.style.top='80px'
    holdDiv.id='div_boardhold'
    holdDiv.style.position='absolute'
    holdDiv.style.left='80px'
    holdDiv.style.top='80px'
    nextDiv.id='div_boardnext'
    nextDiv.style.position='absolute'
    nextDiv.style.left='400px'
    nextDiv.style.top='80px'
    statusDiv.id='div_gamestatus'
    statusDiv.style.position='relative'
    statusDiv.style.left='400px'
    statusDiv.style.top='160px'
    mainDiv.appendChild(boardDiv)
    mainDiv.appendChild(holdDiv)
    mainDiv.appendChild(nextDiv)
    mainDiv.appendChild(statusDiv)
    return mainDiv
}})
Tetris.prototype.setup=function(){
    let
        queue_prototype_tetrominoes=new QueuePrototypeTetromino,
        board=new Board,
        tetromino=new Tetromino(
            queue_prototype_tetrominoes.access(0),
            queue_prototype_tetrominoes,
            board
        ),
        board_hold=new BoardHold(tetromino),
        board_next=new BoardNext(tetromino,queue_prototype_tetrominoes),
        status_game=new Status(tetromino,()=>stdout),
        stdout=''
    this.tetromino=tetromino
    this.status_game=status_game
    this.board_hold=board_hold
    this.board_next=board_next
    queue_prototype_tetrominoes.pop()
    board.build_html()
    board.update_html()
    board_hold.build_html()
    board_hold.update_html()
    board_next.build_html()
    board_next.update_html()
    tetromino.build_html()
    tetromino.update_html()
    tetromino.set_autofall()
    queue_prototype_tetrominoes.on('pop',ev=>{
        ev.then(()=>{
            board_next.update_html()
        })
    })
    this.listenToKeys()
}
})
