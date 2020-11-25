
class User {

    constructor(login = '', password = '', isDeleted = false) {
        this.id = 0;
        this.login = login;
        this.password = password;
        this.isDeleted = isDeleted;
    }

}

function getUser(login = '', password = '', isDeleted = false) {
    let user = new User(login, password, isDeleted);
    return user;
}
module.exports.getUser = getUser;