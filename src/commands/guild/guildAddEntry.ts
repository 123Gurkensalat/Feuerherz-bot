import { PermissionFlagsBits, SlashCommandAttachmentOption, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import Canvas from "@napi-rs/canvas";
import { ocrSpace } from "ocr-space-api-wrapper";
import { PowerToInt } from "../../utils/powerConversions";
import dotenv from "dotenv";
import { GuildInfo } from "../../models/guildInfo";
import { Member } from "../../models/member";
import { MemberInfo } from "../../models/memberInfo";
import { Guild } from "../../models/guild";
import { Op } from "sequelize";
dotenv.config();

const guildAddEntry: ICommand = {
    data: new SlashCommandBuilder()
        .setName('guild-add-entry')
        .setDescription('Adds new guild-info data for calculations')
        .addStringOption(option => option
            .setName('guild')
            .setDescription('Target guild')
            .setAutocomplete(true)
            .setDescriptionLocalizations({
                de: 'Zielgilde'})
            .setRequired(true))
        .addAttachmentOption(option => AttachmentOption(option, '1').setRequired(true))
        .addAttachmentOption(option => AttachmentOption(option, '2'))
        .addAttachmentOption(option => AttachmentOption(option, '3'))
        .addAttachmentOption(option => AttachmentOption(option, '4'))
        .addAttachmentOption(option => AttachmentOption(option, '5'))
        .addAttachmentOption(option => AttachmentOption(option, '6'))
        .addAttachmentOption(option => AttachmentOption(option, '7'))
        .addAttachmentOption(option => AttachmentOption(option, '8'))
        .addAttachmentOption(option => AttachmentOption(option, '9'))
        .addAttachmentOption(option => AttachmentOption(option, '10'))
        .setDescriptionLocalizations({
            de: 'Fügt einen Eintrag für die Berechnung von statistischen Werten hinzu.'})
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
    ,
 
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const guild = interaction.options.getString('guild');

        let guildId;
        try {
            guildId = (await Guild()?.findOne({
                where: {
                    server_id: interaction.guildId,
                    name: guild
                },
                attributes: ['id']
            }) as any)?.id;       
            if(!guild){
                interaction.editReply('Could not find Guild');
                return;
            }
        } catch (error) {
            console.log(error);
            interaction.editReply('Internal server error');
            return;
        }

        // get attachments
        const texts: string[] = [];
        for (let i = 0; i < 10; i++){
            const attachment = interaction.options.getAttachment(`image${i + 1}`);
            if(!attachment) continue;
            if(!attachment.width || !attachment.height) continue;

            // convert image to text
            try {
                // load image
                const image = await Canvas.loadImage(attachment.url);

                // resize image
                const ratio = (attachment.size > 1_000_000)? Math.sqrt(1_000_000 / attachment.size) : 1;
                const canvas = Canvas.createCanvas(attachment.width * ratio, attachment.height * ratio)
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                // get image as Base64Image
                const pngFile = canvas.toDataURL("image/png");

                // https://ocr.space/OCRAPI
                // https://www.npmjs.com/package/ocr-space-api-wrapper?activeTab=code
                // convert Image to Text
                const res = await ocrSpace(pngFile, {
                    OCREngine: '2',
                    scale: true,
                    apiKey: process.env.OCR_API_KEY
                })

                texts.push(res.ParsedResults[0].ParsedText);
            } catch (error) {
                console.error(error);

                interaction.editReply('Something went wrong while processessing the image');
                return;
            }
        }

        const members: {
            id: string | null, 
            name: string,
            power: number
        }[] = [];
        try {
            // get all Member
            const memberNames = (await Member()?.findAll({
                where: {
                    server_id: interaction.guildId
                },
                attributes: ['name']
            }))?.map((el: any) => el.name)
            
            if(!memberNames){
                interaction.editReply('Make sure to add members first.');
                return
            }

            // search for Member
            // save results in members object
            const text = texts.join('\n');
            const memberRegEx = new RegExp(`(${memberNames.join('|')})\n.*(\\d|,)+k+`, 'gi'); // Form: <Name>\nXXXXk
            
            text.match(memberRegEx)?.forEach(element => {
                let [name, power]: string[] | undefined[] = element.split('\n');
                power = power.match(/(\d|,)+k+/gi)?.at(0);
                if(!power) {
                    console.log('Cannot extract power')
                    throw new Error('error');
                }
                members.push({
                    id: null,
                    name: name,
                    power: PowerToInt(power)
                });
            });
    
            if(!members.length){
                interaction.editReply('No members found');
                return;
            }
    
            // get total number of players and compare them
            const countMatch = text.match(/\d{1,2}\/30\)/g); // Form: xx/30)
            if(countMatch){
                const memberCount = parseInt(countMatch[0].split('/')[0]);
    
                if(memberCount > members.length){
                    interaction.editReply('Member count and parsed members dont match. Make sure to screenshot everyone.');
                    return;
                }
            }
        } catch (error) {
            console.error(error);

            interaction.editReply('Internal Server Error');
            return;
        }

        // calculate numbers
        let total = 0;
        for (const member of members) {
            total += member.power; 
        }
        
        const mean = total / members.length; 
        
        const kick = mean / 2;

        let adjusted_total = 0;
        for (const member of members){
            adjusted_total += member.power > kick? member.power : 0;
        }

        // save in db
        try {
            // save guild infos
            await GuildInfo()?.create({
                guild_id: guildId,
                total,
                mean,
                kick,
                adjusted_total
            })

            // get member ids
            const membersDB: any = await Member()?.findAll({
                where: {
                    name: {
                        [Op.in]: members.map((el: any) => el.name)
                    },
                    server_id: interaction.guildId 
                },
                attributes: ['id', 'name']
            })

            // update guild
            await Member()?.update({
                guild_id: guildId
            },{
                where: {
                    id: {
                        [Op.in]: membersDB?.map((el:any) => el.id)
                    }
                }
            })

            // set ids
            for (let i = 0; i < members.length; i++){
                members[i].id = membersDB?.find((e: any) => e.name === members[i].name)?.id
            }

            // save member infos
            await MemberInfo()?.bulkCreate(members.map((el: any) => {
                return {member_id: el.id, power: el.power}
            }));

            interaction.editReply('Successfully created new entry');
        } catch (error) {
            console.error(error);

            interaction.editReply('Internal Server Error');
        }
    }
}

function AttachmentOption(option: SlashCommandAttachmentOption, count: string){
    return option
        .setName(`image${count}`)
        .setDescription('Screenshots from guild members.')
        .setNameLocalizations({
            de: `bild${count}`})
        .setDescriptionLocalizations({
            de: 'Bild von Gildenmitgliedern.'})
}

export default guildAddEntry;