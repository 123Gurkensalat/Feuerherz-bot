"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberInfo = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
let memberInfo;
function MemberInfoInit(sequelize) {
    if (memberInfo)
        return memberInfo;
    memberInfo = sequelize.define('member_info', {
        member_id: {
            type: sequelize_1.default.UUID,
            allowNull: false
        },
        power: {
            type: sequelize_1.default.INTEGER,
            allowNull: false
        }
    }, { underscored: true });
    return memberInfo;
}
exports.default = MemberInfoInit;
const MemberInfo = () => memberInfo;
exports.MemberInfo = MemberInfo;
