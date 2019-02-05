import constant from '../constant.mjs'
function Board(){
    this.array=[...Array(10)].map(_=>[])
}
Board.prototype.put=function(id,direction,x,y){
    let shape=constant.shape[id][direction],n=shape.length
    for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(shape[r][c])
        this.array[x+c][y+(n-1-r)]=id
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
