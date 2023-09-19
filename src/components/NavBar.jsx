import { useState } from "react"

const NavItem = (props) => {
    return (
        <a 
        href={props.href}
        className="text-lg font-normal text-zinc-700 hover:text-black text-center"
        >{props.content}</a>
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
    function handleClick() {
        setClick(!click)
    }

    return (  
        <div className="shadow-md shadow-zinc-400 w-screen bg-zinc-200 flex flex-col py-3 px-3 md:justify-center">

            <MobileButton onClick={handleClick} click={click}/>

            {/* NavBar telas grandes */}
            <nav className=" hidden md:flex justify-evenly w-full items-center gap-5 px-10">
                <NavItem href={'/'} content={'Home'}/>
                <NavItem href={'/cortes'} content={'Cortes'}/>
                <NavItem href={'/'} content={'Lista de tarefas'}/>
                <NavItem href={'/'} content={'Materiais'}/>
                <NavItem href={'/'} content={'Orçamentos'}/>
                <NavItem href={'/'} content={'Balanço financeiro'}/>
            </nav> 
            
            {/* NavBar mobile */}
            <nav className={click ? `hidden w-screen flex-col items-center gap-5 px-12 justify-evenly transition-all` : `flex first-line:w-screen bg-zinc-200 md:hidden flex-col items-center gap-5 px-12 justify-evenly transition-all`}>

                <NavItem href={'/'} content={'Home'}/>
                <NavItem href={'/cortes'} content={'Cortes'}/>
                <NavItem href={'/'} content={'Lista de tarefas'}/>
                <NavItem href={'/'} content={'Materiais'}/>
                <NavItem href={'/'} content={'Orçamentos'}/>
                <NavItem href={'/'} content={'Balanço financeiro'}/>

            </nav> 
        </div>

    );
}
 
export default NavBar;