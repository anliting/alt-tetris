import constant from '../constant.mjs'
function Board(){
    this.array=[...Array(10)].map(_=>[])
}
Board.prototype._isLineClear=function(y){
    for(let x=0;x<10;x++)
        if(this.array[x][y]==undefined)
            return 0
    return 1
}
Board.prototype.put=function(id,direction,x,y){
    let shape=constant.shape[id][direction],n=shape.length
    for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(shape[r][c])
        this.array[x+c][y+(n-1-r)]=id
}
Board.prototype.existLineClear=function(){
    for(let y=0;y<24;y++)
        if(this._isLineClear(y))
            return 1
    return 0
}
Board.prototype.clearLine=function(){
    let y_new=0
    for(let y=0;y<24;y++){
        if(!this._isLineClear(y)){
            for(let x=0;x<10;x++)
                this.array[x][y_new]=this.array[x][y]
            y_new++
        }
    }
}
export default Board
