import arrange_random from './QueuePrototypeTetromino/arrange_random.js'
import prototype_tetrominoes from './prototype_tetrominoes.js'
function QueuePrototypeTetromino(){
    this.queue=[]
    this._push=function(){
        for(let i=0;i<7;i++)
            this.queue.push(prototype_tetrominoes[i])
        arrange_random(this.queue,this.queue.length-7,this.queue.length)
    }
    this.pop=function(){
        let resolve
        this.out.pop(new Promise(rs=>resolve=rs))
        this.queue.shift()
        resolve()
    }
    this.access=function(k){
        while(!(k<this.queue.length))
            this._push()
        return this.queue[k]
    }
}
export default QueuePrototypeTetromino
