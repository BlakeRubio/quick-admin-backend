import { labelSchema } from "../validators"
import labelService from "../service/label.service"

export const verifyLabel = async (ctx, next) => {
    const { name } = ctx.request.body
    const { error } = labelSchema.validate({ name })

    if (error) {
        ctx.message = error.details[0].message
        return ctx.app.emit('error', 'JOI_ERROR', ctx)
    }
    
    await next()
}


export const verifyLabelExists = async (ctx, next) => {
    // 获取客户端传过来的标签名称
    const { labels } = ctx.request.body;
    const newLabels = []
    
    // 判断标签是否为空
    if (!labels.length) return

    for(let [, name] of labels.entries()) {
        const result: any = await labelService.queryLabelByName(name)
        const labelObj: any = { name }
        if (!result.length) {
            // 标签不存在，创建, 并获取插入之后的id
            const insertResult: any = await labelService.create(name)
            labelObj.id = insertResult.insertId
        } else {
            // 标签已存在，获取id
            for (let i = 0; i < result.length; i++) {
                const index = i
                 labelObj.id = result[index].id
            }
        }
        newLabels.push(labelObj)
    }

    ctx.labels = newLabels

    await next()
}