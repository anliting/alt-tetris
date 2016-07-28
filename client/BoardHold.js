Promise.all([
    npm.events(),
]).then(modules=>{
let EventEmmiter=modules[0]
function BoardHold(tetromino){
    EventEmmiter.call(this)
    this.tetromino=tetromino
}
BoardHold.prototype=Object.create(EventEmmiter.prototype)
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
    this.emit('update_html')
}
Object.defineProperty(BoardHold.prototype,'view',{get(){
    let div=document.createElement('div')
    div.style.position='absolute'
    div.style.left='80px'
    div.style.top='80px'
    this.on('update_html',()=>{
        if(typeof this.prototype=='undefined')
            return
        var div_boardhold=div
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
        div_boardhold.innerHTML=output
    })
    return div
}})
module.export=BoardHold
})
