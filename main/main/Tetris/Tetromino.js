import prototype_tetrominoes from './prototype_tetrominoes.js'
import update_html from './Tetromino/Tetromino.prototype.update_html.js'
import prototypeViewGet from './Tetromino/Tetromino.prototype.view.get.js'
function Tetromino(prototype,queue_prototype_tetrominoes){
    this._node={}
    this.prototype=prototype
    this.queue_prototype_tetrominoes=queue_prototype_tetrominoes
    this.direction=0
    this.x=5+Math.floor(-this.prototype.size/2)
    this.y=20+this.prototype.y_initial__relative
    this.time_ms__autofall=1000
    this.id_timeout_autofall
    this.view=prototypeViewGet.call(this)
}
Tetromino.prototype.become_next=function(){
    this.prototype=this.queue_prototype_tetrominoes.access(0)
    this.queue_prototype_tetrominoes.pop()
}
Tetromino.prototype.return_source=function(){
    this.direction=0
    this.x=5+Math.floor(-this.prototype.size/2)
    this.y=20+this.prototype.y_initial__relative
    this.update_html()
}
Tetromino.prototype.transfer=function(dx,dy,dd){
    if(!this.valid_transfer(dx,dy,dd))
        return 1
    this.x+=dx
    this.y+=dy
    this.direction=((this.direction+dd)%4+4)%4
    return 0
}
Tetromino.prototype.rotate=function(mode){
    /*
     *  Rotate the tetromino with given mode.
     *  Return value: Return the order of wallkick if success,
     *      otherwise return 5.
     */
    let dd=mode==0?-1:1
    for(let i=0;i<5;i++)
        if(this.transfer(
            this.prototype.wallkickdata[
                2*this.direction+mode
            ][i][0],
            this.prototype.wallkickdata[
                2*this.direction+mode
            ][i][1],
            dd
        )==0)
            return i
    return 5
}
Tetromino.prototype.softdrop=function(){
    if(this.transfer(0,-1,0))
        return 1
    this.reset_autofall()
    return 0
}
Tetromino.prototype.harddrop=function(){
    while(this.transfer(0,-1,0)==0);
    this.drop()
}
Tetromino.prototype.update_html=update_html
Tetromino.prototype.autofall=function(){
    this.set_autofall()
    if(this.transfer(0,-1,0))
        this.drop()
    this.update_html()
}
Tetromino.prototype.set_autofall=function(){
    this.id_timeout_autofall=setTimeout(
        ()=>{this.autofall()},
        this.time_ms__autofall
    )
}
Tetromino.prototype.unset_autofall=function(){
    clearTimeout(this.id_timeout_autofall)
}
Tetromino.prototype.reset_autofall=function(){
    this.unset_autofall()
    this.set_autofall()
}
export default Tetromino