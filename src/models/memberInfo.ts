import Sequelize, { Model } from "sequelize";

let memberInfo: Sequelize.ModelCtor<Model<any, any>> | undefined;

function MemberInfoInit(sequelize: Sequelize.Sequelize){
    if(memberInfo) return memberInfo;

    memberInfo = sequelize.define('member_info',{
        member_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        power: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {underscored: true});

    return memberInfo;
}

export default MemberInfoInit;
export const MemberInfo = () => memberInfo;