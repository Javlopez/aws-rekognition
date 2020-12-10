import express from 'express'

const router = express.Router()

router.post('/upload')

function Router(app) {
    app.use('/api', router)
}

export default Router
