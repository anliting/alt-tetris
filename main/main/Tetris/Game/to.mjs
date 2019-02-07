export default function(t){
    for(;;){
        let event=[]
        if(this._status.current){
            if(this._status.land){
                let eventTime=this._status.land.time+500
                if(eventTime<=t)
                    event.push([eventTime,'drop'])
            }
            {
                let
                    interval=this._status.down.mode=='gravity'?1e3:50,
                    eventTime=this._status.down.start+interval
                if(eventTime<=t)
                    event.push([eventTime,'down'])
            }
            if(this._status.horizontalMove){
                let
                    interval=this._status.horizontalMove.status=='first'?300:50,
                    eventTime=this._status.horizontalMove.time+interval
                if(eventTime<=t)
                    event.push([eventTime,'horizontalMove'])
            }
        }
        if(!event.length)
            break
        event=event.reduce((a,b)=>a[0]<b[0]?a:b)
        switch(event[1]){
            case'drop':
                this._drop(t)
            break
            case'down':
                this._isValidTransfer(0,-1,0)
                    this._transfer(t,0,-1,0)
                this._status.down.start=event[0]
            break
            case'horizontalMove':
                if(this._isValidTransfer(
                    this._status.horizontalMove.direction,0,0
                ))
                    this._transfer(
                        t,this._status.horizontalMove.direction,0,0
                    )
                this._status.horizontalMove.status='second'
                this._status.horizontalMove.time=event[0]
            break
        }
    }
}
