"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const member_1 = require("../models/member");
async function ExtractName(nickname, guildId) {
    const memberNames = await (0, member_1.Member)()?.findAll({
        where: {
            server_id: guildId
        },
        attributes: ['name']
    });
    const findName = new RegExp(`(${memberNames?.map((el) => el.name).join('|')})`);
    const res = nickname.match(findName);
    if (!res)
        throw new Error('No Match');
    return res[0];
}
exports.default = ExtractName;
