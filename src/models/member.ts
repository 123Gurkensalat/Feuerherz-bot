import Sequelize, { Model } from "sequelize";

let member: Sequelize.ModelCtor<Model<any, any>> | undefined;

function MemberInit(sequelize: Sequelize.Sequelize){
    if(member) return member;

    member = sequelize.define('member',{
        server_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        guild_id: Sequelize.UUID,
        name: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        }
    }, {underscored: true});

    return member;
}

export default MemberInit;
export const Member = () => member;