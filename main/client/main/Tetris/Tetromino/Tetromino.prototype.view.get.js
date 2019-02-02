let get=function(){
    let
        div=document.createElement('div')
    div.appendChild(createShadowDiv(
        17*this.x,
        17*(
            this.board.count_rows-(this.y+this.prototype.size)
        )
    ))
    div.appendChild(createTetrisDiv(
        17*this.x,
        17*(
            this.board.count_rows-(this.y+this.prototype.size)
        )
    ))
    return div
}
function createShadowDiv(left,top){
    let div=document.createElement('div')
    div.id='div_shadow'
    div.style.position='absolute'
    div.style.backgroundColor='white'
    div.style.left=left+'px'
    div.style.top=top+'px'
    return div
}
function createTetrisDiv(left,top){
    let div=document.createElement('div')
    div.id='div_tetris'
    div.style.position='absolute'
    div.style.backgroundColor='white'
    div.style.left=left+'px'
    div.style.top=top+'px'
    return div
}
export default get
