import { db } from "../db.js"

export const getStudents = (req, res) => {
    const q = req.query
        ? "select  user.rid, user.username, placement.company, placement.salary, user.year FROM user INNER JOIN placement ON user.rid=placement.sid"
        : "SELECT * FROM user";
    db.query(q, [req.query], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data);
    })
}

export const addStudent = (req, res) => {
    // const q = req.query
    //     ? "INSERT INTO "
    //     : "";
    // db.query(q, [req.query], (err, data) => {
    //     if (err) return res.send(err);

    //     return res.status(200).json(data);
    // })
    const { table, company, salary, city, sid, from, to, stipend, iid } = req.body;
    let placementQuery;
    let values

    if (table === 'Placement') {
        placementQuery = "INSERT INTO placement (company, salary, city, sid) VALUES (?, ?, ?, ?)";
        values = [
            req.body.company,
            req.body.salary,
            req.body.city,
            req.body.sid,
        ]
    } else if (table === 'Internship') {
        placementQuery = "INSERT INTO internship (company, from, to, stipend, city, iid) VALUES (?, ?, ?, ?, ?, ?);"
        values = [
            req.body.company,
            req.body.from,
            req.body.to,
            req.body.stipend,
            req.body.city,
            req.body.iid,
        ]
    } else {
        return res.status(400).send('Invalid table specified');
    }


    db.query(placementQuery, values, (err, result) => {
        if (err) return res.send(err);
        return res.status(200).json(result);
    })



    // const userQuery = "INSERT INTO user (rid, username) VALUES (?, ?)";
    // const placementQuery = "INSERT INTO placement (sid, company, salary) VALUES (?, ?, ?)";
    // db.query(userQuery, [rid, username], (err, userResult) => {
    //     if (err) return res.send(err);
    //     const sid = userResult.insertId;
    //     db.query(placementQuery, [sid, company, salary], (err, placementResult) => {
    //         if (err) return res.send(err);
    //         return res.status(200).json(placementResult);
    //     })
    // })
}

export const updateStudent = (req, res) => {
    // const id = req.params.id;
    // const { username, company, salary } = req.body;
    // const updateUserQuery = "UPDATE user SET username = ? WHERE rid = ?";
    // const updatePlacementQuery = "UPDATE placement SET company = ?, salary = ? WHERE sid = ?";
    // db.query(updateUserQuery, [username, id], (err, userResult) => {
    //     if (err) return res.send(err);
    //     db.query(updatePlacementQuery, [company, salary, id], (err, placementResult) => {
    //         if (err) return res.send(err);
    //         return res.status(200).json(placementResult);
    //     })
    // })

    const { table, company, salary, city, sid, from, to, stipend, iid } = req.body;
    let placementQuery;
    let values;

    if (table === 'Placement') {
        placementQuery = "UPDATE placement SET company = ?, salary = ?, city = ? WHERE sid = ?";
        values = [
            req.body.company,
            req.body.salary,
            req.body.city,
            req.body.sid,
        ]
    } else if (table === 'Internship') {
        placementQuery = "UPDATE internship SET company = ?, from = ?, to = ?, stipend = ?, city = ? WHERE iid = ?"
        values = [
            req.body.company,
            req.body.from,
            req.body.to,
            req.body.stipend,
            req.body.city,
            req.body.iid,
        ]
    } else {
        return res.status(400).send('Invalid table specified');
    }


    db.query(placementQuery, values, (err, result) => {
        if (err) return res.send(err);
        return res.status(200).json(result);
    })
}





// export const adminRead = (req, res) => {

//     // const rid = req.params.rid
//     // const q = req.query
//     //     ? "select user.rid, user.username, placement.company, placement.salary, user.year FROM user INNER JOIN placement ON user.rid=placement.sid WHERE user.rid = ?"
//     //     : "SELECT * FROM user where rid=?";
//     // db.query(q, [req.query], (err, data) => {
//     // //     if (err) return res.send(err);

//     // //     return res.status(200).json(data);
//     // })



//     const sql = "SELECT user.rid, user.username, placement.company, placement.salary, user.year FROM user INNER JOIN placement ON user.rid=placement.sid where user.rid = ?";
//     // const sql = "SELECT * FROM user where rid=?"
//     const id = req.params.rid;

//     db.query(sql, [id], (err, result) => {
//         if (err) return res.send(err)
//         return res.status(200).json(result)
//     })
// }


export const getStudentById = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const getUserQuery = "SELECT * FROM user WHERE rid = ?";

    // const getUserQuery = "SELECT * FROM user WHERE rid = ?";

    db.query(getUserQuery, [id], (err, userResult) => {
        if (err) return res.send(err);

        if (userResult.length === 0) {
            return res.status(404).send("User not found");
        }

        const getPlacementQuery = "SELECT * FROM placement WHERE sid = ?";
        db.query(getPlacementQuery, [id], (err, placementResult) => {
            if (err) return res.send(err);

            if (placementResult.length === 0) {
                return res.status(404).send("Placement not found");
            }

            const student = {
                id: userResult[0].rid,
                username: userResult[0].username,
                company: placementResult[0].company,
                salary: placementResult[0].salary,
                city: placementResult[0].city
            };

            return res.json(student);
        });
    });
};

export const adminupdateStudent = (req, res) => {
    const id = req.params.id;
    const { company, salary, city } = req.body;

    const getPlacementQuery = "SELECT * FROM placement WHERE sid = ?";
    db.query(getPlacementQuery, [id], (err, placementResult) => {
        if (err) return res.send(err);

        if (placementResult.length === 0) {
            return res.status(404).send("Placement not found");
        }

        const updatePlacementQuery =
            "UPDATE placement SET company = ?, salary = ?, city = ? WHERE sid = ?";
        db.query(
            updatePlacementQuery,
            [company || placementResult[0].company, salary || placementResult[0].salary, city || placementResult[0].city, id],
            (err, placementUpdateResult) => {
                if (err) return res.send(err);

                return res.status(200).json(placementUpdateResult);
            }
        );
    });
};

// export const deleteStudent = (req, res) => {
//     // const id = req.params.id;
//     // const deletePlacementQuery = "DELETE FROM placement WHERE sid = ?";
//     // const deleteUserQuery = "DELETE FROM user WHERE rid = ?";
//     // db.query(deletePlacementQuery, [id], (err, placementResult) => {
//     //     if (err) return res.send(err);
//     //     db.query(deleteUserQuery, [id], (err, userResult) => {
//     //         if (err) return res.send(err);
//     //         return res.status(200).json(userResult);
//     //     })
//     // })
//     const { id } = req.params.id;
//     // let placementQuery;
//     // let values;

//     // // if (table === 'Placement') {
//     // placementQuery = "DELETE FROM placement WHERE rid = ?";
//     // values = [id];
//     // // } else if (table === 'Internship') {
//     // //     placementQuery = "DELETE FROM internship WHERE rid = ?";
//     // //     values = [id];
//     // // } else {
//     // return res.status(400).send('Invalid table specified');
//     // // }

//     // db.query(placementQuery, values, (err, result) => {
//     //     if (err) return res.send(err);
//     //     return res.status(200).json(result);
//     const { company, salary, city } = req.body;

//     const getPlacementQuery = "SELECT * FROM placement WHERE sid = ?";
//     db.query(getPlacementQuery, [id], (err, placementResult) => {
//         if (err) return res.send(err);

//         if (placementResult.length === 0) {
//             return res.status(404).send("Placement not found");
//         }

//         const user = {
//             id: placementResult[0].sid,
//             name: placementResult[0].name,
//             email: placementResult[0].email,
//             phone: placementResult[0].phone,
//             company: placementResult[0].company,
//             salary: placementResult[0].salary,
//             city: placementResult[0].city
//         };

//         return res.render('delete', { user });

//         const deletePlacementQuery =
//             "DELETE FROM placement WHERE sid = ?";
//         db.query(
//             deletePlacementQuery,
//             [company || placementResult[0].company, salary || placementResult[0].salary, city || placementResult[0].city, id],
//             (err, placementDeleteResult) => {
//                 if (err) return res.send(err);

//                 return res.status(200).json(placementDeleteResult);
//             });
//     })
// }

export const getDeletePage = (req, res) => {
    // const id = req.params.id;

    // const getPlacementQuery = "SELECT * FROM placement WHERE sid = ?";
    // db.query(getPlacementQuery, [id], (err, placementResult) => {
    //     if (err) return res.send(err);

    //     if (placementResult.length === 0) {
    //         return res.status(404).send("Placement not found");
    //     }

    //     const user = {
    //         id: placementResult[0].sid,
    //         name: placementResult[0].name,
    //         email: placementResult[0].email,
    //         phone: placementResult[0].phone,
    //         company: placementResult[0].company,
    //         salary: placementResult[0].salary,
    //         city: placementResult[0].city
    //     };

    //     return res.render('delete', { user });
    // });
    const id = req.params.id;
    // console.log(id);
    const getUserQuery = "SELECT * FROM user WHERE rid = ?";

    // const getUserQuery = "SELECT * FROM user WHERE rid = ?";

    db.query(getUserQuery, [id], (err, userResult) => {
        if (err) return res.send(err);

        if (userResult.length === 0) {
            return res.status(404).send("User not found");
        }

        const getPlacementQuery = "SELECT * FROM placement WHERE sid = ?";
        db.query(getPlacementQuery, [id], (err, placementResult) => {
            if (err) return res.send(err);

            if (placementResult.length === 0) {
                return res.status(404).send("Placement not found");
            }

            const student = {
                id: userResult[0].rid,
                username: userResult[0].username,
                company: placementResult[0].company,
                salary: placementResult[0].salary,
                city: placementResult[0].city
            };

            return res.json(student);
        });
    });
};

export const deletePlacement = (req, res) => {
    const id = req.params.id;

    const deletePlacementQuery = "DELETE FROM placement WHERE sid = ?";
    db.query(deletePlacementQuery, [id], (err, placementResult) => {
        if (err) return res.send(err);
        return res.status(200).json(placementResult);
    });
};