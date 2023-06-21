import express, {
    Request,
    Response,
    RequestHandler,
    NextFunction,
} from 'express'

import ProductService from '../services/productService'

const router = express.Router()

//find all
router.get('/', async (req: Request, resp: Response, next) => {
    try {
        const products = await ProductService.getInstance().findAll()
        resp.status(200).json(products)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const existingProduct = await ProductService.getInstance().findById(
            req.params.id
        )

        if (existingProduct) {
            resp.status(200).json(existingProduct)
        } else {
            resp.status(404).json({
                message: `product_not_found: ${req.params.id}`,
            })
        }
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const payload = { ...req.body }
        const newProduct = await ProductService.getInstance().save(payload)
        resp.status(201).json({ ...newProduct.dataValues })
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const productId = req.params.id
        const data = await ProductService.getInstance().update(productId, {
            ...req.body,
        })

        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const productId = req.params.id
        await ProductService.getInstance().deleteByPrimaryKey(productId)

        res.status(200).json({
            message: `product_successfully_deleted: ${productId}`,
        })
    } catch (err) {
        next(err)
    }
})

export default router
