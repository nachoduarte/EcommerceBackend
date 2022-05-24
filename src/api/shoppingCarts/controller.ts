import express from 'express'
import * as response from '../../network/response'
import model from './model'
import productModel from '../products/model'

const router = express.Router()
router.post('/', addShoppingCart)
router.post('/:id/products/:id_prod', addProductToShoppingCart)
router.get('/:id/products', getShoppingCartById)
router.delete('/:id', deleteShoppingCartById)
router.delete('/:id/products/:id_prod', deleteProductFromShoppingCart)

function addShoppingCart(req, res, next) {
    model.addShoppingCartById().then((shoppingCart) => response.success(req, res, shoppingCart)).catch(next)
}

function getShoppingCartById(req, res, next) {
    const { id } = req.params
    model.getShoppingCartById(id).then((shoppingCart) => response.success(req, res, shoppingCart)).catch(next)
}

function deleteShoppingCartById(req, res, next) {
    const { id } = req.params
    model.deleteShoppingCartById(id).then((shoppingCart) => response.success(req, res, shoppingCart)).catch(next)
}

async function addProductToShoppingCart(req, res, next) {
    const { id, id_prod } = req.params
    const productId = parseInt(id_prod)

    try {
        const shoppingCart = await model.getShoppingCartById(id)
        const product = await productModel.getProductById(productId)

        if (!product){
            return
        }

        let updatedProducts
        if (shoppingCart.products) {
            const exists = shoppingCart.products.find((item) => item.id === productId)
            if (exists) return response.error(req, res, 'Product already exists', 400)
            updatedProducts = [...shoppingCart.products, product]
        } else {
            updatedProducts = [product]
        }

        const shoppingCartUpdated = await model.updateShoppingCart({ id, products: updatedProducts })
        response.success(req, res, shoppingCartUpdated)
    } catch (error) {
        next(error)
    }
}

async function deleteProductFromShoppingCart(req, res, next) {
    const { id, id_prod } = req.params
    const productId = parseInt(id_prod)

    try {
        const shoppingCart = await model.getShoppingCartById(id)

        if (!shoppingCart.products) {
            return response.error(req, res, 'Shopping cart is empty', 400)
        }

        const updatedProducts = shoppingCart.products.filter((item) => item.id !== productId)
        const shoppingCartUpdated = await model.updateShoppingCart({ id, products: updatedProducts })
        response.success(req, res, shoppingCartUpdated)
    } catch (error) {
        next(error)
    }
}

export default router