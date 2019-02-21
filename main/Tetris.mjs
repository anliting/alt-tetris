import doe from             '../lib/doe.mjs'
import SinglePlayer from    './Tetris/SinglePlayer.mjs'
function processAnimationFrame(){
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame)
    let computeStart=performance.now()
    if(this._status[0]=='game')
        this._singlePlayer.processAnimationFrame()
    let computeEnd=performance.now()
    if(!this.frameSecond)
        return
    let computeEndPoint=~~computeEnd
    if(!this._frameSecond)
        this._frameSecond={
            start:      computeEndPoint,
            count:      0,
            time:       0,
        }
    {
        let s=this._frameSecond
        if(1e3<=computeEndPoint-s.start){
            if(this.frameSecond)
                this.frameSecond(s)
            this._frameSecond={
                start:
                    s.start+(~~((computeEndPoint-s.start)/1000))*1000,
                count: 0,
                time:  0,
            }
        }
    }
    this._frameSecond.count++
    this._frameSecond.time+=computeEnd-computeStart
}
function Tetris(){
    this._status=['menu']
    this._singlePlayer=new SinglePlayer
    this._installation={}
    this._processAnimationFrame=processAnimationFrame.bind(this)
    this._node={}
    this.ui=doe.div(
        {className:'tetris'},
        this._node.menu=doe.div(
            {className:'menu'},
            doe.div(
                this._node.startButton=doe.button('Start',{onclick:e=>{
                    e.stopPropagation()
                    this._status=['game']
                    doe(this.ui,
                        1,this._node.menu,
                        0,this._singlePlayer.ui
                    )
                    this._singlePlayer.start()
                    this._singlePlayer.focus()
                }})
            )
        )
    )
}
Tetris.style=`
    .tetris{
        width:640px;
        height:480px;
        background-color:#888;
    }
    .tetris>.menu{
        display:table;
        width:100%;
        height:100%;
    }
    .tetris>.menu>*{
        display:table-cell;
        vertical-align:middle;
        text-align:center;
    }
    .tetris>.ui{
        outline:none;
    }
`
Tetris.prototype._frameSecond=null
Tetris.prototype.install=function(){
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame)
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
Tetris.prototype.focus=function(){
    if(this._status[0]=='menu')
        this._node.startButton.focus()
    if(this._status[0]=='game')
        this._singlePlayer.ui.focus()
}
Tetris.prototype.frameSecond=null
export default Tetris
