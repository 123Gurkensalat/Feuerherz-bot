import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Member } from "../../models/member";
import { MemberInfo } from "../../models/memberInfo";
import { PowerToInt } from "../../utils/powerConversions";

const memberEntry: ICommand = {
    data: new SlashCommandBuilder()
        .setName('member-entry')
        .setDescription('Adds a new member stats entry')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of Player')
            .setDescriptionLocalizations({
                de: 'Name des Spieler'})
            .setRequired(true))
        .addStringOption(option => option
            .setName('power')
            .setDescription('Power in XXXXk format')
            .setDescriptionLocalizations({
                de: 'Power in XXXXk Format'})
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
    ,

    async execute(interaction) {
        const name = interaction.options.getString('name');
        const power= interaction.options.getString('power') || '0';

        try {
            const memberId = (await Member()?.findOne({
                where: {
                    server_id: interaction.guildId,
                    name: name
                },
                attributes: ['id']
            }) as any)?.id
    
            if(!memberId){
                interaction.reply({
                    content: 'Could not find member', 
                    ephemeral: true
                })
                return;
            }
    
            await MemberInfo()?.create({
                member_id: memberId,
                power: PowerToInt(power)
            })
    
            interaction.reply({
                content: 'Successfully created entry',
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

export default memberEntry;