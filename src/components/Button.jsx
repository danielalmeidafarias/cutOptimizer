const Button = (props) => {

    const { onClick, content } = props

    return (  
        <button 
        onClick={onClick}
        className=" shadow-md shadow-zinc-400 text-lg flex justify-center items-center bg-zinc-800 text-zinc-200 hover:bg-zinc-950 transition-all duration-75 outline-none rounded-lg w-28"
        >
            {content}
        </button>
    );
}
 
export default Button;