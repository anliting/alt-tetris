import update_html from './Board/Board.prototype.update_html.js'
import update from './Board/Board.prototype.update.js'
import insert from './Board/Board.prototype.insert.js'
import EventEmmiter from './EventEmitter.js'
function Board(){
    EventEmmiter.call(this)
    this.count_columns=10
    this.count_rows=24
    this.count_rows_visible=20
    // start initializing this.array
    this.array=new Array(this.count_columns)
    for(let x=0;x<this.count_columns;x++){
        this.array[x]=new Array(this.count_rows)
        for(let y=0;y<this.count_rows;y++)
            this.array[x][y]=0
    }
    // end initializing
}
Board.prototype=Object.create(EventEmmiter.prototype)
Board.prototype.update_html=update_html
Board.prototype.update=update
Board.prototype.insert=insert
Object.defineProperty(Board.prototype,'view',{get(){
    let
        div=document.createElement('div'),
        backCellsDiv=createBackCellsDiv()
    // to-do: remove id
    div.id='div_board'
    div.style.position='absolute'
    div.style.left='160px'
    div.style.top='80px'
    div.appendChild(backCellsDiv)
    this.on('update_html',()=>{
        let
            output=''
        for(let x=0;x<this.count_columns;x++)
            for(let y=0;y<this.count_rows_visible;y++){
                let
                    r=this.count_rows_visible-1-y,
                    c=x
                output+='<div \
                        style="\
                        background-color:'
                            +(this.array[x][y]!=0
                                ?this.array[x][y]
                                :'black')+';\
                        position:absolute;\
                        width:16px;\
                        height:16px;\
                        top:'+(17*r)+'px;\
                        left:'+(17*c)+'px;\
                        "></div>'
            }
        backCellsDiv.innerHTML=output
    })
    return div
}})
function createBackCellsDiv(){
    let div=document.createElement('div')
    div.style.position='absolute'
    div.style.left=0
    div.style.top=0
    return div
}
export default Board
