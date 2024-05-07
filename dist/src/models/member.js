"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
let member;
function MemberInit(sequelize) {
    if (member)
        return member;
    member = sequelize.define('member', {
        server_id: {
            type: sequelize_1.default.STRING,
            allowNull: false
        },
        id: {
            type: sequelize_1.default.UUID,
            defaultValue: sequelize_1.default.UUIDV1
        },
        guild_id: sequelize_1.default.UUID,
        name: {
            type: sequelize_1.default.STRING,
            primaryKey: true,
            allowNull: false
        }
    }, { underscored: true });
    return member;
}
exports.default = MemberInit;
const Member = () => member;
exports.Member = Member;
