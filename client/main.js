module.debug=true
Promise.all([
    module.import('arrange_random.js'),
    module.import('Board.js'),
    module.import('BoardHold.js'),
    module.import('BoardNext.js'),
    module.import('prototype_tetrominoes.js'),
]).then(modules=>{
let
    arrange_random=modules[0],
    Board=modules[1],
    BoardHold=modules[2],
    BoardNext=modules[3],
    prototype_tetrominoes=modules[4]
var QueuePrototypeTetromino=function(){
    this.queue=[];
    this.push=function(){
        for(var i=0;i<7;i++)
            this.queue.push(prototype_tetrominoes[i]);
        arrange_random(this.queue,this.queue.length-7,this.queue.length);
    }
    this.pop=function(){
        this.queue.shift();
        board_next.update_html();
    }
    this.access=function(k){
        while(!(k<this.queue.length))
            this.push();
        return this.queue[k];
    }
}
var Tetromino=function(prototype){
    this.prototype=prototype;
    this.direction=0;
    this.x=5+Math.floor(-this.prototype.size/2);
    this.y=20+this.prototype.y_initial__relative;
    this.time_ms__autofall=1000;
    this.id_timeout_autofall;
    this.become_next=function(){
        this.prototype=queue_prototype_tetrominoes.access(0);
        queue_prototype_tetrominoes.pop();
    }
    this.return_source=function(){
        this.direction=0;
        this.x=5+Math.floor(-this.prototype.size/2);
        this.y=20+this.prototype.y_initial__relative;
        this.update_html();
    }
    this.valid_transfer=function(dx,dy,dd){
        direction_new=((this.direction+dd)%4+4)%4;
        for(var r=0;r<this.prototype.size;r++)
            for(var c=0;c<this.prototype.size;c++){
                x_expandedboard=this.x+dx+c;
                y_expandedboard=this.y+dy+this.prototype.size-1-r;
                value_expandedboard=
                    0<=x_expandedboard
                    &&x_expandedboard<board.count_columns
                    &&0<=y_expandedboard
                    &&y_expandedboard<board.count_rows
                        ?board.array[x_expandedboard][y_expandedboard]
                        :
                            0<=x_expandedboard
                            &&x_expandedboard<board.count_columns
                            &&0<=y_expandedboard
                                ?0
                                :1;
                if(value_expandedboard
                    &&this.prototype.array[direction_new][r][c]){
                    return 0;
                }
            }
        return 1;
    }
    this.transfer=function(dx,dy,dd){
        if(!this.valid_transfer(dx,dy,dd))
            return 1;
        this.x+=dx;
        this.y+=dy;
        this.direction=((this.direction+dd)%4+4)%4;
        return 0;
    }
    this.rotate=function(mode){
        /*
         *  Rotate the tetromino with given mode.
         *  Return value: Return the order of wallkick if success,
         *      otherwise return 5.
         */
        var dd=mode==0?-1:1;
        for(var i=0;i<5;i++){
            if(this.transfer(
                this.prototype.wallkickdata[
                    2*this.direction+mode
                ][i].x,
                this.prototype.wallkickdata[
                    2*this.direction+mode
                ][i].y,
                dd)==0){
                if(this.prototype==prototype_tetrominoes[5]&&i)
                    stdout=this.prototype.name+'-Spin<br>'+stdout;
                return i;
            }
        }
        return 5;
    }
    this.drop=function(){
        board.insert(this);
        board.update_html();
        this.become_next();
        this.return_source();
    }
    this.softdrop=function(){
        if(this.transfer(0,-1,0))
            return 1;
        this.reset_autofall();
        return 0;
    }
    this.harddrop=function(){
        while(this.transfer(0,-1,0)==0);
        this.drop();
    }
    this.build_html=function(){
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
                    board.count_rows-(this.y+this.prototype.size)
                ))+'px;\
                "></div>\
            <div \
                id="div_tetris"\
                style="\
                position:absolute;\
                background-color:white;\
                left:'+(17*this.x)+'px;\
                top:'+(17*(
                    board.count_rows-(this.y+this.prototype.size)
                ))+'px;\
                "></div>';
        div_board.innerHTML+=output;
    }
    this.update_html=function(){
        var output;
        output='';
        var div_tetris=document.getElementById('div_tetris');
        div_tetris.style.left=''+(17*this.x)+'px';
        div_tetris.style.top=''+(17*(
            board.count_rows_visible-(this.y+this.prototype.size)
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
            board.count_rows_visible-(y_shadow+this.prototype.size)
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
    this.autofall=function(){
        this.set_autofall();
        if(this.transfer(0,-1,0))
            this.drop();
        this.update_html();
    }
    this.set_autofall=function(){
        this.id_timeout_autofall=setTimeout(
            function(){tetromino.autofall();},
            this.time_ms__autofall
        );
    }
    this.unset_autofall=function(){
        clearTimeout(this.id_timeout_autofall);
    }
    this.reset_autofall=function(){
        this.unset_autofall();
        this.set_autofall();
    }
}
var Status=function(){
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
    tetromino=new Tetromino(
        queue_prototype_tetrominoes.access(0)
    ),
    board=new Board,
    board_hold=new BoardHold(tetromino),
    board_next=new BoardNext(tetromino,queue_prototype_tetrominoes),
    status_game=new Status,
    stdout=''
queue_prototype_tetrominoes.pop();
board.build_html();
board.update_html();
board_hold.build_html();
board_hold.update_html();
board_next.build_html();
board_next.update_html();
tetromino.build_html();
tetromino.update_html();
tetromino.set_autofall();
var keys={},times_key={};
var timeout_keyevents;
var onkeydown_body=function(event){
    keys[event.which]=true;
    times_key[event.which]=0;
}
var onkeyup_body=function(event){
    delete keys[event.which];
}
var keyevents=function(){
    timeout_keyevents=setTimeout(function(){keyevents();},50);
    if(keys[32]){    // space: hard drop
            if(times_key[32]%4==0)
                tetromino.harddrop();
    }
    if(keys[37]){    // left arrow
        if(times_key[37]%2==0)
            tetromino.transfer(-1,0,0);
    }
    if(keys[38]){    // up arrow: 順時鐘轉
        if(times_key[38]%4==0)
            tetromino.rotate(1);
    }
    if(keys[39]){    // right arrow
        if(times_key[39]%2==0)
            tetromino.transfer(1,0,0);
    }
    if(keys[40]){    // down arrow: soft drop
        if(times_key[40]%2==0)
            tetromino.softdrop();
    }
    if(keys[67]){    // c: hold
        if(times_key[67]%4==0)
            board_hold.hold();
        board_hold.update_html();
    }
    if(keys[88]){    // x: 順時鐘轉
        if(times_key[88]%4==0)
            tetromino.rotate(1);
    }
    if(keys[90]){    // z: 逆時鐘轉
        if(times_key[90]%4==0)
            tetromino.rotate(0);
    }
    for(var i=0;i<128;i++)
        if(keys[i])
            times_key[i]++;
    tetromino.update_html();
    status_game.update_html();
}
keyevents();
document.body.onkeydown=onkeydown_body
document.body.onkeyup=onkeyup_body
//})
})
