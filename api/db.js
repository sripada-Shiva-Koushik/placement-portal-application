import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "GANESHGANNU",
    database: "placemanagement",
    // port: "3306",
})