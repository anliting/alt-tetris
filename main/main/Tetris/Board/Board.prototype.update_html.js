export default function(){
    let
        output=''
    for(let x=0;x<10;x++)
        for(let y=0;y<20;y++){
            let
                r=20-1-y,
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
    this._node.backCellsDiv.innerHTML=output
}
