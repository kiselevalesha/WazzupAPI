
const config = require('config');
const { LOG, CopyJson } = require('../../utils/util');
const { ExecuteQuery, getFullTableName } = require('../sql');
const { getNote } = require('./Note');

const nameTableNotes = getFullTableName(config.get('TableNameNotes'));



async function setSharedNote(json, isShared = true) {
    let note = FindNote(json);
    if (note) {
        note.isShared = isShared;
        note = UpdateNote(note);
    }
    return note;
}
module.exports.setSharedNote = setSharedNote;


async function findAllNotes(idUser) {
    let notes = [];
    if (idUser) {
        let sql = 'SELECT * FROM ' + nameTableNotes + 
                ' WHERE idUser=' + idUser + ' AND isDeleted=0';

        let result = await ExecuteQuery(sql);
        result.forEach(row => {
            let note = getNote();
            note.id = row.id;
            note.note = row.strNote;
            note.ageCreated = row.ageCreated;
            note.ageChanged = row.ageChanged;
            note.isShared = row.isShared;
            note.isDeleted = row.isDeleted;
            notes.push(note);
        });
    }
    return notes;
}
module.exports.findAllNotes = findAllNotes;


async function findNote(json) {
    let note = null;
    if (json)
        if (json.id) {

            let sql = 'SELECT * FROM ' + nameTableNotes + ' WHERE id=' + json.id;
            if (json.idUser) {
                sql += ' AND iduser=' + json.idUser;
            }

            let result = await ExecuteQuery(sql);
            if (result.length > 0) {
                let row = result[0];
                note = getNote();
                note.id = row.id;
                note.idUser = row.idUser;
                note.note = row.strNote;
                note.ageCreated = row.ageCreated;
                note.ageChanged = row.ageChanged;
                note.isShared = row.isShared;
                note.isDeleted = row.isDeleted;
            }
        }
    return note;
}
module.exports.findNote = findNote;


async function saveNote(json) {
    if (json) {
        if (json.id) {
            return updateNote(json);
        }
        else {
            return addNote(json);
        }
    }
    return json;
}
module.exports.saveNote = saveNote;


async function addNote(json) {
    if (json) {

        let sql = 'INSERT INTO ' + nameTableNotes +
                '(strNote, idUser) ' +
                'VALUES ("' + json.note + '",' + json.idUser + ')';

        try {
            let result = await ExecuteQuery(sql);
            json.id = result.insertId;
        } catch(err) {
            LOG(err);
            throw err;
        }
    }
    return json;
}
module.exports.addNote = addNote;


async function updateNote(json) {
    if (json)
        if (json.id) {
            let strNote = json.note || '';
            let idUser = json.user || 0;
            let ageCreated = json.ageCreated || '2013-07-22 14:52:33';
            let ageChanged = json.ageChanged || '2013-07-22 14:52:33';
            let isShared = json.isShared || 0;
            let isDeleted = json.isDeleted || 0;
            let sql = 'UPDATE ' + nameTableNotes + ' SET ' + 
                    'strNote="' + strNote + '",' +
                    'idUser=' + idUser + ',' +
                    'ageCreated="' + ageCreated + '",' +
                    'ageChanged="' + ageChanged + '",' +
                    'isShared=' + isShared + ',' +
                    'isDeleted=' + isDeleted +
                    ' WHERE id=' + json.id;
            try {
                let result = await ExecuteQuery(sql);
            } catch(err) {
                LOG(err);
                throw err;
            }
        }
    return json;
}
module.exports.updateNote = updateNote;


async function deleteNote(json) {
    if (json)
        if (json.id) {

            let sql = 'UPDATE ' + nameTableNotes + ' SET ' + 
                    'isDeleted=1 WHERE id=' + json.id;

            try {
                let result = await ExecuteQuery(sql);
            } catch(err) {
                LOG(err);
                throw err;
            }

            json.isDeleted = 1;
        }
    return json;
}
module.exports.deleteNote = deleteNote;
