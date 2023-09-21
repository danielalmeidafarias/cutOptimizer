const Input = (props) => {

    const { onChange, placeholder, value} = props

    return (  
        <input 
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="shadow-md shadow-zinc-400 border-2 text-lg border-zinc-600 focus:border-zinc-800 outline-none rounded-lg px-2 w-32"
        type={"number" }
        />
    );
}
 
export default Input;