const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const moment = require('moment');
const app = express()
 
// const answer = require('../data/answer.json');
// const form = require('../data/formPdfForm.json');


const answer = require('../dados/answerfull.json');
const form = require('../dados/formfull.json');

// console.log(answer[0].id)
// console.log(form, answer);


app.get('/', (request, response)=> {
    ejs.renderFile(path.join(__dirname, "print.ejs"), { form, answer, moment}, (err, html) => {
        if(err) {
            return response.send(err, __dirname)
        }

        const options = {
            height: "11.25in",
            width: "8.5in",
            header: {
                height: "20mm"
            },
            footer: {
                height: "20mm"
            }  
        }

        pdf.create(html, options).toFile("report.pdf", (err, data) => {
            if (err) {
                return response.send("html")
            }       
            return response.send(html)
        })


    })

})

app.listen(3000)