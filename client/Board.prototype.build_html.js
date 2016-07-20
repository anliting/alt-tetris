module.export=function(){
    var div_board=document.getElementById('div_board');
    var output='';
    output='<div \
        id="div_backcells"\
        style="\
        position:absolute;\
        left:0px;\
        top:0px;\
        "></div>';
    div_board.innerHTML=output;
}
