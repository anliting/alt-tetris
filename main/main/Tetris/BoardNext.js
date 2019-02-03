import doe from '../../../lib/doe.mjs'
function BoardNext(tetromino,queue_prototype_tetrominoes){
    this.tetromino=tetromino
    this.queue_prototype_tetrominoes=queue_prototype_tetrominoes
    this.view=doe.div(n=>{doe(n.style,{
        position:'absolute',
        left:'400px',
        top:'80px',
    })})
}
BoardNext.prototype.update_html=function(){
    this.prototype=this.queue_prototype_tetrominoes.access(0)
    var output=''
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
    this.view.innerHTML=output
}
export default BoardNext
