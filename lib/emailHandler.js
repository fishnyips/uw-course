var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pear.partnerships@gmail.com',
        pass: 'pear2019'
    }
});


module.exports = {
    /*
        Send email to PM,
        Only for vacation request for now.
    */
    sendInfo: function(data, callback) {
        var mailOptions = {
            from: 'pear.partnerships@gmail.com',
            to: 'tonyliu12345@hotmail.com, yipcrystal98@gmail.com',
            subject: 'Sending Email using Node.js',
            html: data
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },

    sendInfoDerek: function(data, callback) {
        var mailOptions = {
            from: 'pear.partnerships@gmail.com',
            to: 'dkwang@hotmail.com, yipcrystal98@gmail.com',
            subject: 'Class enrolment update',
            html: data
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};