import doe from         '../../lib/doe.mjs'
import singlePage from  '../singlePage.mjs'
import Tetris from      '../Tetris.mjs'
doe.head(
    doe.style(`${singlePage}${Tetris.style}`)
)
let tetris=new Tetris
tetris.install()
;(async()=>{
    tetris.image=await Promise.all([...Array(7)].map((e,i)=>new Promise(rs=>
        doe.img({src:`Tetris/Ui/${i}.png`,onload(){rs(this)}})
    )))
    doe.body(doe.div(doe.div(tetris.ui)))
    tetris.focus()
})()
