export default function(t){
    for(;;){
        let event=[]
        if(this._status.current){
            {
                let eventTime=this._status.down.start+(
                    this._status.down.mode=='gravity'?1e3:50
                )
                if(eventTime<=t)
                    event.push([eventTime,'down'])
            }
            if(this._status.land){
                let eventTime=this._status.land.time+500
                if(eventTime<=t)
                    event.push([eventTime,'drop'])
            }
            if(this._status.horizontalMove){
                let eventTime=this._status.horizontalMove.time+(
                    this._status.horizontalMove.status=='first'?300:50,
                )
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
                if(this._isValidTransfer(0,-1,0))
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
