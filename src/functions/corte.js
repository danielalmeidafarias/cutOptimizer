const corte = (listaCorte, espaçosVazios, listaCanvas, direcaoCorte) => {
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

        let espaçoSemelhante = espaçosVazios.find((espaço) => espaço.h === peca.h)

        if(espaçoSemelhante) {

            const index = espaçosVazios.indexOf(espaçoSemelhante)
            const handler = espaçosVazios[index]

            espaçosVazios[index] = espaçosVazios[0]
            espaçosVazios[0] = handler

        }

        console.log(espaçosVazios)


        espaçosVazios.map(espaço => {
  
            if(peca.w > espaço.w && peca.h <= espaço.w && peca.w <= espaço.h && direcaoCorte === false) {

                let pecaW = peca.w
                let pecaH = peca.h

                peca.w = pecaH
                peca.h = pecaW

            }

            if(peca.w * peca.h > espaço.w * espaço.h) {
                return
            } 

            else if(peca.w === espaço.w && peca.h === espaço.h && peca.cortado === false) {
                peca.x = espaço.x
                peca.y = espaço.y

                espaço.w = null
                espaço.h = null
                espaço.x = null
                espaço.y = null

                peca.cortado = true
            } 

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
            
        })



    })

    listaCanvas.push(listaDesenhos)

}


export default corte