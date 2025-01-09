export const createResponse = (ctx: any, code: number, message: string = 'success', data?: any) => ({
    code,
    message,
    path: ctx.path,
    timestamp: new Date().toISOString(),
    data,
});

// 生成随机验证码
export const generateRandomCode = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = ''
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
    }
    return code
}