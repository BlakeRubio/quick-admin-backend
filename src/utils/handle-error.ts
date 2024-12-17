import app from "../app";
import { 
    NAME_IS_ALREADY_EXISTS,
    NAME_IS_NOT_EXISTS,
    PASSWORD_IS_INCORRECT,
    OPERATION_IS_NOT_ALLOWED,
    UNAUTHORIZED,
    FORBIDDEN
} from "../constants/error";

app.on("error", (type, ctx) => {
  let code = 0;
  let message = "";

  switch (type) {
    case "JOI_ERROR":
      message = ctx.message;
      code = -1001;
      break;
    case NAME_IS_ALREADY_EXISTS:
      message = "用户名已经被占用，换一个试试吧~";
      code = -1002;
      break;
    case NAME_IS_NOT_EXISTS:
      message = "用户名不存在，请检查用户名~";
      code = -1003;
      break;
    case PASSWORD_IS_INCORRECT:
      message = "你输入的密码不正确，请检查密码~";
      code = -1004;
      break;
    case UNAUTHORIZED:
      message = "未授权~";
      code = -401;
      break;
    case FORBIDDEN:
      message = "禁止访问~";
      code = -401;
      break;
    case OPERATION_IS_NOT_ALLOWED:
      message = "操作不被允许~";
      code = -2001;
      break;
    
  }
  ctx.body = {
    code,
    message,
  };
});
