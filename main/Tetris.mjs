import Game from                    './Tetris/Game.mjs'
import God from                     './Tetris/God.mjs'
import Ui from                      './Tetris/Ui.mjs'
function processAnimationFrame(){
    let computeStart=performance.now()
    this._game.to(~~computeStart-this._start)
    if(this._setUi.length){
        let set={}
        for(let s of this._setUi)
            set[s[0]]=s[1]
        this._setUi=[]
        this._ui.set(set)
    }
    let computeEnd=performance.now()
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame)
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
    this._game=new Game
    this._game.god={
        getNext:choice=>{
            setTimeout(()=>this._god.getNext(choice),1000)
        },
    }
    this._game.ui={
        set:set=>this._setUi.push(set),
    }
    this._god=new God
    this._god.game={
        setNext:next=>{
            setTimeout(()=>this._inGame(['setNext',next]),1000)
        },
    }
    this._ui=new Ui
    this._ui.game={
        in:event=>this._inGame(event),
    }
    this._setUi=[]
    this._installation={}
    this._processAnimationFrame=processAnimationFrame.bind(this)
    this.ui=this._ui.node
}
Tetris.style=``
Tetris.prototype._inGame=function(a){
    this._game.in([~~performance.now()-this._start,...a])
}
Tetris.prototype._frameSecond=null
Tetris.prototype.start=function(){
    this._start=~~performance.now()
    this._god.getNext(this._game.status.godChoice)
}
Tetris.prototype.install=function(){
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame)
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
Tetris.prototype.frameSecond=null
export default Tetris
