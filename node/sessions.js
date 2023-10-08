const path = require("path");
const fs = require("fs");

module.exports = {
    getList() {
        return fs.readdirSync(path.join(__dirname, "./", "sessions"));
    },
    getToken(name) {
        return fs.readFileSync(path.join(__dirname, "./", "sessions", name)).toString()
    },
    saveSession(session) {
        fs.writeFileSync(path.join(__dirname, "./", "sessions", session.name), session.token);
    }
}