import doe from             '../../../lib/doe.mjs'
import insert from          './Board/Board.prototype.insert.js'
import update from          './Board/Board.prototype.update.js'
import update_html from     './Board/Board.prototype.update_html.js'
function Board(){
    this.count_columns=10
    this.count_rows=24
    this.count_rows_visible=20
    this.array=Array(this.count_columns)
    for(let x=0;x<this.count_columns;x++){
        this.array[x]=new Array(this.count_rows)
        for(let y=0;y<this.count_rows;y++)
            this.array[x][y]=0
    }
    this._node={}
    this.view=doe.div(
        n=>{doe(n.style,{
            position:'absolute',
            left:'160px',
            top:'80px',
        })},
        this._node.backCellsDiv=doe.div(n=>{doe(n.style,{
            position:'absolute',
            left:0,
            top:0,
        })}),
    )
}
Board.prototype.insert=insert
Board.prototype.update=update
Board.prototype.update_html=update_html
export default Board
