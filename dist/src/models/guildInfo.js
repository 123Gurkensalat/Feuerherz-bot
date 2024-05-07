"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildInfo = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
let guildInfo;
function GuildInfoInit(sequelize) {
    if (guildInfo)
        return guildInfo;
    guildInfo = sequelize.define('guild_info', {
        guild_id: {
            type: sequelize_1.default.UUID,
            allowNull: false
        },
        total: sequelize_1.default.INTEGER,
        mean: sequelize_1.default.INTEGER,
        kick: sequelize_1.default.INTEGER,
        adjusted_total: sequelize_1.default.INTEGER,
    }, { underscored: true });
    return guildInfo;
}
exports.default = GuildInfoInit;
const GuildInfo = () => guildInfo;
exports.GuildInfo = GuildInfo;
