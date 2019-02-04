export default function(){
    var y_new=0
    for(var y=0;y<24;y++){
        var isfull=1
        for(var x=0;x<10;x++)
            isfull=isfull&&this.array[x][y]
        if(!isfull){
            for(var x=0;x<10;x++)
                this.array[x][y_new]=this.array[x][y]
            y_new++
        }
    }
    this.update_html()
}
