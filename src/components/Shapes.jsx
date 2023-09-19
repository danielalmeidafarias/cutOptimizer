import { useState, useEffect, useId } from "react";
import preparoListaCorte from "../functions/preparoListaCorte";
import corte from "../functions/corte";
import Canvas from "./Canvas";

const Shapes = (props) => {    

    let { listaCanvas, listaCorte, espaçosVazios, cutClick, direcaoCorte } = props


    useEffect(() => {

        preparoListaCorte(listaCorte, direcaoCorte)


        if(espaçosVazios.length >= 0) {

            espaçosVazios.map((chapa) => {

                corte(listaCorte, chapa, listaCanvas)
                listaCorte = listaCorte.filter(peca => peca.cortado === false)


            })

        }
        
        while(listaCorte.length > 0) {

            // let chapa = [{w: 2750, h:1850, x:0, y: 0, peca: false}]
            let chapa = [{w: 550, h:370, x:0, y: 0, peca: false}]
            espaçosVazios.push(chapa)
            corte(listaCorte, chapa, listaCanvas)

            listaCorte = listaCorte.filter(peca => peca.cortado === false)

        }


    }, [cutClick])


    return (
        <div className="flex flex-col gap-4">
            {listaCanvas.map( (listaDesenho) => (
                <Canvas key={listaCanvas.indexOf(listaDesenho)} id={listaCanvas.indexOf(listaDesenho)} listaDesenho={listaDesenho.desenhos} size={listaDesenho.size}/>
            ))}
        </div>
    );
}
 
export default Shapes;