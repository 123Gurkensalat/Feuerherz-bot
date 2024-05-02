import { GuildMember, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Member } from "../../models/member";
import { MemberInfo } from "../../models/memberInfo";
import { Guild } from "../../models/guild";
import ExtractName from "../../utils/extractName";
import { IntToPower } from "../../utils/powerConversions";

const memberStats: ICommand = {
    data: new SlashCommandBuilder()
        .setName('member-stats')
        .setDescription('Shows the stats of the user. When no name is given it will use your nickname.')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Explicit name')
            .setDescriptionLocalizations({
                de: 'Expliziter name'}))
        .addNumberOption(option => option
            .setName('days')
            .setDescription('How far the prediction should go')
            .setDescriptionLocalizations({
                de: 'Wie weit die Vorhersage gehen soll'}))
        .setDescriptionLocalizations({
            de: 'Zeigt die Infos eines Spielers. Wenn kein Name angegeben ist, wird der dc-Nickname benutzt.'})
        .setDMPermission(false)
    ,

    async execute(interaction) {
        let name = interaction.options.getString('name');
        const days = interaction.options.getNumber('days');
        
        try {
            if(!name){
                const nickname = (interaction.member as GuildMember).nickname

                if(!nickname){
                    interaction.reply({
                        content: 'could not extract nickname',
                        ephemeral: true
                    })
                    return;
                }

                name = await ExtractName(nickname, interaction.guildId || '');

                if(!name){
                    interaction.reply({
                        content: 'could not extract nickname',
                        ephemeral: true
                    })
                    return;
                }
            }

            // get member
            const member: any = await Member()?.findOne({
                where: {
                    server_id: interaction.guildId,
                    name: name
                },
                attributes: ['id', 'guild_id']
            })
            
            if(!member){
                interaction.reply({
                    content: 'No member found',
                    ephemeral: true
                })
                return;
            }

            const guildName = (await Guild()?.findOne({
                where: {
                    id: member.guild_id
                },
                attributes: ['name']
            }) as any)?.name

            // get all entries with name
            const infos: any = await MemberInfo()?.findAll({
                where: {
                    member_id: member.id
                },
                order:[
                    ['created_at', 'ASC']
                ]
            })

            if(!infos){
                interaction.reply({
                    content: 'No stats found',
                    ephemeral: true
                })
                return;
            }

            let requestedPower: string = IntToPower(infos[0].power);
            if(days){
                // predict
            }

            // responde
            interaction.reply({
                content: `${name} ${guildName? `in der Gilde ${guildName}` : ''}: ${days? `\nWird in ${days} Tagen ${requestedPower} haben`: requestedPower}`,
                ephemeral: true
            })
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Internal server error',
                ephemeral: true
            })
        }
    }
}

export default memberStats;