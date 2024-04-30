import { Member } from "../models/member";

async function ExtractName(nickname: string, guildId: string): Promise<string>{
    const memberNames = await Member()?.findAll({
        where: {
            server_id: guildId
        },
        attributes: ['name']
    })

    const findName = new RegExp(`(${memberNames?.map((el:any) => el.name).join('|')})`)
    const res = nickname.match(findName)

    if(!res) throw new Error('No Match')

    return res[0];               
}

export default ExtractName