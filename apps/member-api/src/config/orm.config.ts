import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { Users } from '@app/common/entities/Users';
import { Services } from '@app/common/entities/Services';
import { Transactions } from '@app/common/entities/Transactions';
import { Orders } from '@app/common/entities/Orders';
import { Languages } from '@app/common/entities/Languages';
import { ApiProviders } from '@app/common/entities/ApiProviders';
import { Platform } from '@app/common/entities/Platform';
import { Affiliates } from '@app/common/entities/Affiliates';
import { Deposits } from '@app/common/entities/Deposits';
import { Categories } from '@app/common/entities/Categories';
import { GatewayCurrencies } from '@app/common/entities/GatewayCurrencies';
import { Gateways } from '@app/common/entities/Gateways';
import { AdminNotifications } from '@app/common/entities/AdminNotifications';
import { Rank } from '@app/common/entities/Rank';
import { TransferLogs } from '@app/common/entities/TransferLogs';
import { Coupons } from '@app/common/entities/Coupons';
import { UserHashCoupons } from '@app/common/entities/UserHashCoupons';
import { News } from '@app/common/entities/News';
import { Bonuses } from '@app/common/entities/Bonuses';


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
            Languages,
            Users,
            Services, 
            Transactions,
            Orders,
            ApiProviders,
            Platform,
            Deposits,
            Categories,
            GatewayCurrencies,
            Gateways,
            AdminNotifications,
            Rank,
            TransferLogs,
            Coupons,
            UserHashCoupons,
            News,
            Bonuses,
            Affiliates,
        ],
        timezone: '+07:00',
        synchronize: false,
    }),
);
