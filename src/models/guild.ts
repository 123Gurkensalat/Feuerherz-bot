import Sequelize, { Model } from "sequelize";

let guild: Sequelize.ModelCtor<Model<any, any>> | undefined;

function GuildInit(sequelize: Sequelize.Sequelize){
    if(guild) return guild;

    guild = sequelize.define('guild',{
        server_id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        }
    }, {underscored: true});

    return guild;
}

export default GuildInit;
export const Guild = () => guild;