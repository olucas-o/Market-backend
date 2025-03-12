import db from "../config/datebase.js";

db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productName TEXT NOT NULL,
        description TEXT NOT NULL,
        price FLOAT NOT NULL,
        productClass TEXT NOT NULL,
        idUser INTERGER,
        FOREIGN KEY (idUser) REFERENCES users(id)
    )
`);

function createProductRepository(newproduct, idUser){
    return new Promise((res, rej) =>{
        const { productName, description, price, productClass} = newproduct;
        db.run(`
            INSERT INTO products (productName, description, price, productClass, idUser)
            VALUES (?, ?, ?, ?, ?)
            `, 
            [productName, description, price, productClass, idUser], 
            function(err) {
                if (err) {
                    rej(err)
                } else {
                    res({id: this.lastID, ...newproduct })
                }
            }
        );
    });
};

function findAllProductsRepository(){
    return new Promise((res,req)=>{
        db.all(`
            SELECT id, productName, description, price, productClass, idUser FROM products   
        `,
        [],
        (err,row)=>{
            if (err){
                req(err)
            } else {
                res(row)
            }
        });
    });
};

function findProductByIdRepository(id){
    return new Promise((res,req)=>{
        db.get(`
            SELECT id, productName, description, price, productClass, idUser FROM products
            WHERE id = ?    
        `,
        [id],
        (err,row)=>{
            if (err){
                req(err)
            } else {
                res(row)
            }
        })
    })
}

function updateproductRepository(id, product) {
    return new Promise((res, req)=> {
        const fields = ['productName', 'description', 'price', 'productClass'];
        let query = 'UPDATE products SET';
        const values = [];

        fields.forEach((field) => {
            if (product[field] !== undefined) {
                query += ` ${field} = ?,`;
                values.push(product[field]);
            }
        });
        query = query.slice(0, -1);
        query += ' WHERE id = ?';
        values.push(id);

        db.run(query, values,(err) =>{
            if (err){
                req(err)
            } else {
                res({ ...product, id });
            }
        })
    })
}

function deleteProductByIDRepository(id){
    return new Promise((res,req)=>{
        db.run(`
            DELETE FROM products
            WHERE id = ?  
        `,
        [id],
        (err)=>{
            if (err){
                req(err)
            } else {
                res({message: "Products Deleted", id })
            }
        });
    })
}

function searchProductRepository(search) {
    return new Promise((res, rej) => {
    db.all(
        `SELECT * FROM products WHERE productName LIKE ?`,
        [`%${search}%`],
        (err, rows) => {
            if (err) rej(err);
            else res(rows);
    });
    });
}

function searchProducClasstRepository(search) {
    return new Promise((res, rej) => {
    db.all(
        `SELECT * FROM products WHERE productClass LIKE ?`,
        [`%${search}%`],
        (err, rows) => {
            if (err) rej(err);
            else res(rows);
    });
    });
}

export default{
    createProductRepository,
    findAllProductsRepository,
    findProductByIdRepository,
    updateproductRepository,
    deleteProductByIDRepository,
    searchProductRepository,
    searchProducClasstRepository
}