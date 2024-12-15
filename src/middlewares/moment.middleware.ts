import { MomentSchema } from "../validators"

export const verifyContent = async (ctx, next) => {
    const { content } = ctx.request.body
    const { error } = MomentSchema.validate({ content })

    if (error) {
        ctx.message = error.details[0].message
        return ctx.app.emit('error', 'JOI_ERROR', ctx)
    }
    
    await next()
}