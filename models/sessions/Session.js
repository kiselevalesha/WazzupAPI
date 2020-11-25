
class Session {

    constructor (note = '', idUser = 0, isShared = false, isDeleted = false, ageCreated = null, ageChanged = null) {
        this.id = 0;

        this.note = note;
        this.user = idUser;

        this.ageCreated = ageCreated;
        this.ageChanged = ageChanged;

        this.isShared = isShared;
        this.isDeleted = isDeleted;
    }

}

function getSession(login = '', password = '', isDeleted = false) {
    let session = new Session(login, password, isDeleted);
    return session;
}
module.exports.getSession = getSession;