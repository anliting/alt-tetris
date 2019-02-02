/*
    fixing-unexpected bug:
        *anlitingModule* is polluted.
        *__moduleArgs__*, and *__moduleI__* cannot be shared.
*/
;(eval=>{
    let
        module={
            rootScript:this==this.window&&document.currentScript,
        }
    module._normalize=path=>{
        return(/\/\//.test(path)?
            (path=>{
                let url=new URL(path)
                return url.href
            })
        :
            (path=>{
                let url=new URL(path,'http://a/')
                return url.pathname.substring(1)
            })
        )(path)
    }
    module._resources={}
    module.pathPrefix=''
    module.repository={}
    module._module={}
    module._resolveModule={}
    // start level 0
    module.share=function(o){
        let result=Object.create(this)
        result._sharedArguments=Object.create(this._sharedArguments)
        for(let i in o)
            result._sharedArguments[i]=o[i]
        return result
    }
    module.moduleByPath=async function(path){
        if(this._module[path])
            return this._module[path]
        return this._module[path]=(async()=>{
            let pathString=JSON.stringify(path)
            let script=Object.assign(document.createElement('script'),{
                type:'module',
                textContent:`
                    import m from ${pathString}
                    anlitingModule._resolveModule[${pathString}](m)
                `
            })
            document.body.appendChild(script)
            let res=await new Promise(rs=>this._resolveModule[path]=rs)
            document.body.removeChild(script)
            return res
        })()
    }
    module.extractByPath=function(path,target,options={}){
        options.suffix=`;(${target})`
        return this.importByPath(path,options)
    }
    module.getByPath=async function(path){
        if(this._resources[path]!=undefined)
            return this._resources[path]
        let rq=new XMLHttpRequest
        rq.open('GET',path)
        rq.send()
        return new Promise(rs=>
            rq.onreadystatechange=()=>
                rq.readyState==4&&rq.status==200&&rs(rq.responseText)
        )
    }
    module.importByPath=async function(path,options={}){
        options.arguments=options.arguments
        options.mode==undefined&&(options.mode=0)
        return eval({
            module:options.mode==1&&(()=>{
                let m=Object.create(this)
                m.arguments=options.arguments
                m.pathPrefix=path.replace(/[^\/]*$/,'')
                m.repository=Object.create(this.repository)
                return m
            })(),
            program:
                (this.debug?`// ${path}\n`:'')+
                (await this.getByPath(path))+
                (options.suffix||''),
            mode:options.mode,
        })
    }
    module.scriptByPath=async function(path){
        let script=document.createElement('script')
        script.src=path
        document.body.appendChild(script)
        await new Promise(rs=>script.onload=rs)
        document.body.removeChild(script)
    }
    module.styleByPath=async function(path){
        let style=document.createElement('style')
        style.innerHTML=await this.getByPath(path)
        return style
    }
    module.staticByPath=function(path,content){
        this._resources[path]=content
    }
    // end level 0
    // start level 1
    module.module=function(path){
        return this.moduleByPath('./'+this._normalize(this.pathPrefix+path))
    }
    module.import=function(path,options={}){
        options.mode=0
        return this.importByPath(this._normalize(this.pathPrefix+path),options)
    }
    module.shareImport=function(path,options={}){
        options.mode=1
        return this.importByPath(this._normalize(this.pathPrefix+path),options)
    }
    module.extract=function(path,target,options){
        return this.extractByPath(this._normalize(
            this.pathPrefix+path
        ),target,options)
    }
    module.style=function(path){
        return this.styleByPath(this._normalize(this.pathPrefix+path))
    }
    module.get=function(path){
        return this.getByPath(this._normalize(this.pathPrefix+path))
    }
    module.worker=function(path){
        return this.workerByPath(this.pathPrefix+path)
    }
    module.static=function(path,content){
        return this.staticByPath(
            this._normalize(this.pathPrefix+path),
            content
        )
    }
    // end level 1
    module.workerByPath=function(path){
        let
            w=new Worker(/https?:/.test(path)?passby(path):path),
            moduleWorker={}
        w.postMessage(`
(()=>{
    let module={}
    module.port=0
    module.onResponse={}
    module.pathPrefix=''
    module.importByPath=async function(path){
        let module=Object.create(this)
        module.pathPrefix=path.replace(/[^\/]*$/,'')
        return eval(await this.get(path))
    }
    module.import=function(path){
        return this.importByPath(this.pathPrefix+path)
    }
    module.get=function(path){
        let port=this.port++
        postMessage({
            function:'request',
            port,
            path,
        })
        return new Promise(rs=>
            this.onResponse[port]=rs
        )
    }
    onmessage=e=>{
        let d=e.data
        if(d.function=='response'){
            module.onResponse[d.port](d.content)
        }else if(d.function=='message'){
            if(module.onmessage)
                module.onmessage(d.content)
        }
    }
    return module
})()
        `)
        w.onmessage=async e=>{
            if(typeof e.data=='object'&&e.data.function=='request'){
                w.postMessage({
                    function:'response',
                    port:e.data.port,
                    content:await this.get(e.data.path),
                })
            }else{
                if(moduleWorker.onmessage)
                    moduleWorker.onmessage(e)
            }
        }
        moduleWorker.postMessage=content=>{
            w.postMessage({
                function:'message',
                content,
            })
        }
        moduleWorker.terminate=()=>{
            w.terminate()
        }
        return moduleWorker
        function passby(path){
            return URL.createObjectURL(new Blob([
                `importScripts('${path}')`
            ],{type:'text/javascript'}))
        }
    }
    module._sharedArguments={}
    if(module.rootScript){
        document.currentScript.__module=module
        let dataset=document.currentScript.dataset
        window.anlitingModule=module
        if(dataset.main)
            module.shareImport(
                dataset.main,
                {arguments:dataset.args&&JSON.parse(dataset.args)}
            )
    }
    return module
})(eval=>{
    if(eval.mode==0)
        return window.eval(`(()=>eval(${
            JSON.stringify(eval.program)
        }))()`)
    eval.module._sharedArguments.module=eval.module
    eval.module._temp=eval
    {
        let __moduleArgs__=eval.module._sharedArguments
        eval=window.eval
        for(let __moduleI__ in __moduleArgs__)
            eval(`var ${__moduleI__}=__moduleArgs__[__moduleI__]`)
    }
    return eval(module._temp.program)
})
