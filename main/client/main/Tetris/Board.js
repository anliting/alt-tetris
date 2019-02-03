import update_html from     './Board/Board.prototype.update_html.js'
import update from          './Board/Board.prototype.update.js'
import insert from          './Board/Board.prototype.insert.js'
import EventEmmiter from    './EventEmitter.js'
import doe from             '../../../../lib/doe.mjs'
function Board(){
    EventEmmiter.call(this)
    this.count_columns=10
    this.count_rows=24
    this.count_rows_visible=20
    this.array=new Array(this.count_columns)
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
        this._node.backCellsDiv=createBackCellsDiv(),
    )
}
Board.prototype=Object.create(EventEmmiter.prototype)
Board.prototype.update_html=update_html
Board.prototype.update=update
Board.prototype.insert=insert
function createBackCellsDiv(){
    let div=document.createElement('div')
    div.style.position='absolute'
    div.style.left=0
    div.style.top=0
    return div
}
export default Board
