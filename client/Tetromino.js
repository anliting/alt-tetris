Promise.all([
    module.import('prototype_tetrominoes.js')
]).then(modules=>{
let
    prototype_tetrominoes=modules[0]
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
            if(this.prototype==prototype_tetrominoes[5]&&i)
                stdout=this.prototype.name+'-Spin<br>'+stdout
            return i
        }
    }
    return 5;
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
    this.reset_autofall();
    return 0;
}
Tetromino.prototype.harddrop=function(){
    while(this.transfer(0,-1,0)==0);
    this.drop();
}
Tetromino.prototype.build_html=function(){
    var div_board=document.getElementById('div_board');
    var output='';
    output+='\
        <div \
            id="div_shadow"\
            style="\
            position:absolute;\
            background-color:white;\
            left:'+(17*this.x)+'px;\
            top:'+(17*(
                this.board.count_rows-(this.y+this.prototype.size)
            ))+'px;\
            "></div>\
        <div \
            id="div_tetris"\
            style="\
            position:absolute;\
            background-color:white;\
            left:'+(17*this.x)+'px;\
            top:'+(17*(
                this.board.count_rows-(this.y+this.prototype.size)
            ))+'px;\
            "></div>';
    div_board.innerHTML+=output;
}
Tetromino.prototype.update_html=function(){
    var output;
    output='';
    var div_tetris=document.getElementById('div_tetris');
    div_tetris.style.left=''+(17*this.x)+'px';
    div_tetris.style.top=''+(17*(
        this.board.count_rows_visible-(this.y+this.prototype.size)
    ))+'px';
    for(var i=0;i<this.prototype.size;i++)
        for(var j=0;j<this.prototype.size;j++)
            output+='<div \
                    style="\
                    width:16px;\
                    height:16px;\
                    position:absolute;\
                    background-color:'+(
                            this.prototype.array
                                [this.direction][i][j]
                            ?this.prototype.color
                            :'none'
                            )+';\
                    top:'+(17*i)+'px;\
                    left:'+(17*j)+'px;\
                    "></div>';
    // Set the focus. 設定焦點。
    output+='<div \
        style="\
        color:white;\
        width:16px;\
        height:16px;\
        position:absolute;\
        text-align:center;\
        top:'+(17*this.prototype.size/2-9)+'px;\
        left:'+(17*this.prototype.size/2-9)+'px;\
        ">O</div>';
    div_tetris.innerHTML=output;
    var div_shadow=document.getElementById('div_shadow');
    output='';
    var delta_y__shadow=0;
    while(this.valid_transfer(0,delta_y__shadow-1,0))
        delta_y__shadow--;
    var x_shadow=this.x,y_shadow=this.y+delta_y__shadow;
    div_shadow.style.left=''+(17*x_shadow)+'px';
    div_shadow.style.top=''+(17*(
        this.board.count_rows_visible-(y_shadow+this.prototype.size)
    ))+'px';
    for(var i=0;i<this.prototype.size;i++)
        for(var j=0;j<this.prototype.size;j++)
            output+='<div \
                    style="\
                    width:16px;\
                    height:16px;\
                    position:absolute;\
                    background-color:'+(
                            this.prototype.array[this.direction][i][j]
                            ?'gray'
                            :'none'
                            )+';\
                    top:'+(17*i)+'px;\
                    left:'+(17*j)+'px;\
                    "></div>';
    div_shadow.innerHTML=output;
}
Tetromino.prototype.autofall=function(){
    this.set_autofall()
    if(this.transfer(0,-1,0))
        this.drop()
    this.update_html()
}
Tetromino.prototype.set_autofall=function(){
    this.id_timeout_autofall=setTimeout(
        ()=>{this.autofall();},
        this.time_ms__autofall
    )
}
Tetromino.prototype.unset_autofall=function(){
    clearTimeout(this.id_timeout_autofall);
}
Tetromino.prototype.reset_autofall=function(){
    this.unset_autofall()
    this.set_autofall()
}
})
