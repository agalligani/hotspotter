// require('dotenv').config()
const express = require('express')
const app = express()
const fs = require('fs')
const cookieParser = require('cookie-parser')
const { create } = require('xmlbuilder2');

// const url = require('url')
// const path = require('path')
// const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')


app.use(cors(corsOptions))

app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static(__dirname + '/public')); 

app.use(express.json())
app.use(cookieParser())

app.post('/receive', (req, res) => {
    const { locations } = req.body
    const root = create({version: '1.0', encoding: "UTF-8"}).ele('kml').att('xmlns', 'http://www.opengis.net/kml/2.2').ele('Document')
    .ele('name').txt('Birding Hotpots').up()

    for (const l of locations) {

            root.ele('Placemark')
            .ele('name').txt(l.locName).up()
            .ele('description').txt(`${l.numSpeciesAllTime} species all time ...`).up()
            .ele('styleUrl').txt(`#icon-1899-0288D1`).up()
            .ele('Point').ele('coordinates').txt(`${l.lng},${l.lat},0`).up().up()
      }

    const xml = root.end({ prettyPrint: true });
    console.log(xml);
    const filePath = __dirname + '/public/hotspots.kml';

    try {
        fs.unlinkSync(filePath)
        console.log('file removed')
      } catch(err) {
        console.error(err)
      }

    fs.appendFile(filePath, xml, (err) => {
        if (err) throw err;
        console.log('Saved!');
      });

    res.status(200).send({ success: true });

});

app.listen(8080);

// const corsOptions = require('./config/corsOptions')
// const connectDB = require('./config/dbConn')
// const mongoose = require('mongoose')
// const PORT = process.env.PORT || 3500

// console.log(process.env.NODE_ENV)

// connectDB()

// app.use(logger)

// app.use(cors(corsOptions))

// app.use(express.json())

// app.use(cookieParser())

// app.use('/', express.static(path.join(__dirname, 'public')))

// app.use('/', require('./routes/root'))
// app.use('/auth', require('./routes/authRoutes'))
// app.use('/users', require('./routes/userRoutes'))
// app.use('/notes', require('./routes/noteRoutes'))

// app.all('*', (req, res) => {
//     res.status(404)
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'))
//     } else if (req.accepts('json')) {
//         res.json({ message: '404 Not Found' })
//     } else {
//         res.type('txt').send('404 Not Found')
//     }
// })

// app.use(errorHandler)

// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB')
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// })

// mongoose.connection.on('error', err => {
//     console.log(err)
//     logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
// })
