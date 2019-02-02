module.shareImport('Tetris.js').then(Tetris=>{
    let tetris=new Tetris,div=document.createElement('div')
    div.style.position='fixed'
    div.style.backgroundColor='darkgray'
    div.style.top='50%'
    div.style.left='50%'
    div.style.marginTop='-240px'
    div.style.marginLeft='-320px'
    div.appendChild(tetris.view)
    document.body.appendChild(div)
    tetris.setup()
})
