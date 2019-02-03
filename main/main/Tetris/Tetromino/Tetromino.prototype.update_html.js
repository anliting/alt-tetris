export default function(){
    let
        output=''
    var div_tetris=this._node.tetris
    div_tetris.style.left=''+(17*this.x)+'px'
    div_tetris.style.top=''+(17*(
        this.board.count_rows_visible-(this.y+this.prototype.size)
    ))+'px'
    for(let i=0;i<this.prototype.size;i++)
        for(let j=0;j<this.prototype.size;j++)
            output+='<div \
                    style="\
                    width:16px;\
                    height:16px;\
                    position:absolute;\
                    background-color:'+(
                            this.prototype.array
                                [this.direction][i][j]
                            ?this.prototype.color
                            :'none'
                            )+';\
                    top:'+(17*i)+'px;\
                    left:'+(17*j)+'px;\
                    "></div>'
    // Set the focus. 設定焦點。
    output+='<div \
        style="\
        color:white;\
        width:16px;\
        height:16px;\
        position:absolute;\
        text-align:center;\
        top:'+(17*this.prototype.size/2-9)+'px;\
        left:'+(17*this.prototype.size/2-9)+'px;\
        ">O</div>'
    div_tetris.innerHTML=output
    var div_shadow=this._node.shadow
    output=''
    var delta_y__shadow=0
    while(this.valid_transfer(0,delta_y__shadow-1,0))
        delta_y__shadow--
    var x_shadow=this.x,y_shadow=this.y+delta_y__shadow
    div_shadow.style.left=''+(17*x_shadow)+'px'
    div_shadow.style.top=''+(17*(
        this.board.count_rows_visible-(y_shadow+this.prototype.size)
    ))+'px'
    for(let i=0;i<this.prototype.size;i++)
        for(let j=0;j<this.prototype.size;j++)
            output+='<div \
                    style="\
                    width:16px;\
                    height:16px;\
                    position:absolute;\
                    background-color:'+(
                            this.prototype.array[this.direction][i][j]
                            ?'gray'
                            :'none'
                            )+';\
                    top:'+(17*i)+'px;\
                    left:'+(17*j)+'px;\
                    "></div>'
    div_shadow.innerHTML=output
}
