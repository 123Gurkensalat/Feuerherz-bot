import Sequelize, { Model } from "sequelize";

let guildInfo: Sequelize.ModelCtor<Model<any, any>> | undefined;

function GuildInfoInit(sequelize: Sequelize.Sequelize){
    if(guildInfo) return guildInfo;

    guildInfo = sequelize.define('guild_info',{
        guild_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        total: Sequelize.INTEGER,
        mean: Sequelize.INTEGER,
        kick: Sequelize.INTEGER,
        adjusted_total: Sequelize.INTEGER,
    }, {underscored: true});

    return guildInfo;
}

export default GuildInfoInit;
export const GuildInfo = () => guildInfo;