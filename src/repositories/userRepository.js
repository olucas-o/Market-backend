import db from '../config/datebase.js'; 

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);

function createUserRepository(newUser){
    return new Promise((res, rej) =>{
        const { userName, email, password} = newUser;
        db.run(`
            INSERT INTO users (userName, email, password)
            VALUES (?, ?, ?)
            `, 
            [userName, email, password], 
            function(err) {
                if (err) {
                    rej(err)
                } else {
                    res({id: this.lastID, ...newUser})
                }
            }
        );
    });
};

function findUserByEmailRepository(email){
    return new Promise((res,req)=>{
        db.get(`
            SELECT id, userName, email, password FROM users
            WHERE email = ?    
        `,
        [email],
        (err,row)=>{
            if (err){
                req(err)
            } else {
                res(row)
            }
        })
    });
};

function findUserByIdRepository(id){
    return new Promise((res,req)=>{
        db.get(`
            SELECT id, userName, email FROM users
            WHERE id = ?    
        `,
        [id],
        (err,row)=>{
            if (err){
                req(err)
            } else {
                res(row)
            }
        });
    });
};

function findAllUserRepository(){
    return new Promise((res,req)=>{
        db.all(`
            SELECT username, email FROM users   
        `,
        [],
        (err,row)=>{
            if (err){
                req(err)
            } else {
                res(row)
            }
        });
    })
}

function updateUserRepository(id, user) {
    return new Promise((res, req)=> {
        const fields = ['userName', 'email', 'password'];
        let query = 'UPDATE users SET';
        const values = [];

        fields.forEach((field) => {
            if (user[field] !== undefined) {
                query += ` ${field} = ?,`;
                values.push(user[field]);
            }
        });
        query = query.slice(0, -1);
        query += ' WHERE id = ?';
        values.push(id);

        db.run(query, values,(err) =>{
            if (err){
                req(err)
            } else {
                res({ ...user, id });
            }
        })
    })
}


function deleteUserByIDRepository(id){
    return new Promise((res,req)=>{
        db.run(`
            DELETE FROM users
            WHERE id = ?  
        `,
        [id],
        (err)=>{
            if (err){
                req(err)
            } else {
                res({message: "User Deleted", id })
            }
        });
    })
}

export default {
    createUserRepository,
    findUserByEmailRepository,
    findUserByIdRepository,
    findAllUserRepository,
    updateUserRepository,
    deleteUserByIDRepository
};
