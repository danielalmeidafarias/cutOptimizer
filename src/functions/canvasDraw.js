const canvasDraw = (context, listaDesenho) => {

    listaDesenho.map((desenho => {

        
        // let pecaw = desenho.w + 4
        // let pecah = desenho.h + 4
        // desenho.w = pecaw / 5
        // desenho.h = pecah / 5


        if(desenho.peca) {
            let escritaW = `${(desenho.w - 4)}`
            let escritaH = `${(desenho.h - 4)}`

            context.lineWidth = 4

            context.fillStyle = 'rgba(0, 170, 255)'

            context.fillRect(desenho.x, desenho.y, desenho.w, desenho.h)    
            context.strokeRect(desenho.x, desenho.y, desenho.w, desenho.h)

            context.font = 'bold 54px sans'

            context.fillStyle = 'rgba(0, 0, 0)'
            context.fillText(`${escritaW} x ${escritaH}`, desenho.x + 10, desenho.y + desenho.h - 10)

        } else {

            let escritaW = `${Math.round(desenho.w)}`
            let escritaH = `${Math.round(desenho.h)}`

            context.lineWidth = 4

            context.fillStyle = 'rgba(500,100 , 255)'

            context.fillRect(desenho.x, desenho.y, desenho.w, desenho.h)
            context.strokeRect(desenho.x, desenho.y, desenho.w, desenho.h)


            // context.font = 'bold 54px sans'
            // context.fillStyle = 'rgba(0, 0, 0)'
            // context.fillText(`${escritaW} x ${escritaH - 4}`, desenho.x, desenho.y + desenho.h/2)


        }

    }))
}

export default canvasDraw