const Contenedor = require('../../store/contenedor.js');
const productsDB = new Contenedor('products')


function getAllProducts() {
    return productsDB.getAll();
}

function getProductById(id) {
    return productsDB.getById(id);
}

function deleteProductById(id) {
    return productsDB.deleteById(id);
}

function addProduct({ title, price, thumbnail, description, code, stock, timestamp }) {
    return productsDB.save({ title, price, thumbnail, description, code, stock, timestamp });
}

function updateProductById({ id, title, price, thumbnail, description, code, stock, timestamp }) {
    return productsDB.updateById({ id, title, price, thumbnail, description, code, stock, timestamp });
}

export default { addProduct, getAllProducts, updateProductById, deleteProductById, getProductById };