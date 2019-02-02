import doe from '../../lib/doe.mjs'
import Tetris from './main/Tetris.mjs'
let tetris=new Tetris
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
            display:inline-block;
            position:relative;
            background-color:darkgray;
            line-height:1;
        }
    `)
)
doe.body(doe.div(doe.div(doe.div(tetris.view))))
tetris.setup()
