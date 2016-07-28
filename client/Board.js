Promise.all([
    module.import('Board.prototype.update_html.js'),
    module.import('Board.prototype.build_html.js'),
    module.import('Board.prototype.update.js'),
    module.import('Board.prototype.insert.js'),
]).then(modules=>{
var Board=function(){
    this.count_columns=10;
    this.count_rows=24;
    this.count_rows_visible=20;
    // start initializing this.array
    this.array=new Array(this.count_columns);
    for(var x=0;x<this.count_columns;x++){
        this.array[x]=new Array(this.count_rows);
        for(var y=0;y<this.count_rows;y++)
            this.array[x][y]=0;
    }
    // end initializing
}
Board.prototype.update_html=modules[0]
Board.prototype.build_html=modules[1]
Board.prototype.update=modules[2]
Board.prototype.insert=modules[3]
Object.defineProperty(Board.prototype,'view',{get(){
    let
        boardDiv=document.createElement('div')
    boardDiv.id='div_board'
    boardDiv.style.position='absolute'
    boardDiv.style.left='160px'
    boardDiv.style.top='80px'
    return boardDiv
}})
module.export=Board
})
