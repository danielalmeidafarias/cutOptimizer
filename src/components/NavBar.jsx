import { useEffect, useState, useContext } from "react"
import { LoginContext } from "../context/LoginContext"
import { Outlet, Link } from "react-router-dom"

const NavItem = (props) => {
    return (
        <Link 
        to={props.to}
        className="text-xl font-bold text-zinc-800  hover:text-black text-center"
        >{props.content}</Link>
    )
}

const MobileButton = (props) => {
    let { click } = props

    return (
        <div onClick={props.onClick} className="md:hidden flex flex-col gap-1 cursor-pointer transition-all">
            <div className={click ? `bg-black w-6 h-[2px] rounded-e-md transition-all` : `bg-black w-6 h-[2px] rounded-e-md rotate-45 translate-y-1 transition-all`}></div>
            <div className={click ? `bg-black w-6 h-[2px] rounded-e-md transition-all` : `bg-black w-6 h-[2px] rounded-e-md invisible `}></div>
            <div className={click ? `bg-black w-6 h-[2px] rounded-e-md transition-all` : `bg-black w-6 h-[2px] rounded-e-md -rotate-45 -translate-y-2 transition-all`}></div>
        </div>
    )
}

const NavBar = () => {
    
    const [click, setClick] = useState(true)
    const { sessionId, setSessionId } = useContext(LoginContext)

    const handleClick = () => {
        setClick(!click)
    }

    const handleLoggout = () => {
        setSessionId('')
    }

    return (  
        <div className="transition shadow-md shadow-zinc-400 w-screen bg-zinc-200 flex flex-col py-3 px-3 md:justify-center">

            <MobileButton onClick={handleClick} click={click}/>

            {/* NavBar telas grandes */}
            <nav className=" hidden md:flex w-full justify-between items-center gap-5 px-10">
                <h2 className="text-2xl font-extrabold text-zinc-700">{'< CutOptimizer />'}</h2>
                <div className="flex items-center gap-24">
                    <NavItem to={'/'} content={'Cortes'}/>
                    <NavItem to={'/listas'} content={'Lista de tarefas'}/>
                    <Link className="font-bold w-24 shadow-md shadow-zinc-400 text-lg flex justify-center items-center bg-zinc-800 text-zinc-200 hover:bg-zinc-950 transition-all duration-75 outline-none rounded-lg" onClick={sessionId ? handleLoggout : null} to={'/login'}>{sessionId ? 'Loggout' : 'Login'}</Link>
                </div>
            </nav> 
            
            {/* NavBar mobile */}
            <nav className={click ? `hidden w-screen flex-col items-center gap-5 px-12 justify-evenly transition-all` : `flex first-line:w-screen bg-zinc-200 md:hidden flex-col items-center gap-5 px-12 justify-evenly transition-all`}>
                <h2 className="text-2xl font-extrabold text-zinc-700">{'< CutOptimizer />'}</h2>
                
                <NavItem to={'/'} content={'Cortes'}/>
                <NavItem to={'/listas'} content={'Lista de tarefas'}/>
                <Link className="font-bold w-24 shadow-md shadow-zinc-400 text-lg flex justify-center items-center bg-zinc-800 text-zinc-200 hover:bg-zinc-950 transition-all duration-75 outline-none rounded-lg" onClick={sessionId ? handleLoggout : null} to={'/login'}>{sessionId ? 'Loggout' : 'Login'}</Link>

            </nav> 
        </div>

    );
}
 
export default NavBar;