let npm={
    events:()=>module.import('https://cdn.rawgit.com/anliting/module/ba2cb12b7f16bf066fc82d2ebd24200d6c857856/node/events.js')
}
module.debug=true
module=module.share({npm})
Promise.all([
    module.shareImport('arrange_random.js'),
    module.shareImport('Board.js'),
    module.shareImport('BoardHold.js'),
    module.shareImport('BoardNext.js'),
    module.shareImport('prototype_tetrominoes.js'),
    npm.events(),
    module.shareImport('QueuePrototypeTetromino.js'),
    module.shareImport('Tetromino.js'),
]).then(modules=>{
let
    arrange_random=modules[0],
    Board=modules[1],
    BoardHold=modules[2],
    BoardNext=modules[3],
    prototype_tetrominoes=modules[4],
    EventEmitter=modules[5],
    QueuePrototypeTetromino=modules[6],
    Tetromino=modules[7]
function Status(){
    this.update_html=function(){
        document.getElementById('div_gamestatus').innerHTML=
'           Tetromino Type: '+tetromino.prototype.name+'<br>\
            '+stdout+'<br>\
';
    }
}
// main.js
//module.debug=true
//module.shareImport('tetris.js').then(tetris=>{
/*let
    Board=                      tetris.Board,
    BoardHold=                  tetris.BoardHold,
    BoardNext=                  tetris.BoardNext,
    QueuePrototypeTetromino=    tetris.QueuePrototypeTetromino,
    Tetromino=                  tetris.Tetromino,
    Status=                     tetris.Status*/
var
    queue_prototype_tetrominoes=new QueuePrototypeTetromino,
    board=new Board,
    tetromino=new Tetromino(
        queue_prototype_tetrominoes.access(0),
        queue_prototype_tetrominoes,
        board
    ),
    board_hold=new BoardHold(tetromino),
    board_next=new BoardNext(tetromino,queue_prototype_tetrominoes),
    status_game=new Status,
    stdout=''
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
var keys={},times_key={}
var timeout_keyevents
var onkeydown_body=function(event){
    keys[event.which]=true
    times_key[event.which]=0
}
var onkeyup_body=function(event){
    delete keys[event.which]
}
var keyevents=function(){
    timeout_keyevents=setTimeout(()=>{
        keyevents()
    },50)
    if(keys[32]){    // space: hard drop
        if(times_key[32]%4==0)
            tetromino.harddrop()
    }
    if(keys[37]){    // left arrow
        if(times_key[37]%2==0)
            tetromino.transfer(-1,0,0)
    }
    if(keys[38]){    // up arrow: 順時鐘轉
        if(times_key[38]%4==0)
            tetromino.rotate(1)
    }
    if(keys[39]){    // right arrow
        if(times_key[39]%2==0)
            tetromino.transfer(1,0,0)
    }
    if(keys[40]){    // down arrow: soft drop
        if(times_key[40]%2==0)
            tetromino.softdrop()
    }
    if(keys[67]){    // c: hold
        if(times_key[67]%4==0)
            board_hold.hold()
        board_hold.update_html()
    }
    if(keys[88]){    // x: 順時鐘轉
        if(times_key[88]%4==0)
            tetromino.rotate(1)
    }
    if(keys[90]){    // z: 逆時鐘轉
        if(times_key[90]%4==0)
            tetromino.rotate(0)
    }
    for(let i=0;i<128;i++)
        if(keys[i])
            times_key[i]++
    tetromino.update_html()
    status_game.update_html()
}
keyevents();
document.body.onkeydown=onkeydown_body
document.body.onkeyup=onkeyup_body
//})
})
