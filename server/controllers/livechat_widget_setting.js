const User = require('../models/User');

exports.set_livechat_widget_setting = async (req, res) => {
    try{
        const {userId, maximized, minimized, theme, themeColor, moreOptions, alignTo, sideSpacing, bottomSpacing } = req.body;
        await User.findByIdAndUpdate(userId, {
            ...req.body
        });
        const newUser = await User.findById(userId);
        res.json(newUser)
    }
    catch (err) {
        res.send({ msg: err.message.replace(/\"/g, ""), success: false });
    }
}

exports.get_livechat_widget_setting = async (req, res) => {
    const { userId } = req.params;
    try{
        const user = await User.findById(userId);
        res.json({
            maximized: user.maximized,
            minimized: user.minimized,
            theme: user.theme,
            themeColor: user.themeColor,
            moreOptions: user.moreOptions,
            alignTo: user.alignTo,
            sideSpacing: user.sideSpacing,
            bottomSpacing: user.bottomSpacing,
        })
    }
    catch (err) {
        res.send({ msg: err.message.replace(/\"/g, ""), success: false });
    }
}