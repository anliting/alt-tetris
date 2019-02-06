import doe from                     '../../../lib/doe.mjs'
import constant from                './constant.mjs'
import isValidTransfer from         './isValidTransfer.mjs'
let color=[
    '#00FFFF',  // Aqua
    '#0000FF',  // Standard Blue
    '#FFA500',  // Standard Orange
    '#FFFF00',  // Standard Yellow
    '#00FF00',  // Standard Lime
    '#800080',  // Standard Purple
    '#FF0000',  // Standard Red
]
function Ui(){
    this.node=doe.canvas({
        className:'tetris',tabIndex:-1,width:640,height:480,
        onkeydown:event=>{
            this.game.in(['keyDown',event.key])
        },
        onkeyup:event=>{
            this.game.in(['keyUp',event.key])
        },
    })
    this._uiCache={
        context:this.node.getContext('2d')
    }
}
Ui.prototype._drawBoardAt=function(atX,atY){
    let status=this._status
    for(let x=0;x<10;x++)
    for(let y=0;y<20;y++){
        this._uiCache.context.fillStyle=
            status.board[x][y]==undefined
        ?
            'black'
        :
            color[status.board[x][y]]
        this._uiCache.context.fillRect(atX+17*x,atY+17*(20-1-y),16,16)
    }
    if(status.current){
        let
            p=this._shadowPosition(),
            c=status.current
        this._drawTetrominoShapeAt(
            atX+17*p[0],
            atY+17*(20-(p[1]+constant.shape[c.type][0].length)),
            c.type,
            c.direction,
            'gray'
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
    this._drawTetrominoShapeAt(atX,atY,id,direction,color[id])
}
Ui.prototype._drawTetrominoShapeAt=function(atX,atY,id,direction,color){
    this._uiCache.context.fillStyle=color
    let
        shape=constant.shape[id][direction],
        n=shape.length
    for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(shape[r][c])
        this._uiCache.context.fillRect(atX+17*c,atY+17*r,16,16)
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
Ui.prototype.drawGame=function(status){
    this._status=status
    this._uiCache.context.fillStyle='darkgray'
    this._uiCache.context.fillRect(0,0,640,480)
    this._drawBoardAt(160,80)
    if(status.next!=undefined)
        this._drawTetrominoAt(400,80,status.next)
    if(status.hold!=undefined)
        this._drawTetrominoAt(80,80,status.hold)
}
export default Ui
