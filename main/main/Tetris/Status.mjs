import doe from '../../../lib/doe.mjs'
function Status(tetromino){
    this.tetromino=tetromino
    this.view=doe.div(n=>{doe(n.style,{
        position:'absolute',
        left:'400px',
        top:'160px',
    })})
}
Status.prototype.update_html=function(){
    this.view.innerHTML=
'           Tetromino Type: '+this.tetromino.prototype.name+'<br>\
        '+'<br>\
';
}
export default Status
