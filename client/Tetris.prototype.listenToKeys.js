module.export=function(){
    let tetris=this
    this.keys={}
    this.times_key={}
    var timeout_keyevents
    var keyevents=function(){
        timeout_keyevents=setTimeout(()=>{
            keyevents()
        },25)
        if(tetris.keys[32]){    // space: hard drop
            if(tetris.times_key[32]%8==0)
                tetris.tetromino.harddrop()
        }
        if(tetris.keys[37]){    // left arrow
            if(tetris.times_key[37]%4==0)
                tetris.tetromino.transfer(-1,0,0)
        }
        if(tetris.keys[38]){    // up arrow: 順時鐘轉
            if(tetris.times_key[38]%8==0)
                tetris.tetromino.rotate(1)
        }
        if(tetris.keys[39]){    // right arrow
            if(tetris.times_key[39]%4==0)
                tetris.tetromino.transfer(1,0,0)
        }
        if(tetris.keys[40]){    // down arrow: soft drop
            if(tetris.times_key[40]%4==0)
                tetris.tetromino.softdrop()
        }
        if(tetris.keys[67]){    // c: hold
            if(tetris.times_key[67]%8==0)
                tetris.board_hold.hold()
            tetris.board_hold.update_html()
        }
        if(tetris.keys[88]){    // x: 順時鐘轉
            if(tetris.times_key[88]%8==0)
                tetris.tetromino.rotate(1)
        }
        if(tetris.keys[90]){    // z: 逆時鐘轉
            if(tetris.times_key[90]%8==0)
                tetris.tetromino.rotate(0)
        }
        for(let i=0;i<128;i++)
            if(tetris.keys[i])
                tetris.times_key[i]++
        tetris.tetromino.update_html()
        tetris.status_game.update_html()
    }
    keyevents()
    addEventListener('keydown',event=>{
        tetris.keys[event.which]=true
        tetris.times_key[event.which]=0
    })
    addEventListener('keyup',event=>{
        delete tetris.keys[event.which]
    })
}
