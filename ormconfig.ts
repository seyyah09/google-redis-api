// import { Book } from "src/entities/book.entity";
// import { Borrow } from "src/entities/borrow.entity";
// import { User } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { config } from 'dotenv';
import { User } from "src/typeorm/entities/user.entity";
config();

const ormconfig: PostgresConnectionOptions = {
    type: "postgres",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [User],
    synchronize: true,
};

export default ormconfig;