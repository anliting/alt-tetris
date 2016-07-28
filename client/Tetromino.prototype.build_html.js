module.export=function(){
    let
        div_board=document.getElementById('div_board')
    div_board.appendChild(createShadowDiv(
        17*this.x,
        17*(
            this.board.count_rows-(this.y+this.prototype.size)
        )
    ))
    div_board.appendChild(createTetrisDiv(
        17*this.x,
        17*(
            this.board.count_rows-(this.y+this.prototype.size)
        )
    ))
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
