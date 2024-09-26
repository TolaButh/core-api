import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { Users } from '@app/common/entities/Users';
import { Services } from '@app/common/entities/Services';
import { Transactions } from '@app/common/entities/Transactions';
import { Orders } from '@app/common/entities/Orders';
import { GeneralSettings } from '@app/common/entities/GeneralSettings';
import { ApiProviders } from '@app/common/entities/ApiProviders';
import { Categories } from '@app/common/entities/Categories';

export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'mysql',
        replication: {
            master: {
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10) || 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
            },
            slaves: [
                {
                    host: process.env.DB_HOST_READ,
                    port: parseInt(process.env.DB_PORT, 10) || 3306,
                    username: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME,
                },
            ],
        },
        entities: [
           Orders,
           GeneralSettings,
           ApiProviders,
           Services,
           Categories,
           Users,
           Transactions
        ],
        timezone: '+07:00',
        synchronize: false,
    }),
);
