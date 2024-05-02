import Sequelize, { Model } from "sequelize";

let lore: Sequelize.ModelCtor<Model<any, any>> | undefined;

function LoreInit(sequelize: Sequelize.Sequelize){
    if(lore) return lore;

    lore = sequelize.define('lore',{
        title: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        chapter: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        search_params: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {underscored: true});

    return lore;
}

export default LoreInit;
export const Lore = () => lore;