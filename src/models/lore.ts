import Sequelize, { Model } from "sequelize";

let lore: Sequelize.ModelCtor<Model<any, any>> | undefined;

function LoreInit(sequelize: Sequelize.Sequelize){
    if(lore) return lore;

    lore = sequelize.define('lore',{
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        titel: {
            type: Sequelize.STRING,
            allowNull: false
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        search: Sequelize.STRING
    }, {underscored: true});

    return lore;
}

export default LoreInit;
export const Lore = () => lore;