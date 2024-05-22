import { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const LoginPage = () => {
    
    const apiUrl = import.meta.env.VITE_API_ADDRESS

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [haveAccount, setHaveAccount] = useState(true)

    const { sessionId, setSessionId } = useContext(LoginContext)
    
    const [error, setError] = useState('')


    const handleLogin = async () => {  

        await axios.post(`${apiUrl}/login`, {
            email: email,
            password: senha
        }) .then((response) => {
            sessionStorage.setItem('userId', response.data.id)
            setSessionId(response.data.id)

        }) .catch((err) => {
            setError('Erro ao realizar o login')
        })

    }

    const handleCreateUser = async () => {

        await axios.post(`${apiUrl}/login/create`, {
            email: email,
            password: senha
        }) .then((response) => {
            sessionStorage.setItem('userId', response.data.id)
            setSessionId(response.data.id)


        }) .catch((err) => {
            setError('Erro ao criar usuário')
        })

    }

    return (  
        <div>
            {!sessionId ? (
                <div className="w-screen h-screen flex flex-col items-center bg-zinc-200 pt-[5vh]">

                <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-800 pb-14">{'<CutOptimizer/>'}</h1>

                    <div className="gap-4 bg-zinc-300 w-[300px] flex flex-col items-center p-4 rounded-md shadow-lg shadow-zinc-800 ">
                        <h1 className="text-zinc-800 text-4xl font-extrabold">{haveAccount ? `Fazer login` : 'Criar conta'}</h1>
                        <div className="bg-zinc-400  p-4 rounded-md h-52 flex flex-col gap-7 items-center">
                            <form action="post" className="flex flex-col items-center gap-3">
                                <Input onChange={(e) => {
                                    setEmail(e.target.value)
                                }} type='email' className="w-full shadow-zinc-600" placeholder='Email'/>
                                <Input onChange={(e) => {
                                    setSenha(e.target.value)
                                }} type='password' className="w-full shadow-zinc-600" placeholder='Senha'/>
                            </form>
                            <Button content={haveAccount ? `Login` : `Criar`} onClick={haveAccount ? handleLogin : handleCreateUser} className="w-3/4 shadow-zinc-800" type='submit'/>
                            <p className="text-zinc-700">{haveAccount ? `Não possui conta?` : 'Já possui conta?'}<span onClick={() => {
                                setHaveAccount(!haveAccount)
                            }} className="text-zinc-800 hover:underline hover:text-zinc-900 cursor-pointer font-bold">Clique aqui</span></p>
            
                        </div>


                    </div>
                    <Link to={'/'} className="p-2 text-lg font-thin">Continuar sem login</Link>

                    <div className="flex flex-col items-start gap-2">
                        <div className="flex items-center gap-1">
                            <FaGithub size={35}/>
                            <p className="text-lg font-semibold">Repositório</p>
                            <a href="https://github.com/danielalmeidafarias/cutOptimizer"  target="_blank" className="text-lg font-bold">
                                Front-end
                            </a>
                            <p className="text-lg font-semibold">&</p>
                            <a href="https://github.com/danielalmeidafarias/backend-cutOptimizer" target="_blank" className="text-lg font-bold">Back-end</a>
                        </div>

                    </div>
                    <p>{error}</p>
                </div>
            ) : (
                <div>
                    <Navigate to='/' replace={true}/>
                </div>
            )}
        </div>


    );
}
 
export default LoginPage;
