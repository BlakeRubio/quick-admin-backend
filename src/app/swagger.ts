const KoaRouter = require('@koa/router')
const koaSwagger = require('koa2-swagger-ui').koaSwagger
const yamljs = require('yamljs')
const { getNameListFromFolder, readAndWriteFile } = require('../utils/helper')

const swaggerRouter = new KoaRouter({
    prefix: '/api'
})

class InitSwagger {
    constructor(app) {
        this.init(app)
    }

    async init(app) {
        const yamls = getNameListFromFolder('../router', '.yaml')
        yamls.unshift('../config/api.yaml') 
        try {
            await readAndWriteFile(yamls, '/../openapi.yaml')
            const spec = yamljs.load('./openapi.yaml')
            swaggerRouter.use(koaSwagger({ swaggerOptions: { spec } }))
            swaggerRouter.get('/docs', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }))
            app.use(swaggerRouter.routes())
        } catch (error) {
            console.log(error)
        }
    } 
}

module.exports = InitSwagger
