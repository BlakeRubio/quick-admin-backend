import noticeService from "../service/notice.service";

class noticeController {
    async create(ctx, next) {
        const { title, content } = ctx.request.body
    }

    async details(ctx, next) {
        const id = ctx.params.id

        const result = await noticeService.details(id);

        ctx.body = {
            code: 0,
            message: "公告详情获取成功~",
            data: result,
          };
        
    }

    async list(ctx, next) {
        const result = await noticeService.list();
    
        ctx.body = {
          code: 0,
          message: "公告内容获取成功~",
          data: result,
        };
      }
}


export default new noticeController();
