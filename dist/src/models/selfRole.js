"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfRole = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
let selfRole;
function SelfRoleInit(sequelize) {
    if (selfRole)
        return selfRole;
    selfRole = sequelize.define('self_role', {
        server_id: {
            type: sequelize_1.default.STRING,
            primaryKey: true,
            allowNull: false
        },
        emoji: {
            type: sequelize_1.default.STRING,
            primaryKey: true,
            allowNull: false
        },
        role: {
            type: sequelize_1.default.STRING,
            primaryKey: true,
            allowNull: false
        }
    }, { timestamps: false });
    return selfRole;
}
exports.default = SelfRoleInit;
const SelfRole = () => selfRole;
exports.SelfRole = SelfRole;
