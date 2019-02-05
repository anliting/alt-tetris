function Board(){
    this.array=[...Array(10)].map(_=>[])
}
Board.prototype.insert=function(tetromino){
    for(let r=0;r<tetromino.prototype.size;r++)
    for(let c=0;c<tetromino.prototype.size;c++)
    if(tetromino.prototype.array[tetromino.direction][r][c])
        this.array[tetromino.x+c][
            tetromino.y+(tetromino.prototype.size-1-r)
        ]=
            tetromino.prototype.color
}
Board.prototype.update=function(){
    let y_new=0
    for(let y=0;y<24;y++){
        let isfull=1
        for(let x=0;x<10;x++)
            isfull=isfull&&this.array[x][y]
        if(!isfull){
            for(let x=0;x<10;x++)
                this.array[x][y_new]=this.array[x][y]
            y_new++
        }
    }
}
export default Board
