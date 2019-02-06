export default function(t){
    for(;this._status.current;){
        let event=[]
        if(this._status.land){
            if(500<=t-this._status.land.time)
                event.push([this._status.land.time,'drop'])
        }else{
            let interval=this._status.down.mode=='gravity'?1e3:50
            if(interval<=t-this._status.down.start)
                event.push([this._status.down.start,'down',interval])
        }
        if(
            this._status.horizontalMove&&
            this._isValidTransfer(
                this._status.horizontalMove.direction,0,0
            )
        ){
            let interval=this.status.horizontalMove.status=='first'?400:50
            if(interval<=t-this.status.horizontalMove.time)
                event.push([
                    this.status.horizontalMove.time,
                    'horizontalMove',
                    interval,
                ])
        }
        if(!event.length)
            break
        event=event.reduce((a,b)=>a[0]<b[0]?a:b)
        switch(event[1]){
            case'drop':
                this._drop(t)
            break
            case'down':
                this._transfer(t,0,-1,0)
                this._status.down.start+=event[2]
            break
            case'horizontalMove':
                this._transfer(
                    t,this._status.horizontalMove.direction,0,0
                )
                this._status.horizontalMove.status='second'
                this._status.horizontalMove.time+=event[2]
            break
        }
    }
}
