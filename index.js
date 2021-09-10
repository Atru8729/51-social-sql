const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'social',
    });

    let sql = '';
    let rows = [];
    let i = 0;

    const upName = str => {
        return str[0].toUpperCase() + str.slice(1);
    }

    // ** 1 ** _Registruotu vartotoju sarasas, isrikiuotas nuo naujausio link seniausio.
    // Reikia nurodyti varda, post'u kieki, komentaru kieki ir like'u kieki_
    // pvz.:
    // ```
    // Users:
    // 1. Vardenis: posts (3), comments (2), likes (0);
    // 2. Vardenis: posts (3), comments (2), likes (0);
    // 3. Vardenis: posts (3), comments (2), likes (0);
    // ```
    sql = 'SELECT * FROM `users` ORDER BY `users`.`register_date` DESC';
    [rows] = await connection.execute(sql);
    console.log('Users:');
    for (const { firstname } of rows) {
        console.log(`${++i}. ${upName(firstname)}: posts (3), comments (2), likes (0);`);
    }




}

app.init();

module.exports = app;