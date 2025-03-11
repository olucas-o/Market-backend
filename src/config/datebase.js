import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('market_db.sqlite', (err)=>{
    if(err){
        console.error('Database not conect', err.message);
    } else {
        console.log('Database conect');
    } 
})
export default db;