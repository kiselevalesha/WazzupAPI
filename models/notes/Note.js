
class Note {

    constructor (strNote = '', idUser = 0, 
                isShared = false, isDeleted = false, 
                ageCreated = null, ageChanged = null) {

        this.id = 0;

        this.note = strNote;
        this.user = idUser;

        this.ageCreated = ageCreated;
        this.ageChanged = ageChanged;

        this.isShared = isShared;
        this.isDeleted = isDeleted;
    }

}

function getNote(strNote = '', idUser = 0, 
                isShared = false, isDeleted = false, 
                ageCreated = null, ageChanged = null) {
    let note = new Note(strNote, idUser, isShared, isDeleted, ageCreated, ageChanged);
    return note;
}
module.exports.getNote = getNote;