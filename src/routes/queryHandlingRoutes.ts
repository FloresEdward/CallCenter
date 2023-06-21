import express, {
    Request,
    Response,
    RequestHandler,
    NextFunction,
} from 'express'

import QueryHandlingService from '../services/queryHandlingService'

const router = express.Router()

//find all
router.get('/', async (req: Request, resp: Response, next) => {
    try {
        const queries = await QueryHandlingService.getInstance().findAll()
        resp.status(200).json(queries)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const existingQuery = await QueryHandlingService.getInstance().findById(
            req.params.id
        )

        if (existingQuery) {
            resp.status(200).json(existingQuery)
        } else {
            resp.status(404).json({
                message: `query_not_found: ${req.params.id}`,
            })
        }
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const payload = { ...req.body }

        const newQueryHandling = await QueryHandlingService.getInstance().save(
            payload
        )

        resp.status(201).json({ ...newQueryHandling.dataValues })
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const queryId = req.params.id
        const data = await QueryHandlingService.getInstance().update(queryId, {
            ...req.body,
        })

        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const queryId = req.params.id
        await QueryHandlingService.getInstance().deleteByPrimaryKey(queryId)

        res.status(200).json({
            message: `product_successfully_deleted: ${queryId}`,
        })
    } catch (err) {
        next(err)
    }
})

export default router
