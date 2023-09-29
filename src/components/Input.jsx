const Input = (props) => {

    const { onChange, placeholder, value, className} = props

    return (  
        <input 
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${props.className} shadow-md shadow-zinc-400 border-2 text-lg border-zinc-600 focus:border-zinc-800 outline-none rounded-lg px-2`}
        type={props.type}
        />
    );
}
 
export default Input;