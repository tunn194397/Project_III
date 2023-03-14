import { ConnectionOptions } from 'typeorm';
import {
    Address,
    BankAccount,
    Branch,
    Cooperation,
    Customer,
    DeviceParameter,
    DeviceType,
    ImportItemReceipt,
    ImportReceipt,
    Item,
    ItemParameter,
    Manager,
    Notification,
    Role,
    RolePermission,
    SellItemReceipt,
    SellReceipt,
    Staff,
    StaffSalary,
    Supply,
    UpdateSalaryHistory,
    User,
    Report,
    Voucher,
    Warehouse, CustomerCart
} from '../database/entities';

export const databaseConfig: ConnectionOptions = {
    type: (process.env.TYPEORM_CONNECTION || 'mysql') as any,
    host: process.env.TYPEORM_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_PORT) || 3306,
    username: process.env.TYPEORM_USERNAME || 'root',
    password: process.env.TYPEORM_PASSWORD || 'root',
    database: process.env.TYPEORM_DATABASE || 'third_project',
    entities: [
        Address,
        BankAccount,
        Branch,
        Cooperation,
        Customer,
        DeviceParameter,
        DeviceType,
        ImportItemReceipt,
        ImportReceipt,
        Item,
        ItemParameter,
        Manager,
        Notification,
        Role,
        RolePermission,
        SellItemReceipt,
        SellReceipt,
        Staff,
        StaffSalary,
        Supply,
        UpdateSalaryHistory,
        User,
        Report,
        Voucher,
        Warehouse, CustomerCart
    ],
    synchronize: true,
    logging: ["error"],
    extra: {
        decimalNumbers: true
    },

};
