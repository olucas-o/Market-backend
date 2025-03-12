import productReposotorie from '../repositories/productRepository.js';


async function createProductsService(newproduct, userId) {
    const product = await productReposotorie.createProductRepository(newproduct, userId);
    return product;
}

async function findAllProductsService() {
    const products = await productReposotorie.findAllProductsRepository();
    return products;
}

async function findProductByIdService(id) {
    const product = await productReposotorie.findProductByIdRepository(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
}

async function updateProductServise (newProduct, productId, userId) {
    const product = await productReposotorie.findProductByIdRepository(productId);
    if(!product) throw new Error("Product not exist");
    if(product.idUser !== userId) throw new Error("Unauthorized");
    const productUpdated = productReposotorie.updateproductRepository(productId, newProduct);
    return (productUpdated)
}

async function deleteProductService(productId, userId) {
    const product = await productReposotorie.findProductByIdRepository(productId);
    if(!product) throw new Error("Product not exist");
    if(product.idUser !== userId) throw new Error("Unauthorized");
    const {message} = await productReposotorie.deleteProductByIDRepository(productId);
    return message;
}

async function searchProductService(search) {
    if (!search) {
    return productReposotorie.findAllProductsRepository();
    }
    return productReposotorie.searchProductRepository(search);
}

async function searchProductsClassService(search) {
    if (!search) {
    return productReposotorie.findAllProductsRepository();
    }
    return productReposotorie.searchProducClasstRepository(search);
}

export default {
    createProductsService,
    findAllProductsService,
    findProductByIdService,
    updateProductServise,
    deleteProductService,
    searchProductService,
    searchProductsClassService
}