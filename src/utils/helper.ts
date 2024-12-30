export const createResponse = (ctx: any, code: number, message: string = 'success', data?: any) => ({
    code,
    message,
    path: ctx.path,
    timestamp: new Date().toISOString(),
    data,
});