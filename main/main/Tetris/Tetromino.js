function Tetromino(prototype){
    this.prototype=prototype
    this.direction=0
    this.x=5+Math.floor(-this.prototype.size/2)
    this.y=20+this.prototype.y_initial__relative
    this.time_ms__autofall=1000
    this.id_timeout_autofall
}
export default Tetromino
