import Shapes from "../components/Shapes";
import preparoListaCorte from "../functions/preparoListaCorte";
import corte from "../functions/corte";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

// Lista de tarefas
// [x] Adicionar opção de download de imagens 
// [] Adicionar opções de tamanho de chapa
// [] Adicionar modos de corte 
// [] Adicionar função de remover items da lista de corte
// [] Melhorar o visual da página
// [] Opção de mandar por whatsapp
// [] Backend para salvar imagens e diferentes serviços

const CutPage = () => {

    const [listaCanvas, setListaCanvas] = useState([])
    const [espaçosVazios, setEspaçosVazios] = useState([])
    const [listaCorte, setListaCorte] = useState([])
    const [listagem, setListagem] = useState([])

    const [w, setW] = useState('')
    const [h, setH] = useState('')
    const [quantidade, setQuantidade] = useState('')

    const [wChapa, setWChapa] = useState('')
    const [hChapa, setHChapa] = useState('')

    const [cutClick, setCutClick] = useState(false)

    const [storageHandler, setStorageHandler] = useState(localStorage.getItem('storageHandler'))
    const [listaCorteData, setListaCorteData] = useState(JSON.parse(localStorage.getItem('listaCorteData')))
    const [listagemData, setListagemData] = useState(JSON.parse(localStorage.getItem('listagemData')))



    useEffect(() => {

        setStorageHandler(JSON.parse(localStorage.getItem('storageHandler')))

        if (listaCorteData) {

            setListaCorte([...listaCorteData])
            setListagem([...listagemData])

        }

        localStorage.setItem('storageHandler', '0')

    }, [storageHandler])


    function reload() {

        localStorage.clear()
        window.location.reload()

    }

    function saveData() {

        localStorage.setItem('listaCorteData', JSON.stringify(listaCorte.map((peca) => {

            if(peca.cortado === true) {

                peca.cortado = false 

                let pecaw = peca.w * 5
                let pecah = peca.h * 5
                peca.w = pecaw - 4
                peca.h = pecah - 4
                peca.x = null
                peca.y = null
        
            }

            return peca

        })))
        localStorage.setItem('listagemData', JSON.stringify(listagem))

        localStorage.setItem('storageHandler', '1')

        window.location.reload()

    }


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

    function handleEspaçosVazios() {

        let chapa = [{w: Number(wChapa)/5, h: Number(hChapa)/5, y: 0, x: 0, peca: false}]

        setEspaçosVazios([...espaçosVazios, chapa])

    }


    useEffect(() => {

        setListaCorte([...listaCorte])

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
                <button className="border-2 border-black" onClick={saveData}>Refazer</button>
                <button className="border-2 border-black" onClick={reload}>Novo Corte</button>
            </div>

            <div className="flex gap-3">
                <input className="border-2 border-black" type="text" onChange={(e) => {
                    setWChapa(e.target.value)
                }} />
                <input className="border-2 border-black" type="text" onChange={(e) => {
                    setHChapa(e.target.value)
                }} />
                <button className="border-2 border-black" onClick={handleEspaçosVazios}>Adicionar chapa</button>
            </div>

            <div>
                <h2>Lista de Corte</h2>
                {listagem.map((peca) => (

                peca.quantidade > 1 ? <p key={listagem.indexOf(peca)}>{`${peca.w} x ${peca.h} x ${peca.quantidade}`}</p> : <p key={listagem.indexOf(peca)}>{`${peca.w} x ${peca.h}`}</p> 

                ))}
            </div>

            <div className="flex w-screen h-full flex-col items-center">
                <Shapes cutClick={cutClick}  espaçosVazios={espaçosVazios} listaCanvas={listaCanvas} listaCorte={listaCorte}/>

            </div>

            
        </div>
    )

}

 
export default CutPage;