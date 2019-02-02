export default function(array,first,last){
    /*
     *  Arrange values in range [first,last) of array randomly.
     *  Return Value: None.
     */
    while(first!=last){
        var k=first+Math.floor((last-first)*Math.random());
        // start swaping array[first] and array[k]
        var temp;
        temp=array[first];
        array[first]=array[k];
        array[k]=temp;
        // end swaping
        first++;
    }
}
