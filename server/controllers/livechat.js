const channel = require('../models/channel');
const Channel = require('../models/channel');
const LivechatContact = require('../models/LivechatContact');

exports.getChatHistory = async (req, res) => {
    const {machineId, adminId} = req.params;
    try{
        const channel = await Channel.findOne({machineId, adminId});
        res.json(channel);
    }
    catch(e) {
        res.send({
            code: 404,
            msg: "channel not found",
        })
    }
}

exports.getChannelById = async (req, res) => {
    const { channelId } = req.params;
    try {
        const channel = await Channel.findById(channelId).populate('contactId');
        return res.json(channel);
    }
    catch(e) {
        res.send({
            code: 404,
            msg: "channel not found",
        })
    }
}

exports.getChannelsByAdminId = async (req, res) => {
    const { adminId } = req.params;
    try{
        const channels = await Channel.find({adminId});
        res.json(channels);
    }
    catch(e) {
        res.send({
            code: 404,
            msg: "channel not found",
        })
    }
}

exports.addNewMessage = async (req, res) => {
    const { channelId, msg, messageType } = req.body
    try {
        await Channel.findByIdAndUpdate(channelId, {
            $push: {
                messages: {
                  type: messageType,
                  msg: msg,
                },
            }
        })

        const result = await Channel.findById(channelId);
        return res.json(result);
    }
    catch(e) {
        res.status(404).json({msg: "Channel Not Found!"})
    }

}

exports.startChat = async (req, res) => {
    const { adminId, machineId, contactInfo, locationInfo, browserInfo } = req.body
    try{
        const oldChannel = await Channel.findOne({ adminId, machineId, isActivated: true });
        if(oldChannel) {
            return res.status(409).json({ msg: "Livechat is already active in this machine" })
        }
    
        const newChannel = new Channel({
            adminId,
            machineId,
            contactInfo,
            locationInfo,
            browserInfo,
            messages: [],
        })
    
        await newChannel.save()

        // Todo: Socket Emit
    }
    catch(e) {
        res.send({ msg: err.message.replace(/\"/g, ""), success: false, code: 500 });
    }
}

exports.endChat = async (req, res) => {
    const { channelId } = req.body;
    try {
        const oldChannel = await Channel.findById(channelId);
        if(oldChannel.isActivated === false){
            return res.status(400).json({ msg: "Channel is already deactivated"});
        }
        await Channel.findByIdAndUpdate(channelId, {
            isActivated: false,
        })

        // Todo: Socket Emit
    }
    catch(e) {
        res.send({ msg: err.message.replace(/\"/g, ""), success: false, code: 500 });
    }
}

exports.getChatsAndContacts = async (req, res) => {
    const { adminId } = req.params;
    try {
        const channels = await Channel.find({ adminId }).populate('contactId');
        
        const contacts = await LivechatContact.find({ adminId })
        return res.json({
            channels: channels.map((channel) => {
                return {
                    _id: channel._id,
                    adminId: channel.adminId,
                    activated: channel.activated,
                    contact: channel.contactId,
                    locationInfo: channel.locationInfo,
                    browserInfo: channel.browserInfo,
                    messages: channel.messages[channel.messages.length - 1]
                }
            }),
            contacts,
        })
    }
    catch(e) {
        res.send({ msg: err.message.replace(/\"/g, ""), success: false, code: 500 });
    }
}