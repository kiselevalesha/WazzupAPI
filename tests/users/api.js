
const querystring = require('querystring')
const fetch = require("node-fetch");
const { LOG, ShowTestResult } = require('../../utils/util');



async function RunAllApiUserTests() {

    await TestApiRegistration();

    await TestApiLogin();

    await TestApiLogout();

}
module.exports.RunAllApiUserTests = RunAllApiUserTests;


async function TestApiRegistration() {

    const body = {
        login: "test",
        password: "test"
    };

    let strUrl = 'http://localhost:3000/api/auth/registration';
     
    fetch(strUrl, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {

            if ((res.status === 200) || (res.status === 201)) {
                LOG("\n TestApiRegistration  OK  status=" + res.status)
            }
            else {
                LOG("\n TestApiRegistration  FAIL!!  status=" + res.status)
            }
    
            //res.json()
        })
        .catch(err => console.error(err));
    
}

async function TestApiLogin() {

    const body = {
        login: "test",
        password: "test"
    };

    let strUrl = 'http://localhost:3000/api/auth/login';
     
    fetch(strUrl, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {

            if ((res.status === 200) || (res.status === 201)) {
                LOG("\n TestApiLogin  OK  status=" + res.status)
            }
            else {
                LOG("\n TestApiLogin  FAIL!!  status=" + res.status)
            }
    
            //res.json()
        })
        .catch(err => console.error(err));
}

async function TestApiLogout() {

    let strUrl = 'http://localhost:3000/api/auth/logout';
     
    fetch(strUrl, {
            method: 'get',
            headers: { 
                'Content-Type': 'application/json'
             },
        })
        .then(res => {

            if ((res.status === 200) || (res.status === 201)) {
                LOG("\n TestApiLogout  OK  status=" + res.status)
            }
            else {
                LOG("\n TestApiLogout  FAIL!!  status=" + res.status)
            }
    
            //res.json()
        })
        .catch(err => console.error(err));
    
}
