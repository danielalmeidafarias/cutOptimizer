import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FcGoogle } from 'react-icons/fc'

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [isLogged, setIsLogged] = useState(true)

    return (  
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-zinc-200">
            <div className="gap-4 bg-zinc-300 md:w-1/4 md:h-[300px] flex flex-col items-center p-4 rounded-md shadow-lg shadow-zinc-800 border-[1px] border-zinc-500">
                <h1 className="text-zinc-800 text-4xl font-extrabold">{isLogged ? `Fazer login` : 'Criar conta'}</h1>
                <div className="bg-zinc-400 p-4 border-[1px] border-zinc-500 rounded-md h-44 flex flex-col gap-7 items-center">
                    <form action="post" className="flex flex-col items-center gap-3">
                        <Input onChange={(e) => {
                            setEmail(e.target.value)
                        }} type='email' className="w-full shadow-zinc-600" placeholder='Email'/>
                        <Input onChange={(e) => {
                            setSenha(e.target.value)
                        }} type='password' className="w-full shadow-zinc-600" placeholder='Senha'/>
                    </form>
                    <Button content={isLogged ? `Login` : `Criar`} className="w-3/4 shadow-zinc-800" type='submit'/>
                    <p className="text-zinc-700">{isLogged ? `Não possui conta?` : 'Já possui conta?'}<span onClick={() => {
                        setIsLogged(!isLogged)
                    }} className="text-zinc-600 hover:underline hover:text-zinc-900 cursor-pointer">Clique aqui</span></p>

                </div>
            </div>
        </div>
    );
}
 
export default LoginPage;