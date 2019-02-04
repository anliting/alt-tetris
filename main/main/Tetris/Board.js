import doe from             '../../../lib/doe.mjs'
import insert from          './Board/Board.prototype.insert.js'
import update from          './Board/Board.prototype.update.js'
import update_html from     './Board/Board.prototype.update_html.js'
function Board(){
    this.array=Array(10)
    for(let x=0;x<10;x++){
        this.array[x]=Array(24)
        for(let y=0;y<24;y++)
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
