(function(){
    var y_new=0
    for(var y=0;y<this.count_rows;y++){
        var isfull=1
        for(var x=0;x<this.count_columns;x++)
            isfull=isfull&&this.array[x][y]
        if(!isfull){
            for(var x=0;x<this.count_columns;x++)
                this.array[x][y_new]=this.array[x][y]
            y_new++
        }
    }
    this.update_html()
})
