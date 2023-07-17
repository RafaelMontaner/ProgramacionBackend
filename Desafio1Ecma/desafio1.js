class ProductManager {
    constructor(){
        this.products = [
        this.nextId= 1
        ]
    }

    addProduct(product){
        if (!this.isProductvalid(product)){
            console.log("Error: El producto no es válido")
            return
        }
        if (this.isCodeDuplicate(product.code)){
            console.log("Error: El codigo del producto ya está siendo utilizado")
            return
        }

        product.id= this.nextId++
        this.products.push(product)
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const product = this.products.find((p)=> p.id ===id)
        if(product){
            return product
        }else{
            console.log("Error: Producto no encontrado")
        }
    }

    isProductvalid(product){
        return(
            product.tittle &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }

    isCodeDuplicate(code){
        return this.products.some((p)=> p.code === code)

    }
}

//Instancia de ProducManager

const productManager = new ProductManager()

//Agregar Products 

productManager.addProduct({
    tittle: "Producto 1",
    description: "Detalle del Producto 1",
    price: 20,
    thumbnail: "/imageProducto1.jpg",
    code: "P01",
    stock: 5
})

productManager.addProduct({
    tittle: "Producto 2",
    description: "Detalle del Producto 2",
    price: 30,
    thumbnail: "/imageProducto2.jpg",
    code: "P02",
    stock: 15
})

//Obtener Products

const productsList = productManager.getProducts()

//Obtener Products por ID

const productId = productManager.getProductById(2)

//Obtener Products inexistente

const noProduct = productManager.getProductById(8)