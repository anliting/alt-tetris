export default function(){
    this.keys={}
    this.times_key={}
    var timeout_keyevents
    var keyevents=()=>{
        timeout_keyevents=setTimeout(()=>{
            keyevents()
        },25)
        if(this.keys[32]){    // space: hard drop
            if(this.times_key[32]%8==0)
                this._tetromino.harddrop()
        }
        if(this.keys[37]){    // left arrow
            if(this.times_key[37]%4==0)
                this._tetromino.transfer(-1,0,0)
        }
        if(this.keys[38]){    // up arrow: 順時鐘轉
            if(this.times_key[38]%8==0)
                this._tetromino.rotate(1)
        }
        if(this.keys[39]){    // right arrow
            if(this.times_key[39]%4==0)
                this._tetromino.transfer(1,0,0)
        }
        if(this.keys[40]){    // down arrow: soft drop
            if(this.times_key[40]%4==0)
                this._tetromino.softdrop()
        }
        if(this.keys[67]){    // c: hold
            if(this.times_key[67]%8==0)
                this._board_hold.hold()
            this._board_hold.update_html()
        }
        if(this.keys[88]){    // x: 順時鐘轉
            if(this.times_key[88]%8==0)
                this._tetromino.rotate(1)
        }
        if(this.keys[90]){    // z: 逆時鐘轉
            if(this.times_key[90]%8==0)
                this._tetromino.rotate(0)
        }
        for(let i=0;i<128;i++)
            if(this.keys[i])
                this.times_key[i]++
        this._tetromino.update_html()
    }
    keyevents()
    this.ui.addEventListener('keydown',event=>{
        this.keys[event.which]=true
        this.times_key[event.which]=0
    })
    this.ui.addEventListener('keyup',event=>{
        delete this.keys[event.which]
    })
}
