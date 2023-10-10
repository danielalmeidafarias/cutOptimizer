import React, {useEffect, useRef} from "react";
import canvasDraw from "../functions/canvasDraw";
import Button from "./Button";

const Canvas = (props) => {
    const canvasRef = useRef(null)

    let { listaDesenho, size, id } = props

    console.log(listaDesenho)


    let width = size.w
    let height = size.h

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.font = '48px serif'
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
        <div className="flex flex-col gap-2">
            <canvas className="shadow-md shadow-zinc-600" ref={canvasRef} style={{border: '1px solid black'}}></canvas>
            <p>{`${width} x ${height}`}</p>
            <Button onClick={handleDownload} content="Download"/>
        </div>
        
        
        
    );
}
 
export default Canvas;