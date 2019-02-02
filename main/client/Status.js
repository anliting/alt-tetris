(()=>{
    function Status(tetromino,stdout){
        this.tetromino=tetromino
        this.stdout=stdout
    }
    Status.prototype.update_html=function(){
        document.getElementById('div_gamestatus').innerHTML=
    '           Tetromino Type: '+this.tetromino.prototype.name+'<br>\
            '+this.stdout()+'<br>\
    ';
    }
    Object.defineProperty(Status.prototype,'view',{get(){
        let
            div=document.createElement('div')
        div.id='div_gamestatus'
        div.style.position='relative'
        div.style.left='400px'
        div.style.top='160px'
        return div
    }})
    return Status
})()
