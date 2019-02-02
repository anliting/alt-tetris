Promise.all([
    module.shareImport('arrange_random.js'),
    module.shareImport('prototype_tetrominoes.js'),
    npm.events(),
]).then(modules=>{
let
    arrange_random=modules[0],
    prototype_tetrominoes=modules[1],
    EventEmitter=modules[2]
QueuePrototypeTetromino.prototype=Object.create(EventEmitter.prototype)
function QueuePrototypeTetromino(){
    EventEmitter.call(this)
    this.queue=[]
    this.push=function(){
        for(let i=0;i<7;i++)
            this.queue.push(prototype_tetrominoes[i])
        arrange_random(this.queue,this.queue.length-7,this.queue.length)
    }
    this.pop=function(){
        let resolve
        this.emit('pop',new Promise(rs=>{
            resolve=rs
        }))
        this.queue.shift()
        resolve()
    }
    this.access=function(k){
        while(!(k<this.queue.length))
            this.push()
        return this.queue[k]
    }
}
return QueuePrototypeTetromino
})
