import doe from         '../../lib/doe.mjs'
import Tetris from      '../Tetris.mjs'
doe.head(
    doe.style(`
        html{
            height:100%;
        }
        body{
            height:100%;
            margin:0;
        }
        body>div{
            display:table;
            width:100%;
            height:100%;
        }
        body>div>*{
            display:table-cell;
            vertical-align:middle;
            text-align:center;
            line-height:0;
        }
        body>div>*>*{
            line-height:1;
            outline:none;
        }
        ${Tetris.style}
    `)
)
let tetris=new Tetris
tetris.install()
doe.body(doe.div(doe.div(tetris.ui)))
tetris.ui.focus()
tetris.start()
