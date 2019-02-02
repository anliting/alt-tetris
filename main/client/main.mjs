import doe from './doe.mjs'
import Tetris from './main/Tetris.js'
let tetris=new Tetris
doe.body(
    doe.div(div=>{
        div.style.position='fixed'
        div.style.backgroundColor='darkgray'
        div.style.top='50%'
        div.style.left='50%'
        div.style.marginTop='-240px'
        div.style.marginLeft='-320px'
    },tetris.view)
)
tetris.setup()
