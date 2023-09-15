import React, {useEffect, useRef} from "react";
import canvasDraw from "../functions/canvasDraw";

const Canvas = (props) => {
    const canvasRef = useRef(null)

    let { listaDesenho } = props


    // let { width } = props
    // let { height } = props
    // let width = 2750
    // let height = 1850

    let width = 550
    let height = 370

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.font = '12px arial'
        context.strokeStyle = 'black'

        canvas.width = width
        canvas.height = height


        context.fillStyle = 'rgba(0, 0, 255, 0.1)'


        canvasDraw(context, listaDesenho)

    }, [])

    console.log(props)



    return (  
        <div>
            <canvas ref={canvasRef} style={{border: '1px solid black'}}></canvas>
        </div>
        
        
        
    );
}
 
export default Canvas;