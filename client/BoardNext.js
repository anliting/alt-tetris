module.export=BoardNext
BoardNext.prototype.build_html=function(){
}
BoardNext.prototype.update_html=function(){
    this.prototype=this.queue_prototype_tetrominoes.access(0)
    var div_boardnext=document.getElementById('div_boardnext')
    var output='';
    for(let r=0;r<this.prototype.size;r++){
        for(let c=0;c<this.prototype.size;c++){
            if(this.prototype.array[this.tetromino.direction]
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
function BoardNext(tetromino,queue_prototype_tetrominoes){
    this.tetromino=tetromino
    this.queue_prototype_tetrominoes=queue_prototype_tetrominoes
}
