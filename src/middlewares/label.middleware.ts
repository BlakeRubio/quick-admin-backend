import { labelSchema } from "../validators"

export const verifyLabel = async (ctx, next) => {
    const { name } = ctx.request.body
    const { error } = labelSchema.validate({ name })

    if (error) {
        ctx.message = error.details[0].message
        return ctx.app.emit('error', 'JOI_ERROR', ctx)
    }
    
    await next()
}