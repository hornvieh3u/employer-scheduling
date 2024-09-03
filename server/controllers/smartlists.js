const smartlist = require('../models/Smartlists')
const smartFolder = require('../models/SmartlistFolder')
const member = require('../models/Member')
const buymembership = require('../models/BuyMembership')
const financeInfo = require('../models/FinanceInfo')
exports.get_smart_list = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!userId) {
            return res.json({
                success: false,
                msg: "Please give the userId  in params!"
            })
        }

        let sl_data = await smartlist.find({ userId: userId })
        res.send({ data: sl_data, success: true });
    } catch (err) {
        res.send({ error: err.message.replace(/\"/g, ""), success: false });
    }
}
exports.create_smart_list = async (req, res) => {
    try {
        // if (!Object.keys(obj).length) {
        //     return res.send({
        //         success: false,
        //         msg: "invalid input!"
        //     })
        // }
        let userId = req.params.userId
        let adminId = req.params.adminId
        let folderId = req.params.folderId
        // let { membership_status, finance, renewal } = req.body.criteria
        // let promises = [];
        // let obj = req.body.criteria
        // for (const i in obj) {
        //     if (obj[i].length) {
        //         promises.push({ [i]: { "$in": obj[i] } })
        //     }
        // }
        // Promise.all(promises);
        let sldata = smartlist({
            smartlistname: req.body.smartlistname,
            criteria: req.body.criteria,
            userId: userId,
            adminId: adminId,
            folderId: folderId
        })
        sldata.save((err, sldata) => {
            if (err) {
                res.send({ msg: err.message.replace(/\"/g, ""), success: false });

            } else {
                smartFolder.findByIdAndUpdate(
                    folderId,
                    {
                        $push: { smartlists: sldata._id },
                    },
                    (err, data) => {
                        if (err) {
                            res.send({
                                msg: 'Smartlist not added in folder',
                                success: false,
                            });
                        } else {
                            res.send({
                                msg: 'Smartlist created successfully',
                                success: true,
                            });
                        }
                    }
                );
            }
        })
    } catch (err) {
        res.send({ error: err.message.replace(/\"/g, ""), success: false });

    }
}

exports.update_smart_list = async (req, res) => {
    try {
        let slId = req.params.slId
        const adminId = req.params.adminId;
        const userId = req.params.userId;
        const new_folderId = req.body.folderId;
        const old_folderId = req.body.old_folderId;
        if (!slId) {
            res.json({
                success: false,
                msg: "Please give the leadsId  in params!"
            })
        }
        await smartlist.updateOne(
            { _id: slId, $and: [{ userId: userId }, { adminId: adminId }] },
            {
                smartlistname: req.body.smartlistname,
                criteria: req.body.criteria,
                folderId: new_folderId
            })
            .exec(async (err, data) => {
                if (err) {
                    res.send({
                        msg: err,
                        success: false,
                    });
                } else {
                    if (data.n < 1) {
                        return res.send({
                            msg: 'This is system generated membership Only admin can update',
                            success: false,
                        });
                    }
                    await smartFolder.findByIdAndUpdate(new_folderId, {
                        $addToSet: { smartlists: slId },
                    });
                    await smartFolder
                        .findByIdAndUpdate(old_folderId, {
                            $pull: { smartlists: slId },
                        })
                        .exec((err, temp) => {
                            if (err) {
                                res.send({
                                    msg: 'smartlist not updated',
                                    success: false,
                                });
                            } else {
                                res.send({
                                    msg: 'smartlist updated successfully',
                                    success: true,
                                });
                            }
                        });
                }


                // return res.send({ msg: "smartlist updated successfully", success: true });
            })
    } catch (err) {
        res.send({ msg: err.message.replace(/\"/g, ""), success: false });

    }

}

exports.delete_smart_list = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const userId = req.params.userId;
        let slId = req.params.slId;
        if (!slId) {
            res.json({
                success: false,
                msg: "no smarlist selected!"
            })
        }
        await smartlist.findOneAndRemove(
            { _id: slId, $and: [{ userId: userId }, { adminId: adminId }] },
            (err, data) => {
                if (!data) {
                    return res.send({
                        msg: 'This is system generated membership Only admin can delete',
                        success: false,
                    });
                }
                else {
                    smartFolder.updateOne(
                        { smartlists: data._id },
                        { $pull: { smartlists: data._id } },
                        function (err, temp) {
                            if (err) {
                                res.send({
                                    msg: 'smartlist not removed',
                                    success: false,
                                });
                            } else {
                                res.send({
                                    msg: 'smartlist removed successfully',
                                    success: true,
                                });
                            }
                        }
                    );
                }
            })
    } catch (err) {
        res.send({ error: err.message.replace(/\"/g, ""), success: false });

    }

}

exports.filterSmartlist = async (criteria, userId) => {
    let { membership_status, finance, renewal } = criteria
    let promises = [];
    let obj = criteria
    for (const i in obj) {
        if (obj[i].length && i !== "membership_status" && i !== "finance" && i !== "renewal") {
            promises.push({ [i]: { $in: obj[i] } })
        }
    }
    Promise.all(promises);
    if (promises.length) {
        var [leadData] = await member.aggregate([{
            $match: {
                userId: userId,
                $and: promises,
                email: { $ne: '' }
            }
        },
        {
            $project: { _id: 1 }
        },

        {
            $group: {
                _id: "",
                Ids: { $addToSet: "$_id" }
            }
        },

        ])


        if (leadData) {
            leadData = leadData.Ids
        }
        else {
            leadData = []
        }
    }
    if (membership_status) {
        var [membershipData] = await buymembership.aggregate([{
            $match: { userId: userId, membership_status: { $in: membership_status } }
        }, {
            $project: {
                studentInfo: 1,
                membership_status: 1
            }
        }, { $unwind: "$studentInfo" },
        {
            $lookup: {
                from: "members",
                localField: "studentInfo",
                foreignField: "_id",
                as: "data"
            }
        },
        {
            $project: {
                data: "$data._id",
                _id: 0,

            }
        },
        { $unwind: "$data" },
        {
            "$group": {
                "_id": "",
                "ids": { "$addToSet": "$data" }
            }
        },
        {
            $project: {
                _id: 0,
            }
        },
        ])
        if (membershipData) {
            membershipData = membershipData.ids
            if (leadData.length) {
                leadData = leadData.filter(e => {
                    return membershipData.some(item => String(item) === String(e));
                })
            } else {
                leadData = []
            }
        }
    }
    if (finance) {
        if (finance.includes('expired')) {
            var financeData = await financeInfo.aggregate(
                [{
                    $match: {
                        userId: userId
                    }
                },
                {
                    $project: {
                        studentId: 1,
                        expiry_date: 1,
                        month: { $month: "$$NOW" },
                        year: { $toInt: { $substrBytes: [{ $toString: { $year: "$$NOW" } }, 2, -1] } },
                        expired_month: { $toInt: { $substrBytes: ["$expiry_date", 0, 2] } },
                        expired_year: { $toInt: { $substrBytes: ["$expiry_date", 2, -1] } },

                    }
                },
                {
                    $addFields: {
                        studentId: { $convert: { input: '$studentId', to: 'objectId', onError: '', onNull: '' } }
                    }
                },
                {
                    $lookup: {
                        from: "members",
                        localField: "studentId",
                        foreignField: "_id",
                        as: "data"
                    }
                },
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $gte: ["$year", "$expired_year"] },
                                { $gte: ["$month", "$expired_month"] }
                            ]
                        },
                    }
                },
                {
                    $project: {
                        data: "$data._id",
                        _id: 0,

                    }
                },

                { $unwind: "$data" },
                {
                    "$group": {
                        "_id": "",
                        "data": { "$addToSet": "$data" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                    }
                },
                ]
            )
            financeData = financeData.data ? financeData.data : []
        }
        if (finance.includes('not_expired')) {
            let not_expiredFinance = await financeInfo.aggregate(
                [{
                    $match: {
                        userId: userId
                    }
                },
                {
                    $project: {
                        studentId: 1,
                        expiry_date: 1,
                        month: { $month: "$$NOW" },
                        year: { $toInt: { $substrBytes: [{ $toString: { $year: "$$NOW" } }, 2, -1] } },
                        expired_month: { $toInt: { $substrBytes: ["$expiry_date", 0, 2] } },
                        expired_year: { $toInt: { $substrBytes: ["$expiry_date", 2, -1] } },
                    }
                },
                {
                    $addFields: {
                        studentId: { $convert: { input: '$studentId', to: 'objectId', onError: '', onNull: '' } }
                    }
                },
                {
                    $lookup: {
                        from: "members",
                        localField: "studentId",
                        foreignField: "_id",
                        as: "data"
                    }
                },
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $gt: ["$expired_year", "$year"] },
                            ]
                        },
                    }
                },
                {
                    $project: {
                        data: "$data._id",
                        _id: 0

                    }
                },

                { $unwind: "$data" },
                {
                    "$group": {
                        "_id": "",
                        "data": { "$addToSet": "$data" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                    }
                },
                ]
            )
            if (financeData) {
                financeData.push(...not_expiredFinance[0].data)
            } else {
                financeData = [...not_expiredFinance[0].data]
            }
        }
        if (leadData.length) {
            leadData = leadData.filter(e => {
                return financeData.some(item => String(item) === String(e));
            })
        } else {
            leadData = []
        }
    }

    if (renewal) {
        var renewalData = await buymembership
            .aggregate([
                { $match: { userId: userId } },
                {
                    $project: {
                        membership_type: 1,
                        membership_name: 1,
                        membership_status: 1,
                        expiry_date: { $toDate: "$expiry_date" },
                        studentInfo: 1,
                    }
                },
                {
                    $lookup: {
                        from: "members",
                        localField: "studentInfo",
                        foreignField: "_id",
                        as: 'data'
                    }
                },
                {
                    $project: {
                        membership_name: 1,
                        membership_type: 1,
                        membership_status: 1,
                        data: 1,
                        expiry_date: 1,
                        days_till_Expire: {
                            $multiply: [{
                                $floor: {
                                    $divide: [{ $subtract: [new Date(), '$expiry_date'] }, 1000 * 60 * 60 * 24]
                                }
                            }, -1]

                        },
                    }
                },

                { $match: { days_till_Expire: { $lte: renewal[0], $gt: 0 } } },
                {
                    $project: {
                        data: "$data._id",
                        _id: 0

                    }
                },

                { $unwind: "$data" },
                {
                    "$group": {
                        "_id": "",
                        "data": { "$addToSet": "$data" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                    }
                },
            ])
        if (renewalData.length) {
            renewalData = renewalData[0].data
            if (leadData.length) {
                leadData = leadData.filter(e => {
                    return renewalData.some(item => String(item) === String(e));
                })
            } else {
                leadData = []
            }
        }
    }
    return leadData;
}

