import Sequelize, { Model } from "sequelize";

let guild: Sequelize.ModelCtor<Model<any, any>> | undefined;

function GuildInit(sequelize: Sequelize.Sequelize){
    if(guild) return guild;

    guild = sequelize.define('guild',{
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        self_role_channel: {
            type: Sequelize.STRING
        },
        self_role_enabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    return guild;
}

export default GuildInit;
export const Guild = () => guild;