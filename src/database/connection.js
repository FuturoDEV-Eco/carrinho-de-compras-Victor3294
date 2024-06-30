const { Pool } = require('pg');

class Database {
    constructor() {
        this.database = new Pool({    
            user: 'seu_usuario',        
            host: 'localhost',        
            port: 5432,        
            password: 'sua_senha',     
            database: 'seu_database',  
        });
    }
}

module.exports = Database;