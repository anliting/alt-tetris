import doe from '../../../../lib/doe.mjs'
function BoardHold(tetromino){
    this.tetromino=tetromino
    this.view=doe.div(
        n=>{
            n.style.position='absolute'
            n.style.left='80px'
            n.style.top='80px'
        }
    )
}
BoardHold.prototype.hold=function(){
    if(typeof this.prototype=='undefined'){
        this.prototype=this.tetromino.prototype
        this.tetromino.become_next()
    }else{
        var temp=this.prototype
        this.prototype=this.tetromino.prototype
        this.tetromino.prototype=temp
    }
    this.tetromino.return_source()
}
BoardHold.prototype.update_html=function(){
    if(typeof this.prototype=='undefined')
        return
    var output=''
    for(var r=0;r<this.prototype.size;r++){
        for(var c=0;c<this.prototype.size;c++){
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
export default BoardHold
