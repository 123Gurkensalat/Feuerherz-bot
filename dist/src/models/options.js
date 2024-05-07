"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
let option;
function OptionInit(sequelize) {
    if (option)
        return option;
    option = sequelize.define('options', {
        server_id: {
            type: sequelize_1.default.STRING,
            primaryKey: true,
            allowNull: false
        },
        self_role_channel: sequelize_1.default.STRING,
        self_role_enabled: {
            type: sequelize_1.default.BOOLEAN,
            defaultValue: true
        },
        lore_enabled: {
            type: sequelize_1.default.BOOLEAN,
            defaultValue: true
        }
    }, { timestamps: false });
    return option;
}
exports.default = OptionInit;
const Option = () => option;
exports.Option = Option;
