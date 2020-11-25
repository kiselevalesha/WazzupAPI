

const { LOG } = require('../../utils/util');
const { findNote, findAllNotes } = require('../../models/notes/db');
const { getUserByToken } = require('../../models/sessions/db');
const { StrErrorTokenEmpty, StrErrorDataBase, StrErrorServer, 
    StrErrorNoteNotAccess, StrErrorNoteNotExist } = require('../../languages/russian');



async function SelectAll(req, res) {
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
        
        //  Находим все заметки юзера
        const notes = await findAllNotes(idUser);

        res.json(notes);
    
    } catch(e) {
        res.status(500).json({ message: StrErrorServer });
    }
}
module.exports.SelectAll = SelectAll;



async function SelectOne(req, res) {
    try {

        const idNote = parseInt(req.params.id);
        if (! idNote) {
            return res.status(401).json({ message: StrErrorNoteNotExist })
        }

        let idUser = 0;

        //  Достаём из заголовка токен, если он там есть
        let strToken = req.token;
        if (strToken) {

            //  Находим юзера по токену
            idUser = await getUserByToken(strToken);
            if (! idUser) {
                return res.status(401).json({ message: StrErrorDataBase });
            }
        }

        const note = await findNote({ id:idNote, idUser });

        if (! note) {
            return res.status(401).json({ message: StrErrorNoteNotExist })
        }


        //  Если заметка не расшарена, то доступ к ней есть только у самого пользователя.
        //  Если же расшарена, то доступ открываем всем
        if (! note.isShared)
            if (note.idUser !== idUser) {
                return res.status(401).json({ message: StrErrorNoteNotAccess })
            }

        res.json(note);
    
    } catch(e) {
        res.status(500).json({ message: StrErrorServer });
    }
}
module.exports.SelectOne = SelectOne;
