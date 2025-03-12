import productsService from "../services/productService.js";

async function createProductController (req, res) {
    const newproduct = req.body;
    const userId = req.userId;
    try {
        const product = await productsService.createProductsService(newproduct, userId);
        res.status(201).send({product});
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function findAllProductsController(req, res) {
    try {
        const products = await productsService.findAllProductsService();
        res.send({ products });
    } catch (e) {
        res.status(400).send(e.message);
    }
}


async function findProductsByIdController(req, res) {
    const id  = req.params.id;
   try {
       const product = await productsService.findProductByIdService(id);
       res.send({ product });
   } catch (error) {
       if (error.message === 'Products not found') {
           res.status(404).send({ error: 'Products not found' });
       }
   };
}

async function updateProductsController(req, res) {
    const productId = req.params.id;
    const userId = req.userId;
    const newProduct = req.body;
    try{
        const product = await productsService.updateProductServise(newProduct, productId ,userId);
        res.send({product});
    } catch (e){
        res.status(400).send( e.message );
    }
}

async function deleteProductsContreller(req, res) {
    const { id } = req.params;
    const userId = req.userId
    try{
        const message = await productsService.deleteProductService(id,userId);
        res.send({ message });
    }catch(e){
        res.status(400).send( e.message );
    }
}

async function searchProductsController(req, res) {
    const { search } = req.query;
    try {
    const products = await productsService.searchProductService(search);
    res.send(products);
    } catch (e) {
        res.status(400).send( e.message );
    };
};

async function searchProductsClassController(req, res) {
    const { search } = req.query;
    try {
    const products = await productsService.searchProductsClassService(search);
    res.send(products);
    } catch (e) {
        res.status(400).send( e.message );
    };
};


export default {
    createProductController,
    findAllProductsController,
    findProductsByIdController,
    updateProductsController,
    deleteProductsContreller,
    searchProductsController,
    searchProductsClassController
}