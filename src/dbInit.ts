import Sequelize, { Model } from "sequelize";

// connect to db
const sequelize = new Sequelize.Sequelize({
    dialect: 'sqlite',
    storage: './src/data/database.sqlite',
    logging: false
});

// load neccessary tables
const guild = require('./models/guild').default(sequelize) as Sequelize.ModelCtor<Model<any, any>>;
const guildInfo = require('./models/guildInfo').default(sequelize) as Sequelize.ModelCtor<Model<any, any>>;
const lore = require('./models/lore').default(sequelize) as Sequelize.ModelCtor<Model<any, any>>;
const member = require('./models/member').default(sequelize) as Sequelize.ModelCtor<Model<any, any>>;
const memberInfo = require('./models/memberInfo').default(sequelize) as Sequelize.ModelCtor<Model<any, any>>;
const options = require('./models/options').default(sequelize) as Sequelize.ModelCtor<Model<any, any>>;
const selfRole = require('./models/selfRole').default(sequelize) as Sequelize.ModelCtor<Model<any, any>>;

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