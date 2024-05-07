"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
// connect to db
const sequelize = new sequelize_1.default.Sequelize({
    dialect: 'sqlite',
    storage: './src/data/database.sqlite',
    logging: false
});
// load neccessary tables
const guild = require('./models/guild').default(sequelize);
const guildInfo = require('./models/guildInfo').default(sequelize);
const lore = require('./models/lore').default(sequelize);
const member = require('./models/member').default(sequelize);
const memberInfo = require('./models/memberInfo').default(sequelize);
const options = require('./models/options').default(sequelize);
const selfRole = require('./models/selfRole').default(sequelize);
// set associations
// Guild.hasMany(SelfRole, {
//     foreignKey: 'guild',
// });
// SelfRole.belongsTo(Guild);
// set force mode (-- --force)
const force = process.argv.includes('--force') || process.argv.includes('-f');
// sync db
sequelize.sync({ force }).then(async () => {
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);
