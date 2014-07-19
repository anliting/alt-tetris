var arrange_random=function(array,first,last){
    /*
     *  Arrange values in range [first,last) of array randomly.
     *  Return Value: None.
     */
    while(first!=last){
        var k=first+Math.floor((last-first)*Math.random());
        // start swaping array[first] and array[k]
        var temp;
        temp=array[first];
        array[first]=array[k];
        array[k]=temp;
        // end swaping
        first++;
    }
}
var Vector=function(x,y){
    this.x=x;
    this.y=y;
}
var Board=function(){
    this.count_columns=10;
    this.count_rows=24;
    this.count_rows_visible=20;
    // start initializing this.array
    this.array=new Array(this.count_columns);
    for(var x=0;x<this.count_columns;x++){
        this.array[x]=new Array(this.count_rows);
        for(var y=0;y<this.count_rows;y++)
            this.array[x][y]=0;
    }
    // end initializing
    this.insert=function(tetromino){
        for(var r=0;r<tetromino.prototype.size;r++)
            for(var c=0;c<tetromino.prototype.size;c++)
                if(tetromino.prototype.array[tetromino.direction]
                    [r][c]!=0)
                    this.array[tetromino.x+c]
                        [tetromino.y+(tetromino.prototype.size-1-r)]
                        =tetromino.prototype.color;
        setTimeout(function(){board.update();},125);
    }
    this.update=function(){
        var y_new=0;
        for(var y=0;y<this.count_rows;y++){
            var isfull=1;
            for(var x=0;x<this.count_columns;x++)
                isfull=isfull&&this.array[x][y];
            if(!isfull){
                for(var x=0;x<this.count_columns;x++)
                    this.array[x][y_new]=this.array[x][y];
                y_new++;
            }
        }
        this.update_html();
    }
    this.build_html=function(){
        var div_board=document.getElementById('div_board');
        var output='';
        output='<div \
            id="div_backcells"\
            style="\
            position:absolute;\
            left:0px;\
            top:0px;\
            "></div>';
        div_board.innerHTML=output;
    }
    this.update_html=function(){
        var div_backcells=document.getElementById('div_backcells');
        var output='';
        for(var x=0;x<this.count_columns;x++)
            for(var y=0;y<this.count_rows_visible;y++){
                var r=board.count_rows_visible-1-y;
                var c=x;
                output+='<div \
                        style="\
                        background-color:'
                            +(this.array[x][y]!=0
                                ?this.array[x][y]
                                :'black')+';\
                        position:absolute;\
                        width:16px;\
                        height:16px;\
                        top:'+(17*r)+'px;\
                        left:'+(17*c)+'px;\
                        "></div>';
            }
        div_backcells.innerHTML=output;
    }
}
var BoardHold=function(){
    this.hold=function(){
        if(typeof this.prototype=='undefined'){
            this.prototype=tetromino.prototype;
            tetromino.become_next();
        }else{
            var temp=this.prototype;
            this.prototype=tetromino.prototype;
            tetromino.prototype=temp;
        }
        tetromino.return_source();
    }
    this.build_html=function(){
    }
    this.update_html=function(){
        if(typeof this.prototype=='undefined')
            return;
        var div_boardhold=document.getElementById('div_boardhold');
        var output='';
        for(var r=0;r<this.prototype.size;r++){
            for(var c=0;c<this.prototype.size;c++){
                if(this.prototype.array[tetromino.direction]
                    [r][c]){
                    output+=
'                       <div \
                            style="\
                            position:absolute;\
                            background-color:\
                            '+(this.prototype.color)+';\
                            width:16px;\
                            height:16px;\
                            top:'+17*r+'px;\
                            left:'+17*c+'px;\
                            "\
                        ></div>\
';
                }
            }
        }
        div_boardhold.innerHTML=output;
    }
}
var BoardNext=function(){
    this.build_html=function(){
    }
    this.update_html=function(){
        this.prototype=queue_prototype_tetrominoes.access(0);
        var div_boardnext=document.getElementById('div_boardnext');
        var output='';
        for(var r=0;r<this.prototype.size;r++){
            for(var c=0;c<this.prototype.size;c++){
                if(this.prototype.array[tetromino.direction]
                    [r][c]){
                    output+=
'                       <div \
                            style="\
                            position:absolute;\
                            background-color:\
                            '+(this.prototype.color)+';\
                            width:16px;\
                            height:16px;\
                            top:'+17*r+'px;\
                            left:'+17*c+'px;\
                            "\
                        ></div>\
';
                }
            }
        }
        div_boardnext.innerHTML=output;
    }
}
var PrototypeTetromino=function(
        color,
        size,
        y_initial__relative,
        name,
        array,
        wallkickdata){
    this.color=color;
    this.size=size;
    this.y_initial__relative=y_initial__relative;
    this.name=name;
    this.array=array;
    this.wallkickdata=wallkickdata;
}
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
// I J L O S T Z
var prototype_tetrominoes=new Array(7);
prototype_tetrominoes[0]=new PrototypeTetromino(
'#00FFFF'/*Aqua*/,4,-2,'I',[
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],[
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
    ],[
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
    ],[
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
    ]
],[
    [new Vector(0,0),new Vector(-1,0),new Vector(+2,0),new Vector(-1,+2),new Vector(+2,-1)],
    [new Vector(0,0),new Vector(-2,0),new Vector(+1,0),new Vector(-2,-1),new Vector(+1,+2)],
    [new Vector(0,0),new Vector(+2,0),new Vector(-1,0),new Vector(+2,+1),new Vector(-1,-2)],
    [new Vector(0,0),new Vector(-1,0),new Vector(+2,0),new Vector(-1,+2),new Vector(+2,-1)],
    [new Vector(0,0),new Vector(+1,0),new Vector(-2,0),new Vector(+1,-2),new Vector(-2,+1)],
    [new Vector(0,0),new Vector(+2,0),new Vector(-1,0),new Vector(+2,+1),new Vector(-1,-2)],
    [new Vector(0,0),new Vector(-2,0),new Vector(+1,0),new Vector(-2,-1),new Vector(+1,+2)],
    [new Vector(0,0),new Vector(+1,0),new Vector(-2,0),new Vector(+1,-2),new Vector(-2,+1)],
]);
prototype_tetrominoes[1]=new PrototypeTetromino(
'#0000FF'/*Standard Blue*/,3,-1,'J',[
    [
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],[
        [0,1,1],
        [0,1,0],
        [0,1,0],
    ],[
        [0,0,0],
        [1,1,1],
        [0,0,1],
    ],[
        [0,1,0],
        [0,1,0],
        [1,1,0],
    ]
],[
    [new Vector(0,0),new Vector(+1,0),new Vector(+1,+1),new Vector(0,-2),new Vector(+1,-2)],
    [new Vector(0,0),new Vector(-1,0),new Vector(-1,+1),new Vector(0,-2),new Vector(-1,-2)],
    [new Vector(0,0),new Vector(+1,0),new Vector(+1,-1),new Vector(0,+2),new Vector(+1,+2)],
    [new Vector(0,0),new Vector(+1,0),new Vector(+1,-1),new Vector(0,+2),new Vector(+1,+2)],
    [new Vector(0,0),new Vector(-1,0),new Vector(-1,+1),new Vector(0,-2),new Vector(-1,-2)],
    [new Vector(0,0),new Vector(+1,0),new Vector(+1,+1),new Vector(0,-2),new Vector(+1,-2)],
    [new Vector(0,0),new Vector(-1,0),new Vector(-1,-1),new Vector(0,+2),new Vector(-1,+2)],
    [new Vector(0,0),new Vector(-1,0),new Vector(-1,-1),new Vector(0,+2),new Vector(-1,+2)],
]);
prototype_tetrominoes[2]=new PrototypeTetromino(
'#FFA500'/*Standard Orange*/,3,-1,'L',[
    [
        [0,0,1],
        [1,1,1],
        [0,0,0],
    ],[
        [0,1,0],
        [0,1,0],
        [0,1,1],
    ],[
        [0,0,0],
        [1,1,1],
        [1,0,0],
    ],[
        [1,1,0],
        [0,1,0],
        [0,1,0],
    ]
],prototype_tetrominoes[1].wallkickdata);
prototype_tetrominoes[3]=new PrototypeTetromino(
'#FFFF00'/*Standard Yellow*/,2,0,'O',[
    [
        [1,1],
        [1,1],
    ],[
        [1,1],
        [1,1],
    ],[
        [1,1],
        [1,1],
    ],[
        [1,1],
        [1,1],
    ]
],[
    [new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0)],
    [new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0)],
    [new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0)],
    [new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0)],
    [new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0)],
    [new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0)],
    [new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0)],
    [new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0),new Vector(0,0)],
]);
prototype_tetrominoes[4]=new PrototypeTetromino(
'#00FF00'/*Standard Lime*/,3,-1,'S',[
    [
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],[
        [0,1,0],
        [0,1,1],
        [0,0,1],
    ],[
        [0,0,0],
        [0,1,1],
        [1,1,0],
    ],[
        [1,0,0],
        [1,1,0],
        [0,1,0],
    ]
],prototype_tetrominoes[1].wallkickdata);
prototype_tetrominoes[5]=new PrototypeTetromino(
'#800080'/*Standard Purple*/,3,-1,'T',[
    [
        [0,1,0],
        [1,1,1],
        [0,0,0],
    ],[
        [0,1,0],
        [0,1,1],
        [0,1,0],
    ],[
        [0,0,0],
        [1,1,1],
        [0,1,0],
    ],[
        [0,1,0],
        [1,1,0],
        [0,1,0],
    ]
],prototype_tetrominoes[1].wallkickdata);
prototype_tetrominoes[6]=new PrototypeTetromino(
'#FF0000'/*Standard Red*/,3,-1,'Z',[
    [
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],[
        [0,0,1],
        [0,1,1],
        [0,1,0],
    ],[
        [0,0,0],
        [1,1,0],
        [0,1,1],
    ],[
        [0,1,0],
        [1,1,0],
        [1,0,0],
    ]
],prototype_tetrominoes[1].wallkickdata);
