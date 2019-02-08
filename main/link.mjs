import rollup from 'rollup'
let skip=[]
async function link(input,file){
    let bundle=await rollup.rollup({
        input,
        external:s=>skip.includes(s),
    })
    await bundle.write({
        file,
        format:'es',
        paths:s=>skip.includes(s)&&s,
    })
}
link(`Tetris.mjs`,`Tetris.static.mjs`)
link(`test/main.mjs`,`test/main.static.mjs`)
