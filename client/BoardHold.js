var BoardHold=function(tetromino){
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
module.export=BoardHold
