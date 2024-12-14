import app from '../app'

app.on('error', (type, ctx) => {
    let code = 0
    switch (type) {
        case 'schema':
            code = -1001
        break
        case 'customize':
            code = -1002
            break
    }
    ctx.body = {
        code,
        message: ctx.message
    }
})