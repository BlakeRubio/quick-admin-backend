import connection from "../app/database";

class UserService {
    create(user) {
        connection.execute('INSERT INTO user SET ?', [user]);
    }
}

export default new UserService();