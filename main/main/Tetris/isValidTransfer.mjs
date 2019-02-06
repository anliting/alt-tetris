import constant from                './constant.mjs'
function isValidTransfer(current,board,dx,dy,dd){
    let
        direction_new=((current.direction+dd)%4+4)%4,
        shape=constant.shape[current.type][direction_new],
        n=shape.length
    for(let r=0;r<n;r++)
    for(let c=0;c<n;c++)
    if(shape[r][c]){
        let x=current.x+dx+c
        let y=current.y+dy+n-1-r
        if(!(
            0<=x&&x<10&&0<=y&&y<24&&
            board[x][y]==undefined
        ))
            return 0
    }
    return 1
}
export default isValidTransfer
