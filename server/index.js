require("dotenv").config();

import express from 'express'
import next from 'next'
import { connectToDatabase } from "./database"

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

const port = 3000

nextApp.prepare().then(async () => {
    const app = express()


    /*
    app.get('/test', (req, res) => {
        return res.status(200).json({ hello: 'World' })
    })*/

    app.get('*', (req, res) => {
        return handle(req, res)
    })

    await connectToDatabase();


    app.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on localhost:${port}`)
    })
})

