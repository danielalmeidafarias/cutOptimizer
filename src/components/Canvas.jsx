import React, {useEffect, useRef} from "react";
import canvasDraw from "../functions/canvasDraw";

const Canvas = (props) => {
    const canvasRef = useRef(null)

    let { listaDesenho, id } = props

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


        canvasDraw(context, listaDesenho)

    }, [])

    const handleDownload = () => {

        const canvas = canvasRef.current
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/jpeg', 1.0)
        link.download = `canvas_image${id}.jpeg`
        link.click()

    }


    return (  
        <div>
            <canvas ref={canvasRef} style={{border: '1px solid black'}}></canvas>
            <button onClick={handleDownload}>Download</button>
        </div>
        
        
        
    );
}
 
export default Canvas;