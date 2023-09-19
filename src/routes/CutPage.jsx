import Shapes from "../components/Shapes";
import preparoListaCorte from "../functions/preparoListaCorte";
import corte from "../functions/corte";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import Button from "../components/Button";

// Lista de tarefas
// [x] Adicionar opção de download de imagens 
// [x] Adicionar opções de tamanho de chapa
// [x] Adicionar modos de corte 
// [x] Melhorar o visual da página
// [] Adicionar função de remover items da lista de corte
// [] Opção de mandar por whatsapp
// [] Backend para salvar imagens e diferentes serviços
// [] Conferir algorítmo
// [] React Native

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

    const [direcaoCorte, setDirecaoCorte] = useState(false)



    function handleDirecaoCorte() {

        setDirecaoCorte(!direcaoCorte)

    }

    function reload() {

        localStorage.clear()
        window.location.reload()

    }

    function saveData() {

        localStorage.setItem('listaCorteData', JSON.stringify(listaCorte.map((peca) => {

            if(peca.cortado === true) {

                peca.cortado = false 
                peca.x = null
                peca.y = null

                peca.h = peca.h - 4
                peca.w = peca.w - 4
        
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

        let chapa = [{w: Number(wChapa), h: Number(hChapa), y: 0, x: 0, peca: false}]

        setEspaçosVazios([...espaçosVazios, chapa])

    }

    useEffect(() => {

        setStorageHandler(JSON.parse(localStorage.getItem('storageHandler')))

        if (listaCorteData) {

            setListaCorte([...listaCorteData])
            setListagem([...listagemData])

        }

        localStorage.setItem('storageHandler', '0')

    }, [storageHandler])

    useEffect(() => {

        setListaCorte([...listaCorte])

    }, [cutClick])


    return (

        <div className="flex flex-col gap-5">
            <NavBar />

            <div className="flex w-screen flex-col md:flex-row">

                <div className="w-full md:w-2/5 flex flex-col gap-3 px-4">
                    
                        <div className="flex flex-col  gap-2">
                            <p className="text-2xl font-semibold">Peças:</p>
                            <Input value={w} placeholder="Largura" onChange={(e) => {
                                setW(e.target.value)
                            }}/>   
                            <Input value={h} placeholder="Altura" onChange={(e) => {
                                setH(e.target.value)
                            }}/> 
                            <Input value={quantidade} placeholder="Quantidade" onChange={(e) => {
                                setQuantidade(e.target.value)
                            }}/>
                            <Button onClick={handleListaCorte} content="Adicionar"/>

                        </div>

                        
                        <div className="w-1/2 overflow-y-scroll h-60 px-2 border-2 border-zinc-600 rounded-md shadow-md shadow-zinc-400">
                            <h2 className="font-semibold text-2xl">Lista de Corte</h2>
                            {listagem.map((peca) => (

                            peca.quantidade > 1 ? <p className="font-thin text-xl" key={listagem.indexOf(peca)}>{`${peca.w} x ${peca.h} x ${peca.quantidade}`}</p> : <p className="font-thin text-xl" key={listagem.indexOf(peca)}>{`${peca.w} x ${peca.h}`}</p> 

                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="checkbox" id="" onChange={handleDirecaoCorte} />
                            <label htmlFor="checkbox" className="text-xl font-semibold">Corte unidirecional</label>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={() => setCutClick(!cutClick)} content="Cortar"/>
                            <Button onClick={saveData} content="Refazer"/>
                            <Button  onClick={reload} content="Novo Corte"/>
                        </div>




                </div>

                <div className="w-full md:w-3/5 flex flex-col gap-3 px-10">
                    <div className="flex flex-col md:flex-row gap-2">
                        <p className="text-2xl font-semibold">Chapa:</p>

                        <Input placeholder="Largura" onChange={(e) => {
                            setWChapa(e.target.value)
                        }}/>
                        <Input placeholder="Altura" onChange={(e) => {
                            setHChapa(e.target.value)
                        }}/>
                        <Button onClick={handleEspaçosVazios} content="Adicionar"/>

                    </div>
                    <Shapes cutClick={cutClick}  espaçosVazios={espaçosVazios} listaCanvas={listaCanvas} listaCorte={listaCorte} direcaoCorte={direcaoCorte}/>
                </div>


            </div>

            
        </div>
    )

}

 
export default CutPage;