const canvasDraw = (context, listaDesenho) => {

    listaDesenho.map((desenho => {

        if(desenho.peca) {
            let escritaW = `${(desenho.w - 4)}`
            let escritaH = `${(desenho.h - 4)}`

            context.lineWidth = 4

            context.fillStyle = 'rgba(0, 170, 255)'

            context.fillRect(desenho.x, desenho.y, desenho.w, desenho.h)    
            context.strokeRect(desenho.x, desenho.y, desenho.w, desenho.h)

            if(desenho.h < 50) {
                context.font = 'bold 36px sans'
            } else {
                context.font = 'bold 54px sans'
            }

            context.fillStyle = 'rgba(0, 0, 0)'
            context.fillText(`${escritaW} x ${escritaH}`, desenho.x + 10, desenho.y + desenho.h)

        } else {

            let escritaW = `${String(desenho.w)}`
            let escritaH = `${String(desenho.h)}`

            context.lineWidth = 4

            context.fillStyle = 'rgba(500,100 , 255)'

            context.fillRect(desenho.x, desenho.y, desenho.w, desenho.h)
            context.strokeRect(desenho.x, desenho.y, desenho.w, desenho.h)


            if(desenho.h < 50) {
                context.font = 'bold 36px sans'
            } else {
                context.font = 'bold 54px sans'
            }

            context.fillStyle = 'rgba(0, 0, 0)'
            context.fillText(`${escritaW} x ${escritaH - 4}`, desenho.x, desenho.y + desenho.h)


        }

    }))
}

export default canvasDraw