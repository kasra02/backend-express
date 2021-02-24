import nodemailer from 'nodemailer'

const handle = (promise)=>{
    return promise
        .then(data=>([data,undefined]))
        .catch(error=>Promise.resolve([undefined,error]))
}

export const mainAuthorSendMailer = async (email,message,name) => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
        },
    });

    let [send,sendError] = await handle(transporter.sendMail({
        from: process.env.Mail_Sender_address,
        to: email,
        subject: `someone massage you - ${process.env.APP_NAME}`,
        text: `emali revieved from contact form ${name} sender email ${email}`,
        // html: showTemplate(email,message,name),
    }))


    if(sendError){
        throw new Error(`${sendError}`)
    }
    return send
}
//
// mainAuthorSendMailer('kasra.niroumand@gmail.com','hello','kasra')
//     .then(res=>{
//         console.log(res)
//     })
//     .catch(err=>{
//         console.log(err)
//     })