import Sequelize, { Model } from "sequelize";

let option: Sequelize.ModelCtor<Model<any, any>> | undefined;

function OptionInit(sequelize: Sequelize.Sequelize){
    if(option) return option;

    option = sequelize.define('options',{
        server_id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        self_role_channel: Sequelize.STRING,
        self_role_enabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        lore_enabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {timestamps: false})

    return option;
}

export default OptionInit;
export const Option = () => option;