import doe from         '../../lib/doe.mjs'
import singlePage from  '../singlePage.mjs'
import Tetris from      '../Tetris.mjs'
doe.head(
    doe.style(`${singlePage}${Tetris.style}`)
)
let tetris=new Tetris
tetris.install()
doe.body(doe.div(doe.div(tetris.ui)))
tetris.focus()
tetris.start()
