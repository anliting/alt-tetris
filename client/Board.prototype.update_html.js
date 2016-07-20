module.export=function(){
    var div_backcells=document.getElementById('div_backcells');
    var output='';
    for(var x=0;x<this.count_columns;x++)
        for(var y=0;y<this.count_rows_visible;y++){
            var r=this.count_rows_visible-1-y;
            var c=x;
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
                    "></div>';
        }
    div_backcells.innerHTML=output;
}
