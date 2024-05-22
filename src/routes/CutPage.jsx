import Shapes from "../components/Shapes";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { SavedListContext } from "../context/SavedListContext";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { Checkbox } from "@mui/material";

const CutPage = () => {

    const apiUrl = import.meta.env.API_ADDRESS

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

    const [direcaoCorte, setDirecaoCorte] = useState(false)

    // const { sessionId } = useContext(LoginContext)

    const [sessionId, setSessionId] = useState(sessionStorage.getItem('userId'))

    const { savedList } = useContext(SavedListContext)

    async function getSavedList() {

        await axios.get(`${apiUrl}/listas/${sessionId}/${savedList}`)
        .then((response) => {
            console.log(response.data.lista)
            setListagem([...response.data.lista])
        })
        .catch((err) => {
            console.error(err)
        })

    }

    async function saveData() {

        await axios.post(`${apiUrl}/listas/${sessionId}`, {
            lista: listagem,
            date: new Date(Date.now())
        })
        . then()
        .catch((err) => {
            console.error(err)
        })

    }

    function handleDeleteLista(index) {

        const modifiedListagem = [...listagem]
        modifiedListagem.splice(index, 1)

        setListagem([...modifiedListagem])

    }

    function handleDirecaoCorte() {

        setDirecaoCorte(!direcaoCorte)

    }


    function reload() {

        localStorage.clear()
        window.location.reload()

    }

    function saveLocal() {

        localStorage.setItem('listagemData', JSON.stringify(listagem))

        localStorage.setItem('storageHandler', '1')

        window.location.reload()

    }

    function handleListaCorte() {

        const novaPeca = {
            peca: true,
            w: Number(w),
            h: Number(h),
            cortado: false,
            x: null,
            y: null,
            quantidade: Number(quantidade)
        }
        
          setListagem([...listagem, novaPeca])
        
          setW('')
          setH('')
          setQuantidade('')

    }

    function handleEspaçosVazios() {

        let chapa = [{w: Number(wChapa), h: Number(hChapa), y: 0, x: 0, peca: false}]

        setEspaçosVazios([...espaçosVazios, chapa])

        setWChapa('')
        setHChapa('')

    }


    useEffect(() => {
        setStorageHandler(JSON.parse(localStorage.getItem('storageHandler')))
      
        const listagemData = JSON.parse(localStorage.getItem('listagemData'))
        if (listagemData) {
          setListagem([...listagemData])
        }
      
        localStorage.setItem('storageHandler', '0')

    }, [storageHandler])

    useEffect(() => {
        
        const newListaCorte = listagem.reduce((acc, peca) => {
          const corte = Array.from({ length: peca.quantidade }, () => ({
            peca: true,
            w: peca.w,
            h: peca.h,
            cortado: false,
            x: null,
            y: null
          }))
          return [...acc, ...corte];
        }, [])
      
        setListaCorte(newListaCorte);
    }, [listagem]);


    useEffect(() => {

        if(savedList)  {
            getSavedList()
        }

    }, [])

    useEffect(() => {

        setListaCorte([...listaCorte])

    }, [cutClick])

    return (

        <div className="flex flex-col gap-5">
            <NavBar />
            
            <div className="flex w-screen flex-col md:flex-row">

                <div className="w-[190%] md:w-2/5 flex flex-col gap-3 px-4">
                    
                        <div className="flex md:flex-col gap-2">
                            <p className="text-2xl font-extrabold text-zinc-800">Peças:</p>
                            <Input type='number' className={'w-16 md:w-24 text-xs md:text-md'} value={w} placeholder="Largura" onChange={(e) => {
                                setW(e.target.value)
                            }}/>   
                            <Input type='number' className={'w-16 md:w-24 text-xs md:text-md'} value={h} placeholder="Altura" onChange={(e) => {
                                setH(e.target.value)
                            }}/> 
                            <Input type='number' className={'w-16 md:w-24 text-xs md:text-md'} value={quantidade} placeholder="Qntd" onChange={(e) => {
                                setQuantidade(e.target.value)
                            }}/>
                            <BsFillPlusSquareFill 
                            className="cursor-pointer text-zinc-800 hover:text-black"
                            size={30}
                            onClick={handleListaCorte}
                            />

                        </div>

                        
                        <div className="w-1/2 overflow-y-scroll h-60 px-2 border-2 border-zinc-600 rounded-md shadow-md shadow-zinc-400">
                            <h2 className="font-extrabold text-zinc-800 text-xl md:text-2xl">Lista de Corte</h2>
                            {listagem.map((peca) => (

                                <div key={listagem.indexOf(peca)} className="flex items-center gap-1">
                                    <p 
                                    className="font-thin text-xl" 
                                    
                                    id={listagem.indexOf(peca)}
                                    >{`${peca.w} x ${peca.h} ${peca.quantidade > 1 ? `x ${peca.quantidade}` : ''}`}</p> 
                                    <AiFillCloseCircle 
                                    color="#27272a"
                                    className="cursor-pointer"
                                    size={25}
                                    onClick={() => {handleDeleteLista(listagem.indexOf(peca))}}
                                    />

                                </div>
                            ))}
                        </div>

                        <div className="flex items-center">
                            <Checkbox 
                            color="info"
                            onChange={handleDirecaoCorte}
                            />
                            <p className="text-lg font-semibold">Corte unidirecional</p>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex flex-col gap-2">
                                <Button onClick={() => setCutClick(!cutClick)} content="CORTAR" className="w-28"/>
                                <Button onClick={saveLocal} content="REFAZER" className="w-28"/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Button  onClick={reload} content="LIMPAR" className="w-28"/>
                                <Button content="SALVAR" className="w-28" onClick={() => saveData()}/>
                            </div>
                        </div>




                </div>

                <div className="w-full md:w-3/5 flex flex-col gap-3 px-5 mt-5 md:mt-0">
                    <div className="flex flex-col md:flex-row gap-2">
                        <p className="text-xl md:text-2xl font-extrabold text-zinc-800">Chapa:</p>

                        <div className="flex gap-1 items-center">
                            <Input value={wChapa} type='number' className={'w-24'} placeholder="Largura" onChange={(e) => {
                            setWChapa(e.target.value)
                            }}/>
                            <Input value={hChapa} type='number'className={'w-24'} placeholder="Altura" onChange={(e) => {
                            setHChapa(e.target.value)
                            }}/>
                            <BsFillPlusSquareFill className="cursor-pointer text-zinc-800 hover:text-black" size={30} onClick={handleEspaçosVazios}/>
                        </div>

                        

                    </div>
                    <Shapes cutClick={cutClick}  espaçosVazios={espaçosVazios} listaCanvas={listaCanvas} listaCorte={listaCorte} direcaoCorte={direcaoCorte}/>
                </div>


            </div>

            
        </div>
    )

}

 
export default CutPage;
