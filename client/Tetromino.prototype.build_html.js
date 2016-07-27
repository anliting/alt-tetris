module.export=function(){
    var div_board=document.getElementById('div_board')
    var output=''
    output+='\
        <div \
            id="div_shadow"\
            style="\
            position:absolute;\
            background-color:white;\
            left:'+(17*this.x)+'px;\
            top:'+(17*(
                this.board.count_rows-(this.y+this.prototype.size)
            ))+'px;\
            "></div>\
        <div \
            id="div_tetris"\
            style="\
            position:absolute;\
            background-color:white;\
            left:'+(17*this.x)+'px;\
            top:'+(17*(
                this.board.count_rows-(this.y+this.prototype.size)
            ))+'px;\
            "></div>'
    div_board.innerHTML+=output
}
