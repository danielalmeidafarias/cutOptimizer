const corte = (listaCorte, espaçosVazios, listaCanvas) => {
    const canvasSize = {w: espaçosVazios[0].w, h: espaçosVazios[0].h}
    
    let listaDesenhos = {
        size: canvasSize,
        desenhos: []
    }

    listaCorte.map(peca => {

        for(let i = 0; i < espaçosVazios.length - 1; i++) {
            for(let j = i + 1; j < espaçosVazios.length; j++ ) {
                
                let espaçoI = espaçosVazios[i]
                let espaçoJ = espaçosVazios[j]

                if(espaçoI.w * espaçoI.h > espaçoJ.w * espaçoJ.h) {
                    espaçosVazios[i] = espaçoJ
                    espaçosVazios[j] = espaçoI
                }
                 
            }
        }


        espaçosVazios.map(espaço => {
  

            // 1. a1 < a2
            if(peca.w * peca.h > espaço.w * espaço.h) {
                return
            } 
            // 3. w1 == w2 && h1 == h2
            else if(peca.w === espaço.w && peca.h === espaço.h && peca.cortado === false) {
                peca.x = espaço.x
                peca.y = espaço.y

                espaço.w = null
                espaço.h = null
                espaço.x = null
                espaço.y = null

                peca.cortado = true
            } 
            // 4. w1 == w2 && h1 > h2
            else if(peca.w === espaço.w && peca.h < espaço.h && peca.cortado === false) {
                peca.x = espaço.x
                peca.y = espaço.y
                let sobra = {
                    w: espaço.w,
                    h: espaço.h - peca.h,
                    x: espaço.x, 
                    y: espaço.y + peca.h
                }
                espaço.w = null
                espaço.h = null
                espaço.x = null
                espaço.y = null

                peca.cortado = true

                espaçosVazios.push(sobra)
                listaDesenhos.desenhos.push(peca, sobra)
            } 
            // 5. w1 > w2 && h1 == h2
            else if(peca.h === espaço.h && peca.w < espaço.w && peca.cortado === false){
                peca.x = espaço.x
                peca.y = espaço.y
                let sobra = {
                    w: espaço.w - peca.w,
                    h: espaço.h,
                    x: espaço.x + peca.w,
                    y: espaço.y
                }
                espaço.w = null
                espaço.h = null
                espaço.x = null
                espaço.y = null

                peca.cortado = true

                espaçosVazios.push(sobra)
                listaDesenhos.desenhos.push(peca, sobra)

            }
            // 6. h1 > w2 && h1 > h2
            else if(peca.w < espaço.w && peca.h < espaço.h && peca.cortado === false) {
                peca.x = espaço.x
                peca.y = espaço.y
                let sobra1 = {
                    w: espaço.w - peca.w,
                    h: peca.h,
                    x: espaço.x + peca.w,
                    y: espaço.y
                }
                let sobra2 = {
                    w: espaço.w,
                    h: espaço.h - peca.h,
                    x: espaço.x,
                    y: espaço.y + peca.h
                }
                espaço.w = null
                espaço.h = null
                espaço.y = null
                espaço.x = null

                peca.cortado = true

                listaDesenhos.desenhos.push(peca, sobra1, sobra2)
                espaçosVazios.push(sobra1, sobra2)

            }
            
            


            // 2. w1 < w2
            // if(peca.w > espaço.w || peca.h > espaço.h) {
            //     let pecaW = peca.w
            //     let pecaH = peca.h

            //     peca.w = pecaH
            //     peca.h = pecaW

            //     if(peca.w > espaço.w) {
            //         peca.w = pecaW
            //         peca.h = pecaH
            //         return
            //     }
            // }  
        })



    })

    // console.log(listaDesenhos)
    listaCanvas.push(listaDesenhos)

}


export default corte