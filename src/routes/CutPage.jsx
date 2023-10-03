import Shapes from "../components/Shapes";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { SavedListContext } from "../context/SavedListContext";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

// Lista de tarefas
// [x] Adicionar opção de download de imagens 
// [x] Adicionar opções de tamanho de chapa
// [x] Adicionar modos de corte 
// [x] Melhorar o visual da página
// [+-] Conferir algorítmo

// [x] Adicionar função de remover items da lista de corte
// [x] Adicionar tratamento de erro em caso da peca solicitada ser maior que o tamanho de uma chapa
// [x] React Native

// [] Backend para salvar imagens e diferentes serviços

const CutPage = () => {

    const [listaCanvas, setListaCanvas] = useState([])
    const [espaçosVazios, setEspaçosVazios] = useState([])
    const [listagem, setListagem] = useState([])
    const [listaCorte, setListaCorte] = useState([])

    const [w, setW] = useState('')
    const [h, setH] = useState('')
    const [quantidade, setQuantidade] = useState('')

    const [wChapa, setWChapa] = useState('')
    const [hChapa, setHChapa] = useState('')

    const [cutClick, setCutClick] = useState(false)

    const [storageHandler, setStorageHandler] = useState(localStorage.getItem('storageHandler'))

    const [listagemData, setListagemData] = useState(JSON.parse(localStorage.getItem('listagemData')))

    const [direcaoCorte, setDirecaoCorte] = useState(false)

    const { sessionId, setSessionId } = useContext(LoginContext)

    const { savedList, setSavedList } = useContext(SavedListContext)

    async function getSavedList() {

        await axios.get(`http://localhost:3000/listas/${sessionId}/${savedList}`)
        .then((response) => {
            console.log(response.data.lista)
            setListagem([...response.data.lista])
        })
        .catch((err) => {
            console.error(err)
        })

    }

    useEffect(() => {

        if(savedList) getSavedList()

    }, [])

    async function saveData() {

        await axios.post(`http://localhost:3000/listas/${sessionId}`, {
            lista: listagem,
            date: new Date(Date.now())
        })
        . then()
        .catch((err) => {
            console.error(err)
        })

    }

    function handleDirecaoCorte() {

        setDirecaoCorte(!direcaoCorte)

    }

    function handleDeleteLista(index) {

        const modifiedListagem = [...listagem]
        modifiedListagem.splice(index, 1)

        setListagem([...modifiedListagem])

    }

    function reload() {

        localStorage.clear()
        window.location.reload()

    }

    function saveLocal() {

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

    //??
    function handleListaCorte() {

        const novaPeca = {
            peca: true,
            w: Number(w),
            h: Number(h),
            cortado: false,
            x: null,
            y: null,
            quantidade: Number(quantidade)
          };
        
          // Adicione a nova peça à listagem
          setListagem([...listagem, novaPeca]);
        
          // Adicione a nova peça à listaCorte, levando em conta a quantidade
          const corte = Array.from({ length: novaPeca.quantidade }, () => ({
            peca: true,
            w: Number(w),
            h: Number(h),
            cortado: false,
            x: null,
            y: null
          }));
        
          setListaCorte([...listaCorte, ...corte]);
        
          setW('');
          setH('');
          setQuantidade('');

    }

    useEffect(() => {
        setStorageHandler(JSON.parse(localStorage.getItem('storageHandler')));
      
        // Verifique se há dados no localStorage e atualize a listagem, se houver
        const listagemData = JSON.parse(localStorage.getItem('listagemData'));
        if (listagemData) {
          setListagem([...listagemData]);
        }
      
        localStorage.setItem('storageHandler', '0');
    }, [storageHandler]);

    useEffect(() => {
        const newListaCorte = listagem.reduce((acc, peca) => {
          const corte = Array.from({ length: peca.quantidade }, () => ({
            peca: true,
            w: peca.w,
            h: peca.h,
            cortado: false,
            x: null,
            y: null
          }));
          return [...acc, ...corte];
        }, []);
      
        setListaCorte(newListaCorte);
    }, [listagem]);


    // function handleListaCorte() {

    //     let peca = {peca: true, w: Number(w),h: Number(h), cortado: false, x: null, y: null, quantidade: Number(quantidade)}
    //     setListagem([...listagem, peca])

    //     let corte = []

    //     for(let i = 0; i < peca.quantidade; i++) {

    //         corte.push({peca: true, w: Number(w),h: Number(h), cortado: false, x: null, y: null})

    //     }

    //     setListaCorte([...listaCorte, ...corte])


    //     setW('')
    //     setH('')
    //     setQuantidade('')

    // }



    function handleEspaçosVazios() {

        let chapa = [{w: Number(wChapa), h: Number(hChapa), y: 0, x: 0, peca: false}]

        setEspaçosVazios([...espaçosVazios, chapa])

    }

    // useEffect(() => {

    //     setStorageHandler(JSON.parse(localStorage.getItem('storageHandler')))

    //     if (listagemData) {

    //         setListaCorte([...listaCorteData])
    //         setListagem([...listagemData])

    //     }

    //     localStorage.setItem('storageHandler', '0')

    // }, [storageHandler])

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
                            <Input type='number' className={'w-32'} value={w} placeholder="Largura" onChange={(e) => {
                                setW(e.target.value)
                            }}/>   
                            <Input type='number' className={'w-32'} value={h} placeholder="Altura" onChange={(e) => {
                                setH(e.target.value)
                            }}/> 
                            <Input type='number' className={'w-32'} value={quantidade} placeholder="Quantidade" onChange={(e) => {
                                setQuantidade(e.target.value)
                            }}/>
                            <Button onClick={handleListaCorte} content="ADICIONAR" className="w-28"/>

                        </div>

                        
                        <div className="w-1/2 overflow-y-scroll h-60 px-2 border-2 border-zinc-600 rounded-md shadow-md shadow-zinc-400">
                            <h2 className="font-semibold text-2xl">Lista de Corte</h2>
                            {listagem.map((peca) => (

                                <div key={listagem.indexOf(peca)} className="flex items-center gap-1">
                                    <p 
                                    className="font-thin text-xl" 
                                    
                                    id={listagem.indexOf(peca)}
                                    >{`${peca.w} x ${peca.h} ${peca.quantidade > 1 ? `x ${peca.quantidade}` : ''}`}</p> 
                                    <div
                                    className="cursor-pointer bg-zinc-700 w-6 h-6 rounded-sm flex items-center justify-center text-white hover:bg-zinc-800"
                                    onClick={() => {handleDeleteLista(listagem.indexOf(peca))}}
                                    >x</div>

                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="checkbox" id="" onChange={handleDirecaoCorte} />
                            <label htmlFor="checkbox" className="text-xl font-semibold">Corte unidirecional</label>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={() => setCutClick(!cutClick)} content="CORTAR" className="w-28"/>
                            <Button onClick={saveLocal} content="REFAZER" className="w-28"/>
                            <Button  onClick={reload} content="LIMPAR" className="w-28"/>
                            <Button content="SALVAR" className="w-28" onClick={() => saveData()}/>
                        </div>




                </div>

                <div className="w-full md:w-3/5 flex flex-col gap-3 px-10">
                    <div className="flex flex-col md:flex-row gap-2">
                        <p className="text-2xl font-semibold">Chapa:</p>

                        <Input type='number' className={'w-32'} placeholder="Largura" onChange={(e) => {
                            setWChapa(e.target.value)
                        }}/>
                        <Input type='number'className={'w-32'} placeholder="Altura" onChange={(e) => {
                            setHChapa(e.target.value)
                        }}/>
                        <Button onClick={handleEspaçosVazios} content="ADICIONAR" className="w-28"/>

                    </div>
                    <Shapes cutClick={cutClick}  espaçosVazios={espaçosVazios} listaCanvas={listaCanvas} listaCorte={listaCorte} direcaoCorte={direcaoCorte}/>
                </div>


            </div>

            
        </div>
    )

}

 
export default CutPage;