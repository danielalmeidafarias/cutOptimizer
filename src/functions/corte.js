const corte = (listaCorte, espaçosVazios, listaCanvas, direcaoCorte) => {
    const canvasSize = {w: espaçosVazios[0].w, h: espaçosVazios[0].h}
    
    let listaDesenhos = {
        size: canvasSize,
        desenhos: []
    }

    listaCorte.map(peca => {

        // Ordenando os espaços vazios
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


        // Verificando lados semelhantes 
        let espaçoSemelhanteH = espaçosVazios.find((espaço) => espaço.h === peca.h && espaço.w >= peca.w)
        let espaçoSemelhanteW = espaçosVazios.find((espaço) => espaço.h === peca.w && espaço.w >= peca.h)

        if(espaçoSemelhanteH && espaçoSemelhanteW) {

            if(espaçoSemelhanteH.h * espaçoSemelhanteH.w < espaçoSemelhanteW.h * espaçoSemelhanteW.w) {
                const index = espaçosVazios.indexOf(espaçoSemelhanteH)
                const handler = espaçosVazios[index]
    
                espaçosVazios[index] = espaçosVazios[0]
                espaçosVazios[0] = handler
            } else if(espaçoSemelhanteW.h * espaçoSemelhanteW.w < espaçoSemelhanteH.h * espaçoSemelhanteH.w && direcaoCorte === false) {
                let pecaW = peca.w
                let pecaH = peca.h
        
                const index = espaçosVazios.indexOf(espaçoSemelhanteW)
                const handler = espaçosVazios[index]
    
                peca.w = pecaH
                peca.h = pecaW
    
                espaçosVazios[index] = espaçosVazios[0]
                espaçosVazios[0] = handler
            } else {
                if(espaçosVazios.indexOf(espaçoSemelhanteH) < espaçosVazios.indexOf(espaçoSemelhanteW)) {
                    
                    const index = espaçosVazios.indexOf(espaçoSemelhanteH)
                    const handler = espaçosVazios[index]

                    espaçosVazios[index] = espaçosVazios[0]
                    espaçosVazios[0] = handler
                } else if(direcaoCorte === false){
                    let pecaW = peca.w
                    let pecaH = peca.h
            
                    const index = espaçosVazios.indexOf(espaçoSemelhanteW)
                    const handler = espaçosVazios[index]
        
                    peca.w = pecaH
                    peca.h = pecaW
        
                    espaçosVazios[index] = espaçosVazios[0]
                    espaçosVazios[0] = handler
                }
            }

        } else if(espaçoSemelhanteH) {

            const index = espaçosVazios.indexOf(espaçoSemelhanteH)
            const handler = espaçosVazios[index]

            espaçosVazios[index] = espaçosVazios[0]
            espaçosVazios[0] = handler

        } else if (espaçoSemelhanteW && direcaoCorte === false) {
            let pecaW = peca.w
            let pecaH = peca.h
    
            const index = espaçosVazios.indexOf(espaçoSemelhanteW)
            const handler = espaçosVazios[index]

            peca.w = pecaH
            peca.h = pecaW

            espaçosVazios[index] = espaçosVazios[0]
            espaçosVazios[0] = handler

        }


        espaçosVazios.map(espaço => {

            if(peca.w === espaço.w && peca.h === espaço.h && peca.cortado === false) {
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

            } else 
            // Tentativa de virar a peça caso ela nao caiba na horizontal
            if(peca.w > espaço.w && peca.w <= espaço.h && peca.h <= espaço.w && peca.cortado === false && direcaoCorte === false) {
                let pecaW = peca.w
                let pecaH = peca.h

                peca.w = pecaH
                peca.h = pecaW

                if(peca.w === espaço.w && peca.h === espaço.h && peca.cortado === false) {
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
            }


            
        })



    })

    listaCanvas.push(listaDesenhos)

}


export default corte