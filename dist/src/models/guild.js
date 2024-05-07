"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
let guild;
function GuildInit(sequelize) {
    if (guild)
        return guild;
    guild = sequelize.define('guild', {
        server_id: {
            type: sequelize_1.default.STRING,
            primaryKey: true,
            allowNull: false
        },
        id: {
            type: sequelize_1.default.UUID,
            defaultValue: sequelize_1.default.UUIDV1,
            unique: true
        },
        name: {
            type: sequelize_1.default.STRING,
            primaryKey: true,
            allowNull: false
        }
    }, { underscored: true });
    return guild;
}
exports.default = GuildInit;
const Guild = () => guild;
exports.Guild = Guild;
