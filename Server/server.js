import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import { verify } from 'crypto'

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));

//    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   app.use(function (req, res, next) {
//    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "GANESHGANNU",
    database: "placeman",
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

const loiStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/lois');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const uploadLOI = multer({
    storage: loiStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed.'));
        }
    },
});

const InternloiStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Internlois');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const uploadInternLOI = multer({
    storage: InternloiStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed.'));
        }
    },
});

con.connect(function (err) {
    if (err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})



app.post("/login", (req, res) => {
    const sql = "SELECT * FROM admin where email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" })
        if (result.length > 0) {

            const id = result[0].id
            const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ Status: "Success" })

        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    })
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not Authenticated" })
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Error: "Token wrong" });
            next();
        })
    }
}

app.get('/dashboard', verifyUser, (req, res) => {
    return res.json({ Status: "Success" })
})

app.get('/studentCount', (req, res) => {
    const sql = "SELECT count(regNo) as Students from users";
    // SELECT COUNT(*) AS cse_student_count FROM users WHERE dept = 'CSE' AND year = 2022;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running student Count query" })
        return res.json(result);
    })
})

app.get('/studentCountCSE', (req, res) => {
    const sql = "SELECT count(regNo) as CSEStudents from users where dept='CSE'";
    // SELECT COUNT(*) AS cse_student_count FROM users WHERE dept = 'CSE' AND year = 2022;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running student Count query" })
        return res.json(result);
    })
})

app.get('/studentCountIT', (req, res) => {
    const sql = "SELECT count(regNo) as ITStudents from users where dept='IT'";
    // SELECT COUNT(*) AS cse_student_count FROM users WHERE dept = 'CSE' AND year = 2022;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running student Count query" })
        return res.json(result);
    })
})


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" })
})

app.get('/getPlaced/:year', (req, res) => {
    // const sql = "select users.studentname, users.regNo, users.year, users.dept, users.image, placement.company, placement.designation,placement.salary, placement.loi FROM users inner join placement on users.regNo=placement.regNo";
    // const sql = "SELECT u.regNo, u.image, u.studentname, u.email, u.year, u.dept, GROUP_CONCAT(p.company) AS companies, GROUP_CONCAT(p.designation) AS designations, GROUP_CONCAT(p.salary) AS salaries, GROUP_CONCAT(p.loi) AS loisFROM users uINNER JOIN placement p ON u.regNo = p.regNoGROUP BY u.regNo"
    const year = req.params.year;
    const sql = "SELECT users.regNo, users.image, users.studentname, users.email, users.year, users.dept, GROUP_CONCAT(DISTINCT placement.company ORDER BY placement.id SEPARATOR ',') AS companies, GROUP_CONCAT(DISTINCT placement.designation ORDER BY placement.id SEPARATOR ',') AS designations, GROUP_CONCAT(DISTINCT placement.salary ORDER BY placement.id SEPARATOR ',') AS salaries, GROUP_CONCAT(DISTINCT placement.loi ORDER BY placement.id SEPARATOR ',') AS lois FROM users INNER JOIN placement ON users.regNo = placement.regNo WHERE users.year = ? GROUP BY users.regNo;"
    con.query(sql, [year], (err, result) => {
        if (err) return res.json({ Error: "Get student placement details error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/getPlaced2022', (req, res) => {
    const year = 2022;
    const sql = `SELECT p.salary, COUNT(*) AS studentCount
                 FROM placement AS p
                 JOIN users AS u ON p.regNo = u.regNo
                 WHERE u.year = ?
                 GROUP BY p.salary`;

    con.query(sql, [year], (err, result) => {
        if (err) {
            console.error('Error fetching student placement details:', err);
            return res.json({ Error: 'Error fetching data from MySQL' });
        }

        const chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Number of Students',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        result.forEach(row => {
            chartData.labels.push(row.studentCount);
            chartData.datasets[0].data.push(row.salary);
        });

        return res.json({ Status: 'Success', Result: chartData });
    });
});

app.get('/getUserCountByYear', (req, res) => {
    const sql = `SELECT year, COUNT(*) AS userCount FROM users GROUP BY year`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching user count by year:', err);
            return res.json({ Error: 'Error fetching data from MySQL' });
        }

        const chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Number of Users',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    orderWidth: 1,
                },
            ],
        };

        result.forEach(row => {
            chartData.labels.push(row.year);
            chartData.datasets[0].data.push(row.userCount);
        });

        return res.json({ Status: 'Success', Result: chartData });
    });
});

app.get('/getYears', (req, res) => {
    const sql = 'SELECT DISTINCT year FROM users'; // Replace 'users' with your table name
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching years:', err);
            return res.status(500).json({ Error: 'Error fetching data from MySQL' });
        }

        const yearOptions = result.map(row => row.year);
        return res.json(yearOptions);
    });
});

app.get('/getDepartments', (req, res) => {
    const sql = 'SELECT DISTINCT dept FROM users'; // Replace 'users' with your table name
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return res.status(500).json({ Error: 'Error fetching data from MySQL' });
        }

        const departmentOptions = result.map(row => row.dept);
        return res.json(departmentOptions);
    });
});


app.get('/getUserCountByYear', (req, res) => {
    const sql = `SELECT year, COUNT(*) AS userCount FROM users GROUP BY year`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching user count by year:', err);
            return res.json({ Error: 'Error fetching data from MySQL' });
        }

        const chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Number of Users',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                },
            ],
        };

        result.forEach(row => {
            chartData.labels.push(row.year);
            chartData.datasets[0].data.push(row.userCount);
        });

        return res.json({ Status: 'Success', Result: chartData });
    });
});



app.get('/getPlace/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM placement WHERE regNo = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get student placement details for single student error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/getInterns/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM internship WHERE regNo = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get student internship details for single student error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/getIntern/:year', (req, res) => {
    // const sql = "select users.studentname, users.regNo, users.year, users.dept, users.image, placement.company, placement.designation,placement.salary, placement.loi FROM users inner join placement on users.regNo=placement.regNo";
    // const sql = "SELECT u.regNo, u.image, u.studentname, u.email, u.year, u.dept, GROUP_CONCAT(p.company) AS companies, GROUP_CONCAT(p.designation) AS designations, GROUP_CONCAT(p.salary) AS salaries, GROUP_CONCAT(p.loi) AS loisFROM users uINNER JOIN placement p ON u.regNo = p.regNoGROUP BY u.regNo"
    const year = req.params.year;
    const sql = "SELECT users.regNo, users.studentname,users.year, GROUP_CONCAT(DISTINCT internship.company ORDER BY internship.id SEPARATOR ',') AS companies, DATE_FORMAT(MIN(internship.from), '%Y-%m-%d') AS from_date,DATE_FORMAT(MAX(internship.to), '%Y-%m-%d') AS to_date,GROUP_CONCAT(DISTINCT internship.loi ORDER BY internship.id SEPARATOR ',') AS lois FROM users INNER JOIN internship ON users.regNo = internship.regNo WHERE users.year = ? GROUP BY users.regNo;"
    con.query(sql, [year], (err, result) => {
        if (err) return res.json({ Error: "Get student placement details error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users where regNo=?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get student placement details error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/getCompany/:company', (req, res) => {
    // const id = req.params.id;
    const company = req.params.company;
    const sql = "SELECT * FROM placement where company = ?";
    con.query(sql, [company], (err, result) => {
        if (err) return res.json({ Error: "Get student placement details error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/getInternCompany/:company', (req, res) => {
    // const id = req.params.id;
    const company = req.params.company;
    const sql = "SELECT * FROM internship where company = ?";
    con.query(sql, [company], (err, result) => {
        if (err) {
            return res.status(500).json({ Error: "Error in fetching student placement details from the database" });
        }
        const formattedResult = result.map(entry => {
            const formattedFrom = formatRDate(entry.from);
            const formattedTo = formatRDate(entry.to);
            return {
                ...entry,
                from: formattedFrom,
                to: formattedTo
            };
        });
        return res.json({ Status: "Success", Result: formattedResult });
    })
})
function formatRDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
}

app.put('/update/:id', (req, res) => {
    // const regNo = req.params.id;
    // const { studentname, email, year, dept } = req.body;
    // // const sql = "UPDATE users set dept = ? WHERE regNo = ?"
    // const sql = "UPDATE users SET studentname = ?, email = ?, year = ?, dept = ? WHERE regNo = ?";
    // const values = [studentname, email, year, dept, regNo];
    // // let values = [
    // //     req.body.studentname,
    // //     req.body.regNo,
    // //     req.body.email,
    // //     req.body.year,
    // //     req.body.dept,
    // // ]

    const regNo = req.params.id;
    const { studentname, email, year, dept } = req.body;

    let sql = "UPDATE users SET ";
    let values = [];

    if (studentname) {
        sql += "studentname = ?, ";
        values.push(studentname);
    }
    if (email) {
        sql += "email = ?, ";
        values.push(email);
    }
    if (year) {
        sql += "year = ?, ";
        values.push(year);
    }
    if (dept) {
        sql += "dept = ?, ";
        values.push(dept);
    }
    if (image) {
        sql += "image = ?,";
        values.push(image)
    }

    // Remove the trailing comma and space from the SQL string
    sql = sql.slice(0, -2);

    sql += " WHERE regNo = ?";
    values.push(regNo);
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Update student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

app.put('/singlePlaceUpdate/:id/:company', (req, res) => {
    const id = req.params.id;
    const company = req.params.company;
    const { designation, salary, loi } = req.body;

    let sql = "UPDATE placement SET ";
    let values = [];

    if (designation) {
        sql += "designation = ?, ";
        values.push(designation);
    }
    if (salary) {
        sql += "salary = ?, ";
        values.push(salary);
    }
    if (loi) {
        sql += "loi = ?, ";
        values.push(loi);
    }
    // Remove the trailing comma and space from the SQL string
    sql = sql.slice(0, -2);

    sql += " WHERE company = ?";
    values.push(company);
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Update student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

app.put('/singleInternUpdate/:id/:company', (req, res) => {
    const id = req.params.id;
    const company = req.params.company;
    const { designation, salary, loi } = req.body;

    let sql = "UPDATE internship SET ";
    let values = [];

    if (from) {
        sql += "from = ?, ";
        values.push(from);
    }
    if (to) {
        sql += "to = ?, ";
        values.push(to);
    }
    if (stipend) {
        sql += "salary = ?, ";
        values.push(salary);
    }
    if (loi) {
        sql += "loi = ?, ";
        values.push(loi);
    }
    // Remove the trailing comma and space from the SQL string
    sql = sql.slice(0, -2);

    sql += " WHERE company = ?";
    values.push(company);
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Update student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

app.put('/placeupdate/:id', (req, res) => {
    const regNo = req.params.regNo;
    // const { studentname, email, year, dept } = req.body;
    const sql = "UPDATE placement set dept = ? WHERE regNo = ?"
    // let values = [
    //     req.body.studentname,
    //     req.body.regNo,
    //     req.body.email,
    //     req.body.year,
    //     req.body.dept,
    // ]
    con.query(sql, [req.body.dept, regNo], (err, result) => {
        if (err) return res.json({ Error: "Update student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

app.delete('/delete/:id', (req, res) => {
    const regNo = req.params.id;

    let sql = "DELETE FROM users WHERE regNo = ?";
    con.query(sql, [regNo], (err, result) => {
        if (err) return res.json({ Error: "DELETE student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

app.delete('/singePDelete/:id/:company', (req, res) => {
    const regNo = req.params.id;
    const company = req.params.company;
    let sql = "DELETE FROM placement WHERE regNo = ? AND company = ?";
    const values = [regNo, company]
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "DELETE student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

app.post('/create', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO users(`studentname`,`regNo`,`email`,`password`,`year`,`dept`,`image`) VALUES (?)"
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" })
        const values = [
            req.body.studentname,
            req.body.regNo,
            req.body.email,
            hash,
            req.body.year,
            req.body.dept,
            req.file ? req.file.filename : null
        ]
        con.query(sql, [values], (err, result) => {
            // if (err) return res.json({ Error: "Inside signup query" });
            if (err) return res.json(err);
            return res.json({ Status: "Success" });
        })
    })
})

app.post('/addPlacement', uploadLOI.single('loi'), (req, res) => {
    const sql = "INSERT INTO placement(`regNo`,`company`,`designation`,`salary`,`loi`) VALUES (?);"
    const values = [
        req.body.regNo,
        req.body.company,
        req.body.designation,
        req.body.salary,
        req.file ? req.file.filename : null
    ]
    con.query(sql, [values], (err, result) => {
        // if (err) return res.json({ Error: "Inside signup query" });
        if (err) return res.json(err);
        return res.json({ Status: "Success" });
    })

})

app.get('/getCompanyOptions', (req, res) => {
    const sql = 'SELECT DISTINCT company FROM placement';
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching company options:', err);
            return res.status(500).json({ Error: 'Error fetching data from MySQL' });
        }

        const companyOptions = result.map(row => row.company);
        return res.json(companyOptions);
    });
});


app.post('/addInternship', uploadLOI.single('loi'), (req, res) => {
    const sql = "INSERT INTO internship(`regNo`,`company`,`from`,`to`,`stipend`,`loi`) VALUES (?);"
    const values = [
        req.body.regNo,
        req.body.company,
        formatDate(req.body.from),
        formatDate(req.body.to),
        req.body.stipend,
        req.file ? req.file.filename : null
    ]
    con.query(sql, [values], (err, result) => {
        // if (err) return res.json({ Error: "Inside signup query" });
        if (err) return res.json(err);
        return res.json({ Status: "Success" });
    })

})

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

app.listen(8080, () => {
    console.log("Running in Port 8080");
})