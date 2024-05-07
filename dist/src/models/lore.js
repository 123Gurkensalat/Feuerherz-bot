"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lore = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
let lore;
function LoreInit(sequelize) {
    if (lore)
        return lore;
    lore = sequelize.define('lore', {
        title: {
            type: sequelize_1.default.STRING,
            primaryKey: true,
            allowNull: false
        },
        chapter: {
            type: sequelize_1.default.STRING,
            primaryKey: true
        },
        search_params: {
            type: sequelize_1.default.STRING
        },
        text: {
            type: sequelize_1.default.TEXT,
            allowNull: false
        }
    }, { underscored: true });
    return lore;
}
exports.default = LoreInit;
const Lore = () => lore;
exports.Lore = Lore;
