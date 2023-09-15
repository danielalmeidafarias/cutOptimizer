const canvasDraw = (context, listaDesenho) => {

    listaDesenho.map((desenho => {

        
        // let pecaw = desenho.w + 4
        // let pecah = desenho.h + 4
        // desenho.w = pecaw / 5
        // desenho.h = pecah / 5


        if(desenho.peca) {
            let escritaW = `${(desenho.w * 5) - 4}`
            let escritaH = `${(desenho.h * 5) - 4}`

            context.strokeRect(desenho.x, desenho.y, desenho.w, desenho.h)
            context.strokeText(`${escritaW} x ${escritaH}`, desenho.x, desenho.y + desenho.h - 1)

        } else {

            let escritaW = `${Math.round(desenho.w * 5)}`
            let escritaH = `${Math.round(desenho.h * 5) - 4}`

            context.strokeRect(desenho.x, desenho.y, desenho.w, desenho.h)
            context.fillRect(desenho.x, desenho.y, desenho.w, desenho.h)
            context.strokeText(`${escritaW} x ${escritaH}`, desenho.x + 10, desenho.y + desenho.h/2)


        }

    }))
}

export default canvasDraw