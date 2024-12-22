import { AVATAR_PATH } from "../config/path"

const multer = require('@koa/multer')

const uploadAvatar = multer({
    dest: AVATAR_PATH
})


export default uploadAvatar.single('avatar')