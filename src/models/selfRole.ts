import Sequelize, { Model } from "sequelize";

let selfRole: Sequelize.ModelCtor<Model<any, any>> | undefined;

function SelfRoleInit(sequelize: Sequelize.Sequelize){
    if(selfRole) return selfRole;

    selfRole = sequelize.define('self_role',{
        server_id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        emoji: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        }
    }, {timestamps: false})

    return selfRole;
}

export default SelfRoleInit;
export const SelfRole = () => selfRole;