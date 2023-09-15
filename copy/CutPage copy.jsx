import Shapes from "../components/Shapes";
import preparoListaCorte from "../functions/preparoListaCorte";
import corte from "../functions/corte";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const CutPage = () => {

    const [w, setW] = useState('')
    const [h, setH] = useState('')
    const [quantidade, setQuantidade] = useState('')

    const [listaCorte, setListaCorte] = useState([])

    const [cutClick, setCutClick] = useState(false)
    
    function handleCutClick() {

        setCutClick(true)

    }

    function handleListaCorte() {

        let peca = {peca: true, w: Number(w),h: Number(h), cortado: false, x: null, y: null, quantidade: Number(quantidade)}
        let corte = []
        for(let i = 0; i < peca.quantidade; i++) {

            corte.push({peca: true, w: Number(w),h: Number(h), cortado: false, x: null, y: null})

        }

        setListaCorte([...listaCorte, ...corte])

    }


    return (

        <div>
            <NavBar />

            <input placeholder="Width" className="border-2 border-black" type="text" onChange={(e) => {
                setW(e.target.value)
            }} 
            />    

            <input placeholder="Height" className="border-2 border-black" type="text" onChange={(e) => {
                setH(e.target.value)
            }}  
            />    

            <input placeholder="Quantidade" className="border-2 border-black" type="text" onChange={(e) => {
                setQuantidade(e.target.value)
            }}  
            />    
            
            <button className="border-2 border-black" onClick={() => handleListaCorte()}>Adicionar</button>
            <button className="border-2 border-black" onClick={() => handleCutClick()}>Cortar</button>

            <Cutter listaCorte={listaCorte} cutClick={cutClick}/>

        </div>
    )

}

const Cutter = (props) => {

    const [listaCanvas, setListaCanvas] = useState([])

    const [espaçosVazios, setEspaçosVazios] = useState([])

    // let { listaCorte } = props
    
    let listaCorte = [

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

    ]

    let { cutClick } = props

    const [click, setClick] = useState(false)


    function handleClick() {
        setClick(true)
    }

    useEffect(() => {

        preparoListaCorte(listaCorte)

        console.log(listaCorte)

        while(listaCorte.length > 0) {

            let chapa = [{w: 2750, h:1850, x:0, y: 0, peca: false}]
            espaçosVazios.push(chapa)
            corte(listaCorte, chapa, listaCanvas)

            listaCorte = listaCorte.filter(peca => peca.cortado === false)
    
        }

    }, [click])
    



    return (  
        <div className="w-screen h-full flex flex-col items-center">

            <button className="border-2 border-black" onClick={() => handleClick()}>Cortar</button>
            <Shapes listaCanvas={listaCanvas}/>
        </div>
    );
}
 
export default CutPage;