function Status(tetromino,stdout){
    this.tetromino=tetromino
    this.stdout=stdout
    {
        let div=document.createElement('div')
        div.id='div_gamestatus'
        div.style.position='absolute'
        div.style.left='400px'
        div.style.top='160px'
        this.view=div
    }
}
Status.prototype.update_html=function(){
    this.view.innerHTML=
'           Tetromino Type: '+this.tetromino.prototype.name+'<br>\
        '+this.stdout()+'<br>\
';
}
export default Status
