function doe(n){
    let
        state=0,
        p={
            function:f=>f(n),
            number,
            object,
            string,
        };
    transform([...arguments].slice(1));
    return n
    function number(n){
        state=n;
    }
    function object(o){
        if(o instanceof Array)
            array();
        else if(o instanceof Node)
            n[state?'removeChild':'appendChild'](o);
        else if(('length' in o)||o[Symbol.iterator]){
            o=Array.from(o);
            array();
        }else if(state)
            Object.entries(o).map(([a,b])=>n.setAttribute(a,b));
        else
            Object.assign(n,o);
        function array(){
            o.map(transform);
        }
    }
    function string(s){
        n.appendChild(document.createTextNode(s));
    }
    function transform(t){
        for(let q;q=p[typeof t];t=q(t));
    }
}
let methods={
    html(){
        return doe(document.documentElement,...arguments)
    },
    head(){
        return doe(document.head,...arguments)
    },
    body(){
        return doe(document.body,...arguments)
    },
};
var doe$1 = new Proxy(doe,{
    get:(t,p)=>methods[p]||function(){
        return doe(document.createElement(p),...arguments)
    }
})

let shape=[
    [
        [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0],
        ],[
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
        ],[
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
        ],[
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
        ]
    ],[
        [
            [1,0,0],
            [1,1,1],
            [0,0,0],
        ],[
            [0,1,1],
            [0,1,0],
            [0,1,0],
        ],[
            [0,0,0],
            [1,1,1],
            [0,0,1],
        ],[
            [0,1,0],
            [0,1,0],
            [1,1,0],
        ]
    ],[
        [
            [0,0,1],
            [1,1,1],
            [0,0,0],
        ],[
            [0,1,0],
            [0,1,0],
            [0,1,1],
        ],[
            [0,0,0],
            [1,1,1],
            [1,0,0],
        ],[
            [1,1,0],
            [0,1,0],
            [0,1,0],
        ]
    ],[
        [
            [1,1],
            [1,1],
        ],[
            [1,1],
            [1,1],
        ],[
            [1,1],
            [1,1],
        ],[
            [1,1],
            [1,1],
        ]
    ],[
        [
            [0,1,1],
            [1,1,0],
            [0,0,0],
        ],[
            [0,1,0],
            [0,1,1],
            [0,0,1],
        ],[
            [0,0,0],
            [0,1,1],
            [1,1,0],
        ],[
            [1,0,0],
            [1,1,0],
            [0,1,0],
        ]
    ],[
        [
            [0,1,0],
            [1,1,1],
            [0,0,0],
        ],[
            [0,1,0],
            [0,1,1],
            [0,1,0],
        ],[
            [0,0,0],
            [1,1,1],
            [0,1,0],
        ],[
            [0,1,0],
            [1,1,0],
            [0,1,0],
        ]
    ],[
        [
            [1,1,0],
            [0,1,1],
            [0,0,0],
        ],[
            [0,0,1],
            [0,1,1],
            [0,1,0],
        ],[
            [0,0,0],
            [1,1,0],
            [0,1,1],
        ],[
            [0,1,0],
            [1,1,0],
            [1,0,0],
        ]
    ],
];
let srsWallKick=[
    [
        [[0,0],[-1,0],[+2,0],[-1,+2],[+2,-1]],
        [[0,0],[-2,0],[+1,0],[-2,-1],[+1,+2]],
        [[0,0],[+2,0],[-1,0],[+2,+1],[-1,-2]],
        [[0,0],[-1,0],[+2,0],[-1,+2],[+2,-1]],
        [[0,0],[+1,0],[-2,0],[+1,-2],[-2,+1]],
        [[0,0],[+2,0],[-1,0],[+2,+1],[-1,-2]],
        [[0,0],[-2,0],[+1,0],[-2,-1],[+1,+2]],
        [[0,0],[+1,0],[-2,0],[+1,-2],[-2,+1]],
    ],
    [
        [[0,0],[+1,0],[+1,+1],[0,-2],[+1,-2]],
        [[0,0],[-1,0],[-1,+1],[0,-2],[-1,-2]],
        [[0,0],[+1,0],[+1,-1],[0,+2],[+1,+2]],
        [[0,0],[+1,0],[+1,-1],[0,+2],[+1,+2]],
        [[0,0],[-1,0],[-1,+1],[0,-2],[-1,-2]],
        [[0,0],[+1,0],[+1,+1],[0,-2],[+1,-2]],
        [[0,0],[-1,0],[-1,-1],[0,+2],[-1,+2]],
        [[0,0],[-1,0],[-1,-1],[0,+2],[-1,+2]],
    ],
    ,
    [
        [[0,0],[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0],[0,0]],
        [[0,0],[0,0],[0,0],[0,0],[0,0]],
    ]
];
srsWallKick[2]=srsWallKick[4]=srsWallKick[5]=srsWallKick[6]=srsWallKick[1];
var constant = {
    shape,
    srsWallKick,
}

function isValidTransfer(current,board,dx,dy,dd){
    let
        direction_new=((current.direction+dd)%4+4)%4,
        shape=constant.shape[current.type][direction_new],
        n=shape.length;
    for(let r=0;r<n;r++)
    for(let c=0;c<n;c++)
    if(shape[r][c]){
        let x=current.x+dx+c;
        let y=current.y+dy+n-1-r;
        if(!(
            0<=x&&x<10&&0<=y&&y<24&&
            board[x][y]==undefined
        ))
            return 0
    }
    return 1
}

function Board(){
    this.array=[...Array(10)].map(_=>[]);
}
Board.prototype._isLineClear=function(y){
    for(let x=0;x<10;x++)
        if(this.array[x][y]==undefined)
            return 0
    return 1
};
Board.prototype.put=function(id,direction,x,y){
    let shape=constant.shape[id][direction],n=shape.length;
    for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(shape[r][c])
        this.array[x+c][y+(n-1-r)]=id;
};
Board.prototype.existLineClear=function(){
    for(let y=0;y<24;y++)
        if(this._isLineClear(y))
            return 1
    return 0
};
Board.prototype.clearLine=function(){
    let y_new=0;
    for(let y=0;y<24;y++){
        if(!this._isLineClear(y)){
            for(let x=0;x<10;x++)
                this.array[x][y_new]=this.array[x][y];
            y_new++;
        }
    }
};

function prototypeIn(event){
    this._history.push(event);
    this.to(event[0]);
    switch(event[1]){
        case'setNext':
            this._setNext(event[0],event[2]);
        break
        case'keyDown':
            if(this._status.key[event[2]])
                break
            this._status.key[event[2]]=1;
            switch(event[2]){
                case'C':
                case'c':
                    if(this._status.lineClear)
                        break
                    this._hold(event[0]);
                break
                case'Z':
                case'z':
                    if(!this._status.current)
                        break
                    this._rotate(event[0],0);
                break
                case'ArrowUp':
                case'X':
                case'x':
                    if(!this._status.current)
                        break
                    this._rotate(event[0],1);
                break
                case'ArrowLeft':
                    this._status.horizontalMove={
                        direction:  -1,
                        status:     'first',
                        time:       event[0],
                    };
                    if(
                        this._status.current&&
                        this._isValidTransfer(-1,0,0)
                    )
                        this._transfer(event[0],-1,0,0);
                break
                case'ArrowRight':
                    this._status.horizontalMove={
                        direction:  1,
                        status:     'first',
                        time:       event[0],
                    };
                    if(
                        this._status.current&&
                        this._isValidTransfer(1,0,0)
                    )
                        this._transfer(event[0],1,0,0);
                break
                case' ':
                    if(!this._status.current)
                        break
                    for(;this._isValidTransfer(0,-1,0);)
                        this._transfer(event[0],0,-1,0);
                    this._drop(event[0]);
                break
                case'ArrowDown':
                    this._status.down={
                        mode:'softdrop',
                        start:event[0],
                    };
                    if(
                        this._status.current&&
                        this._isValidTransfer(0,-1,0)
                    )
                        this._transfer(event[0],0,-1,0);
                break
            }
        break
        case'keyUp':
            if(!this._status.key[event[2]])
                break
            this._status.key[event[2]]=0;
            switch(event[2]){
                case'ArrowLeft':
                    if(
                        this._status.horizontalMove&&
                        this._status.horizontalMove.direction==-1
                    )
                        this._status.horizontalMove=undefined;
                break
                case'ArrowRight':
                    if(
                        this._status.horizontalMove&&
                        this._status.horizontalMove.direction==1
                    )
                        this._status.horizontalMove=undefined;
                break
                case'ArrowDown':
                    this._status.down={
                        mode:'gravity',
                        start:event[0],
                    };
                break
            }
        break
    }
}

function prototypeTo(t){
    for(;;){
        let event=[];
        if(this._status.current){
            {
                let eventTime=this._status.down.start+(
                    this._status.down.mode=='gravity'?1e3:50
                );
                if(eventTime<=t)
                    event.push([eventTime,'down']);
            }
            if(this._status.land){
                let eventTime=this._status.land.time+500;
                if(eventTime<=t)
                    event.push([eventTime,'drop']);
            }
            if(this._status.horizontalMove){
                let eventTime=this._status.horizontalMove.time+(
                    this._status.horizontalMove.status=='first'?300:50
                );
                if(eventTime<=t)
                    event.push([eventTime,'horizontalMove']);
            }
        }else if(this._status.clearLine){
            let eventTime=this._status.clearLine.time+125;
            if(eventTime<=t)
                event.push([eventTime,'clearLine']);
        }
        if(!event.length)
            break
        event=event.reduce((a,b)=>a[0]<b[0]?a:b);
        switch(event[1]){
            case'clearLine':
                this._status.clearLine=undefined;
                this._board.clearLine();
                this._getCurrent(t);
            break
            case'drop':
                this._drop(t);
            break
            case'down':
                if(this._isValidTransfer(0,-1,0))
                    this._transfer(t,0,-1,0);
                this._status.down.start=event[0];
            break
            case'horizontalMove':
                if(this._isValidTransfer(
                    this._status.horizontalMove.direction,0,0
                ))
                    this._transfer(
                        t,this._status.horizontalMove.direction,0,0
                    );
                this._status.horizontalMove.status='second';
                this._status.horizontalMove.time=event[0];
            break
        }
    }
}

let initialY=[-2,-1,-1,0,-1,-1,-1];
function Game(){
    this._history=[];
    this._status={
        godChoice:[0,0,0,0,0,0,0],
        key:{},
        down:{
            mode:'gravity',
        },
    };
    this._board=new Board;
}
Game.prototype._checkLand=function(t){
    let land=!this._isValidTransfer(0,-1,0);
    if(!!this._status.land==land)
        return
    this._status.land=this._status.land?undefined:{time:t};
};
Game.prototype._drop=function(t){
    this._board.put(
        this._status.current.type,
        this._status.current.direction,
        this._status.current.x,
        this._status.current.y,
    );
    this._status.current=undefined;
    if(this._board.existLineClear())
        this._status.clearLine={time:t};
    else
        this._getCurrent(t);
};
Game.prototype._getCurrent=function(t){
    if(this._status.next==undefined)
        return
    this._setCurrent(t,this._status.next);
    delete this._status.next;
    this.god.getNext(this._status.godChoice);
};
Game.prototype._hold=function(t){
    if(this._status.hold==undefined){
        if(this._status.current==undefined)
            return
        this._status.hold=this._status.current.type;
        this._getCurrent(t);
    }else if(this._status.current==undefined){
        this._setCurrent(t,this._status.hold);
        this._status.hold=undefined;
    }else{
        let temp=this._status.hold;
        this._status.hold=this._status.current.type;
        this._setCurrent(t,temp);
    }
};
Game.prototype._isValidTransfer=function(dx,dy,dd){
    return isValidTransfer(
        this._status.current,this._board.array,dx,dy,dd
    )
};
Game.prototype._rotate=function(t,mode){
    let
        dd=mode==0?-1:1,
        c=this._status.current,
        wk=constant.srsWallKick[c.type][2*c.direction+mode];
    for(let i=0;i<5;i++)
        if(this._isValidTransfer(wk[i][0],wk[i][1],dd))
            return this._transfer(t,wk[i][0],wk[i][1],dd)
};
Game.prototype._setCurrent=function(t,type){
    this._status.current={
        type,
        direction:0,
        x:5+Math.floor(-constant.shape[type][0].length/2),
        y:20+initialY[type],
    };
    this._status.down.start=t;
    if(this._status.horizontalMove)
        this._status.horizontalMove.time=t;
    this._status.land=undefined;
    this._checkLand(t);
};
Game.prototype._setNext=function(t,next){
    if(this._status.current==undefined)
        this._setCurrent(t,next);
    else
        this._status.next=next;
    this._status.godChoice[next]=1;
    if(this._status.godChoice.reduce((a,b)=>a+b)==7)
        this._status.godChoice=[0,0,0,0,0,0,0];
    if(this._status.next==undefined)
        this.god.getNext(this._status.godChoice);
};
Game.prototype._transfer=function(t,dx,dy,dd){
    this._status.current.x+=dx;
    this._status.current.y+=dy;
    this._status.current.direction=((
        this._status.current.direction+dd
    )%4+4)%4;
    this._checkLand(t);
};
Game.prototype.in=prototypeIn;
Game.prototype.to=prototypeTo;
Object.defineProperty(Game.prototype,'status',{get(){
    let status=Object.create(this._status);
    status.board=this._board.array;
    return status
}});

function God(){
}
God.prototype.getNext=function(choice){
    let a=~~(Math.random()*(7-choice.reduce((a,b)=>a+b)));
    for(let i=0;i<7;i++)
        if(choice[i])
            a++;
        else if(i==a)
            this.game.setNext(i);
};

let color=[
    '#00FFFF',  // Aqua
    '#0000FF',  // Standard Blue
    '#FFA500',  // Standard Orange
    '#FFFF00',  // Standard Yellow
    '#00FF00',  // Standard Lime
    '#800080',  // Standard Purple
    '#FF0000',  // Standard Red
];
function Ui(){
    this.node=doe$1.canvas({
        className:'tetris',tabIndex:-1,width:640,height:480,
        onkeydown:e=>{
            this.game.in(['keyDown',e.key]);
        },
        onkeyup:e=>{
            this.game.in(['keyUp',e.key]);
        },
    });
    this._uiCache={
        context:this.node.getContext('2d',{alpha:false})
    };
}
Ui.prototype._drawBoardAt=function(atX,atY){
    let status=this._status;
    for(let x=0;x<10;x++)
    for(let y=0;y<20;y++){
        this._uiCache.context.fillStyle=
            status.board[x][y]==undefined
        ?
            'black'
        :
            color[status.board[x][y]];
        this._uiCache.context.fillRect(atX+17*x,atY+17*(20-1-y),16,16);
    }
    if(status.current){
        let
            p=this._shadowPosition(),
            c=status.current;
        this._drawTetrominoShapeAt(
            atX+17*p[0],
            atY+17*(20-(p[1]+constant.shape[c.type][0].length)),
            c.type,
            c.direction,
            'gray'
        );
        this._drawTetrominoAt(
            atX+17*status.current.x,
            atY+17*(20-(c.y+constant.shape[c.type][0].length)),
            c.type,
            c.direction
        );
    }
};
Ui.prototype._drawTetrominoAt=function(atX,atY,id,direction=0){
    this._drawTetrominoShapeAt(atX,atY,id,direction,color[id]);
};
Ui.prototype._drawTetrominoShapeAt=function(atX,atY,id,direction,color){
    this._uiCache.context.fillStyle=color;
    let
        shape=constant.shape[id][direction],
        n=shape.length;
    for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(shape[r][c])
        this._uiCache.context.fillRect(atX+17*c,atY+17*r,16,16);
};
Ui.prototype._shadowPosition=function(){
    let status=this._status,delta_y__shadow=0;
    while(isValidTransfer(
        status.current,status.board,0,delta_y__shadow-1,0
    ))
        delta_y__shadow--;
    return[
        status.current.x,
        status.current.y+delta_y__shadow
    ]
};
Ui.prototype.drawGame=function(status){
    this._status=status;
    this._uiCache.context.fillStyle='darkgray';
    this._uiCache.context.fillRect(0,0,640,480);
    this._drawBoardAt(160,80);
    if(status.next!=undefined)
        this._drawTetrominoAt(400,80,status.next);
    if(status.hold!=undefined)
        this._drawTetrominoAt(80,80,status.hold);
};

function processAnimationFrame(){
    let frameStart=performance.now();
    this._game.to(~~frameStart-this._start);
    this._ui.drawGame(this._game.status);
    let frameEnd=performance.now();
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame);
    let s=this._uiPerformanceStatistics;
    if(1e3<=frameStart-s.current.start){
        s.history.push(s.current);
        s.current={
            start:      frameStart,
            frameCount: 0,
            frameTime:  0,
        };
    }
    s.current.frameCount++;
    s.current.frameTime+=frameEnd-frameStart;
}
function Tetris(){
    this._game=new Game;
    this._game.god={
        getNext:choice=>this._god.getNext(choice),
    };
    this._god=new God;
    this._god.game={
        setNext:next=>this._inGame(['setNext',next]),
    };
    this._ui=new Ui;
    this._ui.game={
        in:event=>this._inGame(event),
    };
    this._installation={};
    this._processAnimationFrame=processAnimationFrame.bind(this);
    this.ui=this._ui.node;
}
Tetris.style=``;
Tetris.prototype._inGame=function(a){
    this._game.in([~~performance.now()-this._start,...a]);
};
Tetris.prototype.start=function(){
    this._start=~~performance.now();
    this._god.getNext(this._game.status.godChoice);
};
Tetris.prototype.install=function(){
    this._uiPerformanceStatistics={
        history:    [],
        current:    {
            start:          performance.now(),
            frameCount:     0,
            frameTime:      0,
        }
    };
    this._installation.animationFrameRequest=
        requestAnimationFrame(this._processAnimationFrame);
};
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest);
};

doe$1.head(
    doe$1.style(`
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
);
let tetris=new Tetris;
tetris.install();
doe$1.body(doe$1.div(doe$1.div(tetris.ui)));
tetris.ui.focus();
// hacker access
//window.tetris=tetris
tetris.start();
