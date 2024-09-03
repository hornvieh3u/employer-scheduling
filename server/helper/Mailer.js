const nodemailer = require('nodemailer');

module.exports = class Mailer {
    constructor(mailOptions) {
        this.mailOptions = mailOptions;
        this.transporter = nodemailer.createTransport({
            host: 'mail.mymanager.com',
            port: 587,
            secure: false,
            auth: {
                user: 'admin@mymanager.com',
                pass: 'Rr42728292',
            },
            use_authentication: true,
            replyTo: "postmaster@mymanager.com",
            dkim: {
                domainName: "mymanager.com",
                keySelector: "mail",
                privateKey: "-----BEGIN RSA PRIVATE KEY-----\n" +
                    "MIICXQIBAAKBgQCnUPSksf8fEIVa4l7eWSYIqH8mnU6T1CtcchbW9J/L/iwVK5OV\n" +
                    "dI2MgaUR3spVccgnkcmf9b5doqnSFTE3QU6j/tIENe7/nhO3mP2sPir59m2ZsZXX\n" +
                    "r8vWHpDOPcxcEbvPZfUwW+cUsmy6nBIclDfIaBanFFkYJ3dfDfz4cGCaMQIDAQAB\n" +
                    "AoGBAIfhj01R4UdxO1wcC7+31tOhQ+IwTuhvnudtIG9iK4SX32UyBqGSDoLVpyFk\n" +
                    "Nh4+UbcRBxYJlZilyhT7cQTW3O2yOIbHT1XjHz74yXmhgY+oFd7dmDL4PYymFWt5\n" +
                    "Ej4iqGv/HtZXSpEGjTvP2lixHbffvzvRB6w1Sq0KK3aABL2BAkEA2LmkhA3vxTXm\n" +
                    "S/mRCKK1M7ib2+ZrpJ/JelACueijU4o+ZZhWhVXD1jXTXh1eE4lZKOLzc6a94dyW\n" +
                    "SO/YdfDmFQJBAMWjH7SLEzixU2+u8N41V0yqajaKhKEpBkZugBqVdZy5U42HMJ31\n" +
                    "+Z+KqRL75grUBg7MwObTsElrXfev4yo2Jq0CQGSUa1x510/v/sw9q2iVkoDJaVP5\n" +
                    "sPU6ztd78Hf1Fm971g9yTp0cu4Fbg5fHC1UHxiAqi4+dz7vVks2QuiWqQi0CQQCp\n" +
                    "ks/2UcnZP9TOI7UJg4z2+9UMHQe1W4TF07PYm1qBcUXuTgt5zP40VH3DCx0TN15H\n" +
                    "PolYxFMie5vxlBl+M141AkBZC+H5/4I5cgM3w+qs7YDTVV2/4vg3KH8OVN8XOvXv\n" +
                    "F6LoDyTfqbaQFwiZC8dJESIWhQYmyG+lP8fxg3r0zIu1\n" +
                    "-----END RSA PRIVATE KEY-----"
            }
        });
    }

    sendMail = async () => {
        const { from = "mymanger <hello@mymanager.com>", to = [], subject = '', text = '', html = '', attachments = null, replyTo, reqName } = this.mailOptions;
        return new Promise((resolve, reject) => {
            for (let recipient of to) {
                this.transporter.sendMail({
                    from: from,
                    replyTo: replyTo,
                    envelope: {
                        from: 'admin@mymanager.com',
                        to: [recipient]
                    },
                    to: recipient,
                    subject: subject,
                    html: `<html>
                    <head>
                
                    </head>
                    <body style="background-color: #f5f6fb; font-size: 11px;">
                        
                        <div style="width: 80%; max-width: 500px; background-color: white; margin: auto; padding: 20px; margin-top: 20px; margin-bottom: 20px;">
                            <div style="padding:10px; border-bottom: 1px solid #bea1a1;">
                                <span style="color: #b1aeae;">##-Please type your reply above this line-##</span>
                            </div>
                            <div style="padding: 10px; font-size: 12px;">
                                <p style="color: #1b1a1a;">
                                    Hello ${reqName}
                                    <br>
                                    <br>
                                    ${text}
                                </p>
                            </div>
                            <div style="padding: 10px; border-top: 1px solid #bea1a1;">
                                <div style="color: #b1aeae; line-height: 1.7;">This email is a service from BBQGuys Sales</div>
                                <div style="color: #b1aeae;">Deliverd by Mymember</div>
                            </div>
                        </div>
                    </body>
                </html>`,
                    attachments: attachments,
                }, (error, info) => {
                    if (error) {
                        resolve({
                            msg: 'Email not sent',
                            success: false
                        });
                    } else {

                        resolve({
                            msg: 'Email sent: ' + info.response,
                            success: true
                        });
                    }
                });
            }

        })
    }
}