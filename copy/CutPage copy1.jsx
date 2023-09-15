import Shapes from "../components/Shapes";
import preparoListaCorte from "../functions/preparoListaCorte";
import corte from "../functions/corte";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const CutPage = () => {

    const [listaCanvas, setListaCanvas] = useState([])

    const [espaçosVazios, setEspaçosVazios] = useState([])

    const [listaCorte, setListaCorte] = useState([])


    const [w, setW] = useState('')
    const [h, setH] = useState('')

    const [addClick, setAddClick] = useState(false)
    
    useEffect(() => {

        preparoListaCorte(listaCorte)
    
        setAddClick(false)

    },[addClick])


    function handleListaCorte() {
       
        // let corte = {peca: true, w: Number(w),h: Number(h), cortado: false, x: null, y: null}

        // setListaCorte([...listaCorte, corte])

        setListaCorte([

            {peca: true, w: 600,h: 1950, cortado: false, x: null, y: null},
            {peca: true, w: 600,h: 1950, cortado: false, x: null, y: null},
            {peca: true, w: 600,h: 730, cortado: false, x: null, y: null},
            {peca: true, w: 600,h: 730, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 1950, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 1950, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 730, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 730, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 730, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 730, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 730, cortado: false, x: null, y: null},
            {peca: true, w: 250,h: 450, cortado: false, x: null, y: null},
            {peca: true, w: 250,h: 450, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 400, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 400, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 400, cortado: false, x: null, y: null},
            {peca: true, w: 100,h: 400, cortado: false, x: null, y: null},
            {peca: true, w: 120,h: 450, cortado: false, x: null, y: null},
            {peca: true, w: 120,h: 450, cortado: false, x: null, y: null},
            {peca: true, w: 120,h: 450, cortado: false, x: null, y: null},
            {peca: true, w: 120,h: 450, cortado: false, x: null, y: null},
            {peca: true, w: 110,h: 350, cortado: false, x: null, y: null},
            {peca: true, w: 110,h: 350, cortado: false, x: null, y: null},
            {peca: true, w: 110,h: 350, cortado: false, x: null, y: null},
            {peca: true, w: 110,h: 350, cortado: false, x: null, y: null},
            {peca: true, w: 400,h: 130, cortado: false, x: null, y: null},
            {peca: true, w: 400,h: 130, cortado: false, x: null, y: null},
            {peca: true, w: 300,h: 195, cortado: false, x: null, y: null},
    
        ])

        setW('')
        setH('')

        setAddClick(true)

        console.log(listaCanvas)

    }    


    

    // function handleCorte() {

    //     let chapa = [{w: 2750 , h:1850 , x:0, y: 0, peca: false}]

    //     setEspaçosVazios([...chapa])
    //     // espaçosVazios.push(chapa)

    //     const data =  corte(listaCorte, chapa)

    //     setListaCanvas(data.listaCanvas)

    //     setEspaçosVazios(data.espaçosVazios)


    //     // setListaCorte([...listaCorte,listaCorte.filter(peca => peca.cortado === false)])

    // }

    function handleCorte() {

        // while(listaCorte.length > 0) {

            let chapa = [{w: 2750 , h:1850 , x:0, y: 0, peca: false}]

            setEspaçosVazios(chapa)

            const data = corte(listaCorte, chapa)

            setListaCanvas(data.listaCanvas)

            setEspaçosVazios(data.espaçosVazios)

            setListaCorte(listaCorte.filter(peca => peca.cortado === false))

           


        // }       
        
        if(listaCorte.length > 0) {


            let chapa = [{w: 2750 , h:1850 , x:0, y: 0, peca: false}]

            setEspaçosVazios(...chapa)


            const data = corte(listaCorte, chapa)

            setListaCanvas(data.listaCanvas)

            setEspaçosVazios(data.espaçosVazios)

            setListaCorte(listaCorte.filter(peca => peca.cortado === false))

        }

    }

    useEffect(() => {
        console.log(espaçosVazios)
    },[espaçosVazios])

    return (  
        <div className="w-screen h-full flex flex-col items-center">
            <NavBar />
            <input className="border-2 border-black" type="text" value={w} onChange={(e) => {
                setW(e.target.value)
            }}/>
            <input className="border-2 border-black" type="text" value={h} onChange={(e) => {
                setH(e.target.value)
            }}/>
            <button className="border-2 border-black" onClick={() => handleListaCorte()}>Adicionar</button>
            <button className="border-2 border-black" onClick={() => handleCorte()}>Cortar</button>

            <Shapes listaCanvas={listaCanvas}/>
        </div>
    );
}
 
export default CutPage;