import nodemailer from "nodemailer";

function sendEmailReset ( id:number,email:string, tokenReset:string){
    if (process.env.email_host){
                
        var transport = nodemailer.createTransport({
            host: process.env.email_host,
            port: Number(process.env.email_port),
            auth: {                        
                user: process.env.email_user,
                pass: process.env.email_pass
            }
        });                              
        transport.sendMail({
                from: "no-replay@proffy.com.br",
                to: email,
                subject: "Recuperar conta",                  
                html: ` <h1> Use o link abaixo para resetar sua senha </h1>
                        <a url="${process.env.link_reset}?id=${id}&token=${tokenReset}">Clique aqui!</a> `
                

            }
        )


    }
}

export default sendEmailReset;