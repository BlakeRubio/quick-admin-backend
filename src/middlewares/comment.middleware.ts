import { CommentSchema } from "../validators"

export const verifyComment = async (ctx, next) => {
    const { content, momentId } = ctx.request.body
    const { error } = CommentSchema.validate({ momentId, content })

    if (error) {
        ctx.message = error.details[0].message
        return ctx.app.emit('error', 'JOI_ERROR', ctx)
    }
    
    await next()
}


export const verifyReply = async (ctx, next) => {
    const { error } = CommentSchema.validate(ctx.request.body)

    if (error) {
        ctx.message = error.details[0].message
        return ctx.app.emit('error', 'JOI_ERROR', ctx)
    }
    
    await next()
    }