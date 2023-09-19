import React, {useEffect, useRef} from "react";
import canvasDraw from "../functions/canvasDraw";
import Button from "./Button";

const Canvas = (props) => {
    const canvasRef = useRef(null)

    let { listaDesenho, size, id } = props

    // let { width } = props
    // let { height } = props
    // let width = 2750
    // let height = 1850

    let width = size.w
    let height = size.h

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.font = '12px arial'
        context.strokeStyle = 'black'

        canvas.width = width
        canvas.height = height

        console.log(listaDesenho)

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
        <div className="flex flex-col gap-2">
            <canvas className="shadow-md shadow-zinc-600" ref={canvasRef} style={{border: '1px solid black'}}></canvas>
            <Button onClick={handleDownload} content="Download"/>
        </div>
        
        
        
    );
}
 
export default Canvas;