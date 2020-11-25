
const { LOG } = require('../../utils/util');
const { findNote, saveNote } = require('../../models/notes/db');
const { getUserByToken } = require('../../models/sessions/db');
const { StrErrorTokenEmpty, StrErrorDataBase, StrErrorServer, 
    StrErrorNoteIsNull } = require('../../languages/russian');


async function Save(req, res) {
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
        

        const { id, note, isShared } = req.body;
 
        if (! note) {
            return res.status(401).json({ message: StrErrorNoteIsNull });
        }


        //  Нужно проверить, что заметка принадлежит самому пользователю
        //  Только он может её сохранять и изменять        

        let flagOkAccess = true;
        let jsonNote = await findNote({ id });
        
        //  Если заметка существует в базе, то она должна принадлежать пользователю токена
        if (jsonNote)
            if (jsonNote.idUser !== idUser)
                flagOkAccess = false;

        if (flagOkAccess) {
            jsonNote = await saveNote({ id, note, idUser, isShared });
        }

        if (! jsonNote) {
            return res.status(401).json({ message: StrErrorDataBase });
        }
   
        res.status(201).json( jsonNote );
    
    } catch(e) {
        res.status(500).json({ message: StrErrorServer });
    }
}
module.exports.Save = Save;
