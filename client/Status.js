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
module.export=Status
