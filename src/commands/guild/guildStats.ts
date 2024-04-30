import { GuildMember, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import ExtractName from "../../utils/extractName";
import { Member } from "../../models/member";
import { Guild } from "../../models/guild";
import { GuildInfo } from "../../models/guildInfo";

const guildStats: ICommand = {
    data: new SlashCommandBuilder()
        .setName('guild-stats')
        .setDescription('Shows guild stats')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Guild name')
            .setDescriptionLocalizations({
                de: 'Gilden Name'}))
        .addNumberOption(option => option
            .setName('days')
            .setDescription('How far the prediction should go')
            .setDescriptionLocalizations({
                de: 'Wie weit die Vorhersage gehen soll'}))
        .setDescriptionLocalizations({
            de: 'Zeigt Gilden Werte'})
        .setDMPermission(false)
    ,

    async execute(interaction) {
        const name = interaction.options.getString('name');
        const days = interaction.options.getNumber('days');
        let guildId;
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

                const memberName = await ExtractName(nickname, interaction.guildId || '');

                if(!memberName){
                    interaction.reply({
                        content: 'could not extract nickname',
                        ephemeral: true
                    })
                    return;
                }

                guildId = (await Member()?.findOne({
                    where: {
                        server_id: interaction.guildId,
                        name: memberName
                    },
                    attributes: ['guild_id']
                }) as any)?.guild_id
            }else{
                guildId = (await Guild()?.findOne({
                    where: {
                        server_id: interaction.guildId,
                        name: name
                    },
                    attributes: ['id']
                }) as any)?.id
            }

            const infos = await GuildInfo()?.findAll({
                where: {
                    guild_id: guildId
                },
                order: [
                    ['created_at','ASC']
                ]
            })
            
            if(!infos){
                interaction.reply({
                    content: 'No stats found',
                    ephemeral: true
                })
                return;
            }

            const guildName = (await Guild()?.findOne({
                where: {
                    id: guildId
                },
                attributes: ['name']
            }) as any)?.name

            let requestedValues: any = infos[0]
            if(days){
                // predict
            }

            // reply
            interaction.reply({
                content: 
                `
                ${guildName}:
                Total: ${requestedValues.total}
                Durchsschnitt: ${requestedValues.mean}
                Kick: <${requestedValues.kick}
                Bereinigtes Total: ${requestedValues.adjusted_total}
                `,
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

export default guildStats;