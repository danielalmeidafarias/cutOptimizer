import Shapes from "../components/Shapes";
import preparoListaCorte from "../functions/preparoListaCorte";
import corte from "../functions/corte";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const CutPage = () => {

    const [listaCanvas, setListaCanvas] = useState([])
    const [espaçosVazios, setEspaçosVazios] = useState([])
    const [listaCorte, setListaCorte] = useState([])
    const [listagem, setListagem] = useState([])

    const [w, setW] = useState('')
    const [h, setH] = useState('')
    const [quantidade, setQuantidade] = useState('')

    const [cutClick, setCutClick] = useState(false)


    function handleListaCorte() {

        let peca = {peca: true, w: Number(w),h: Number(h), cortado: false, x: null, y: null, quantidade: Number(quantidade)}
        setListagem([...listagem, peca])
        let corte = []

        for(let i = 0; i < peca.quantidade; i++) {

            corte.push({peca: true, w: Number(w),h: Number(h), cortado: false, x: null, y: null})

        }

        setListaCorte([...listaCorte, ...corte])

        setW('')
        setH('')
        setQuantidade('')
    }


    useEffect(() => {

        setListaCorte(listaCorte.filter(peca => peca.cortado === false))

    }, [cutClick])


    return (

        <div>
            <NavBar />

            <div className="flex gap-3">
                <input value={w} placeholder="Width" className="border-2 border-black" type="text" onChange={(e) => {
                    setW(e.target.value)
                }} 
                />    

                <input value={h} placeholder="Height" className="border-2 border-black" type="text" onChange={(e) => {
                    setH(e.target.value)
                }}  
                />    

                <input value={quantidade} placeholder="Quantidade" className="border-2 border-black" type="text" onChange={(e) => {
                    setQuantidade(e.target.value)
                }}  
                />    
                
                <button className="border-2 border-black" onClick={handleListaCorte}>Adicionar</button>
                <button className="border-2 border-black" onClick={() => setCutClick(!cutClick)}>Cortar</button>
                <button className="border-2 border-black" onClick={() => window.location.reload()}>Novo Corte</button>
            </div>

            <div>
                <h2>Lista de Corte</h2>
                {listagem.map((peca) => (

                peca.quantidade > 1 ? <p key={listagem.indexOf(peca)}>{`${peca.w} x ${peca.h} x ${peca.quantidade}`}</p> : <p key={listagem.indexOf(peca)}>{`${peca.w} x ${peca.h}`}</p> 

                ))}
            </div>

            <Shapes cutClick={cutClick}  espaçosVazios={espaçosVazios} listaCanvas={listaCanvas} listaCorte={listaCorte}/>
            
        </div>
    )

}

 
export default CutPage;