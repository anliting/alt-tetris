Promise.all([
    module.shareImport('prototype_tetrominoes.js'),
    module.shareImport('Tetromino.prototype.update_html.js'),
    module.shareImport('Tetromino.prototype.build_html.js'),
]).then(modules=>{
let
    prototype_tetrominoes=modules[0]
Tetromino.prototype.become_next=function(){
    this.prototype=this.queue_prototype_tetrominoes.access(0)
    this.queue_prototype_tetrominoes.pop()
}
Tetromino.prototype.return_source=function(){
    this.direction=0
    this.x=5+Math.floor(-this.prototype.size/2)
    this.y=20+this.prototype.y_initial__relative
    this.update_html()
}
Tetromino.prototype.valid_transfer=function(dx,dy,dd){
    let direction_new=((this.direction+dd)%4+4)%4
    for(let r=0;r<this.prototype.size;r++)
        for(let c=0;c<this.prototype.size;c++){
            let x_expandedboard=this.x+dx+c
            let y_expandedboard=this.y+dy+this.prototype.size-1-r
            let value_expandedboard=
                0<=x_expandedboard
                &&x_expandedboard<this.board.count_columns
                &&0<=y_expandedboard
                &&y_expandedboard<this.board.count_rows
                    ?this.board.array[x_expandedboard][y_expandedboard]
                    :
                        0<=x_expandedboard
                        &&x_expandedboard<this.board.count_columns
                        &&0<=y_expandedboard
                            ?0
                            :1;
            if(
                value_expandedboard&&
                this.prototype.array[direction_new][r][c]
            )
                return 0
        }
    return 1
}
Tetromino.prototype.transfer=function(dx,dy,dd){
    if(!this.valid_transfer(dx,dy,dd))
        return 1
    this.x+=dx
    this.y+=dy
    this.direction=((this.direction+dd)%4+4)%4
    return 0
}
Tetromino.prototype.rotate=function(mode){
    /*
     *  Rotate the tetromino with given mode.
     *  Return value: Return the order of wallkick if success,
     *      otherwise return 5.
     */
    let dd=mode==0?-1:1
    for(let i=0;i<5;i++){
        if(this.transfer(
            this.prototype.wallkickdata[
                2*this.direction+mode
            ][i].x,
            this.prototype.wallkickdata[
                2*this.direction+mode
            ][i].y,
            dd
        )==0){
            // bug: stdout should be tetris._stdout
            if(this.prototype==prototype_tetrominoes[5]&&i)
                stdout=this.prototype.name+'-Spin<br>'+stdout
            return i
        }
    }
    return 5
}
Tetromino.prototype.drop=function(){
    this.board.insert(this)
    this.board.update_html()
    this.become_next()
    this.return_source()
}
Tetromino.prototype.softdrop=function(){
    if(this.transfer(0,-1,0))
        return 1
    this.reset_autofall()
    return 0
}
Tetromino.prototype.harddrop=function(){
    while(this.transfer(0,-1,0)==0);
    this.drop()
}
Tetromino.prototype.update_html=modules[1]
Tetromino.prototype.build_html=modules[2]
Tetromino.prototype.autofall=function(){
    this.set_autofall()
    if(this.transfer(0,-1,0))
        this.drop()
    this.update_html()
}
Tetromino.prototype.set_autofall=function(){
    this.id_timeout_autofall=setTimeout(
        ()=>{this.autofall()},
        this.time_ms__autofall
    )
}
Tetromino.prototype.unset_autofall=function(){
    clearTimeout(this.id_timeout_autofall)
}
Tetromino.prototype.reset_autofall=function(){
    this.unset_autofall()
    this.set_autofall()
}
module.export=Tetromino
function Tetromino(prototype,queue_prototype_tetrominoes,board){
    this.prototype=prototype
    this.queue_prototype_tetrominoes=queue_prototype_tetrominoes
    this.board=board
    this.direction=0
    this.x=5+Math.floor(-this.prototype.size/2)
    this.y=20+this.prototype.y_initial__relative
    this.time_ms__autofall=1000
    this.id_timeout_autofall
}
})
