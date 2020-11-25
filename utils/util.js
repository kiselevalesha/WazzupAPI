
function LOG(str) {
    console.log(str);
}
module.exports.LOG = LOG;


function CopyJson(obj) {
    return Object.assign({}, obj);
}
module.exports.CopyJson = CopyJson;


function getHash(strToken) {
    let hash = 0;
    if (strToken)
        for (let i = 0; i < strToken.length; i++) {
            hash += strToken.charCodeAt(i);
        }
    return hash;
}
module.exports.getHash = getHash;


async function ShowTestResult(strNameTest, flagResult) {
    let strResult;
    if (flagResult) {
        strResult = 'OK';
    }
    else {
        strResult = 'FAIL !!!';
    }
    LOG('\n ' + strNameTest + ' ' + strResult);
}
module.exports.ShowTestResult = ShowTestResult;

