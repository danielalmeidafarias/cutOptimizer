const Button = (props) => {

    const { onClick, content, className, type } = props

    return (  
        <button 
        type={props.type}
        onClick={onClick}
        className={`${props.className} font-bold shadow-md shadow-zinc-400 text-lg flex justify-center items-center bg-zinc-800 text-zinc-200 hover:bg-zinc-950 transition-all duration-75 outline-none rounded-lg`}
        >
            {content}
        </button>
    );
}
 
export default Button;