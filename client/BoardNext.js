var BoardNext=function(tetromino,queue_prototype_tetrominoes){
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
module.export=BoardNext
