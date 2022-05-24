const Contenedor = require('../../store/contenedor.js')
const shoppingCartDB = new Contenedor('shoppingCarts')

function addShoppingCartById() {
    return shoppingCartDB.save({})
}

function getShoppingCartById(id) {
    return shoppingCartDB.getById(id)
}

function deleteShoppingCartById(id) {
    return shoppingCartDB.deleteById(id)
}

function updateShoppingCart({ id, products }) {
    return shoppingCartDB.updateById({ id, products })
}

export default { getShoppingCartById, updateShoppingCart, deleteShoppingCartById, addShoppingCartById }
   
