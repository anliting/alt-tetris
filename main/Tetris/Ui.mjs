import doe from                     '../../lib/doe.mjs'
import constant from                './constant.mjs'
import isValidTransfer from         './isValidTransfer.mjs'
let
    hslColor=[
        [180,   1, .5],
        [240,   1, .5],
        [39,    1, .5],
        [60,    1, .5],
        [120,   1, .5],
        [300,   1, .25],
        [0,     1, .5],
    ],
    backgroundColor='#888',
    width=640,
    height=480
function hslCss(a){
    return`hsl(${a[0]},${100*a[1]}%,${100*a[2]}%)`
}
function hslaCss(a){
    return`hsla(${a[0]},${100*a[1]}%,${100*a[2]}%,${a[3]})`
}
function Ui(){
    this.node=doe.canvas({
        className:'ui',
        tabIndex:-1,
        width:640,
        height:480,
        onkeydown:e=>{
            e.preventDefault()
            e.stopPropagation()
            this.game.in(['keyDown',e.key])
        },
        onkeyup:e=>{
            e.preventDefault()
            e.stopPropagation()
            this.game.in(['keyUp',e.key])
        },
        oncontextmenu:e=>{
            e.preventDefault()
            e.stopPropagation()
        },
    })
    this._uiCache={
        context:this.node.getContext('2d',{alpha:false})
    }
    this._uiCache.context.fillStyle=backgroundColor
    this._uiCache.context.fillRect(0,0,640,480)
    this._status={
        board:[...Array(10)].map(()=>({}))
    }
}
Ui.prototype._drawBlockAt=function(id,atX,atY,shadow){
    shadow=shadow?.5:1
    this._uiCache.context.fillStyle=hslaCss([
        ...hslColor[id],
        shadow
    ])
    this._uiCache.context.fillRect(atX,atY,16,16)
}
Ui.prototype._drawBoardAt=function(atX,atY){
    let status=this._status
    for(let x=0;x<10;x++)
    for(let y=0;y<20;y++)
        if(status.board[x][y]==undefined){
            this._uiCache.context.fillStyle='black'
            this._uiCache.context.fillRect(atX+17*x,atY+17*(20-1-y),16,16)
        }else
            this._drawBlockAt(status.board[x][y],atX+17*x,atY+17*(20-1-y))
    if(status.current){
        let
            p=this._shadowPosition(),
            c=status.current
        this._drawTetrominoShapeAt(
            atX+17*p[0],
            atY+17*(20-(p[1]+constant.shape[c.type][0].length)),
            c.type,
            c.direction,
            1
        )
        this._drawTetrominoAt(
            atX+17*status.current.x,
            atY+17*(20-(c.y+constant.shape[c.type][0].length)),
            c.type,
            c.direction
        )
    }
}
Ui.prototype._drawTetrominoAt=function(atX,atY,id,direction=0){
    this._drawTetrominoShapeAt(atX,atY,id,direction)
}
Ui.prototype._drawTetrominoShapeAt=function(atX,atY,id,direction,shadow){
    let
        shape=constant.shape[id][direction],
        n=shape.length
    for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(shape[r][c])
        this._drawBlockAt(id,atX+17*c,atY+17*r,shadow)
}
Ui.prototype._shadowPosition=function(){
    let status=this._status,delta_y__shadow=0
    while(isValidTransfer(
        status.current,status.board,0,delta_y__shadow-1,0
    ))
        delta_y__shadow--
    return[
        status.current.x,
        status.current.y+delta_y__shadow
    ]
}
Ui.prototype.set=function(set){
    if('board' in set)
        this._status.board=set.board
    if('current' in set)
        this._status.current=set.current
    if(
        'board' in set||
        'current' in set
    ){
        this._uiCache.context.fillStyle=backgroundColor
        this._uiCache.context.fillRect(width/2-84,12,169,407)
        this._drawBoardAt(width/2-84,80)
    }
    if('next' in set){
        this._status.next=set.next
        this._uiCache.context.fillStyle=backgroundColor
        this._uiCache.context.fillRect(width-120-67,80,67,67)
        if(this._status.next!=undefined)
            this._drawTetrominoAt(width-120-67,80,this._status.next)
    }
    if('hold' in set){
        this._status.hold=set.hold
        this._uiCache.context.fillStyle=backgroundColor
        this._uiCache.context.fillRect(120,80,67,67)
        if(this._status.hold!=undefined)
            this._drawTetrominoAt(120,80,this._status.hold)
    }
}
export default Ui
