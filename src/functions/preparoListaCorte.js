const preparoListaCorte = (listaCorte , direcaoCorte) => {
    listaCorte.map(peca => {
        let pecaw = peca.w + 4
        let pecah = peca.h + 4
        peca.w = pecaw
        peca.h = pecah

        // Deixado as peças na horizontal
        if (peca.h > peca.w && direcaoCorte === false) {
            let pecaH = peca.h
            let pecaW = peca.w
            
            peca.w = pecaH
            peca.h = pecaW
        }    
    })

    // Ordenando a lista de corte em ordem decrescente
    for (let i = 0; i < listaCorte.length; i++) {
        for(let j = i+1; j < listaCorte.length; j++) {
            let pecaI = listaCorte[i]
            let pecaJ = listaCorte[j]
            
            if (((pecaI.w * pecaI.h) < pecaJ.w * pecaJ.h) || (pecaI.w * pecaI.h === pecaI.w * pecaJ.h && pecaI.w < pecaJ.w) || (pecaI.w * pecaI.h === pecaI.w * pecaJ.h && pecaI.w < pecaJ.w && pecaI.h < pecaJ.h) ) {
                listaCorte[i] = pecaJ
                listaCorte[j] = pecaI
            }
        }
    }
}

export default preparoListaCorte