
const fetch = require("node-fetch");
const { LOG, ShowTestResult } = require('../../utils/util');



async function RunAllApiNoteTests() {

    await TestApiPostNote();

    await TestApiGetNote();

    await TestApiDeleteNote();

}
module.exports.RunAllApiNoteTests = RunAllApiNoteTests;


async function TestApiPostNote() {

    const body = {
        login: "test",
        password: "test"
    };

    let strUrl = 'http://localhost:3000/api/notes';
     
    fetch(strUrl, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {

            if ((res.status === 200) || (res.status === 201)) {
                LOG("\n TestApiPostNote  OK  status=" + res.status)
            }
            else {
                LOG("\n TestApiPostNote  FAIL!!  status=" + res.status)
            }
    
            //res.json()
        })
        .catch(err => console.error(err));
    
}

async function TestApiGetNote() {

    const body = {
        login: "test",
        password: "test"
    };

    let strUrl = 'http://localhost:3000/api/notes/2';
     
    fetch(strUrl, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {

            if ((res.status === 200) || (res.status === 201)) {
                LOG("\n TestApiGetNote  OK  status=" + res.status)
            }
            else {
                LOG("\n TestApiGetNote  FAIL!!  status=" + res.status)
            }
    
            //res.json()
        })
        .catch(err => console.error(err));
    
}

async function TestApiDeleteNote() {

    const body = {
        login: "test",
        password: "test"
    };

    let strUrl = 'http://localhost:3000/api/notes/2';
     
    fetch(strUrl, {
            method: 'delete',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {

            if ((res.status === 200) || (res.status === 201)) {
                LOG("\n TestApiDeleteNote  OK  status=" + res.status)
            }
            else {
                LOG("\n TestApiDeleteNote  FAIL!!  status=" + res.status)
            }
    
            //res.json()
        })
        .catch(err => console.error(err));
    
}
