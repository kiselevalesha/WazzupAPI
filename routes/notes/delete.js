
const { LOG } = require('../../utils/util');
const { findNote, deleteNote } = require('../../models/notes/db');
const { getUserByToken } = require('../../models/sessions/db');
const { StrErrorTokenEmpty, StrErrorDataBase, StrErrorServer, 
    StrErrorNoteNotExist, StrOkNoteDeleted } = require('../../languages/russian');



async function Delete(req, res) {
    try {
        
        //  Достаём из заголовка токен
        let strToken = req.token;
        if (! strToken) {
            return res.status(401).json({ message: StrErrorTokenEmpty });
        }

        //  Находим юзера по токену
        let idUser = await getUserByToken(strToken);
        if (! idUser) {
            return res.status(401).json({ message: StrErrorDataBase });
        }

        const idNote = parseInt(req.params.id);
        if (! idNote) {
            return res.status(401).json({ message: StrErrorNoteNotExist })
        }

        let jsonNote = await findNote({ id:idNote });

        if (! jsonNote) {
            return res.status(401).json({ message: StrErrorNoteNotExist })
        }

        //  Заметка должна существовать и принадлежать самому пользователю токена.
        let flagOkAccess = false;

        if (jsonNote)
            if (jsonNote.idUser === idUser)
                flagOkAccess = true;

        if (flagOkAccess) {
            jsonNote = await deleteNote({ id:idNote });
        }

        res.json({ message: StrOkNoteDeleted });
    
    } catch(e) {
        res.status(500).json({ message: StrErrorServer });
    }
}
module.exports.Delete = Delete;
