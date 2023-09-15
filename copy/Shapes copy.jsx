import Canvas from "./Canvas";

const Shapes = (props) => {    

    let { listaCanvas } = props

    return (
        <div className="flex flex-col gap-4">
            {listaCanvas.map( (listaDesenho) => (
                <Canvas key={listaCanvas.indexOf(listaDesenho)} listaDesenho={listaDesenho}/>
            ))}
        </div>
    );
}
 
export default Shapes;