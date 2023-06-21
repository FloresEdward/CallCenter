import express, { Express, application } from 'express'
import cors from 'cors'
import * as routes from './routes'
import authorizationMiddleware from './middlewares/authorizationMiddleware'
import morganMiddleware from './middlewares/morganMiddleware'
import logger from './logging/logger'
import errorHandler from './middlewares/errorMiddleware'

class Server {
    private app: Express

    constructor(app: Express) {
        if (!app) {
            throw new Error('Express instance is undefined')
        }
        this.app = app
        this.app.set('trust proxy', true)
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(morganMiddleware.config)
        // this.app.use(authorizationMiddleware)
    }

    errorHandler() {
        this.app.use(this.errorHandler)
        return this
    }

    routes() {
        this.app.use('/__gtg', routes.gtgRoute)
        // this.app.use('/departments', routes.departmentRoute)
        this.app.use('/employees', routes.employeeRoute)
        this.app.use('/products', routes.productRoute)
        this.app.use('/queryHandling', routes.queryHandlingRoute)
        return this
    }

    start(port: string) {
        this.app.listen(port, () => {
            logger.info(`[server]: Server is listening at port ${port}`)
        })
    }
}

const createServer = (app: Express) => new Server(app)

export default createServer
