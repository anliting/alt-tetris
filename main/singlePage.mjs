import doe from         '../lib/doe/main/doe.mjs'
import Tetris from      './Tetris.mjs'
doe.head(
    doe.style(`
        body>div{
            display:table;
            width:100%;
            height:100%;
        }
        body>div>*{
            display:table-cell;
            vertical-align:middle;
            text-align:center;
        }
        body>div>*>*{
            display:inline-block;
            vertical-align:middle;
        }
        ${Tetris.style}
    `)
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
export default tetris
