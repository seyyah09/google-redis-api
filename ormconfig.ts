
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User, GoogleUser } from "src/typeorm/entities/user.entity";
import { config } from "dotenv";
config();

const ormconfig: PostgresConnectionOptions = {
    type: "postgres",
    database: process.env.DB_NAME,    
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [User, GoogleUser],
    synchronize: true,
};

export default ormconfig;