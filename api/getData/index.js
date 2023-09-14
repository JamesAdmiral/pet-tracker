const fs = require('fs');
const path = require('path');

module.exports = async function (context, req) {
    let db;
    try {
        db = JSON.parse(fs.readFileSync(path.resolve(context.executionContext.functionDirectory, 'db.json'), 'utf8'));
    } catch (err) {
        console.log(err)
    }
    const n = req.query.record;
    context.res.json(db && db[n] ? db[n] : {});
}