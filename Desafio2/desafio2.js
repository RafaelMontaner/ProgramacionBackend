const { error } = require('console');
const fs = require('fs');

class Contenedor {
    constructor(file){
        this.file = file
    }

    async save(obj){
        try{
            const objects = await this.getAllOjects()
            const lastId = objects.length > 0 ? objects[objects.length-1].id : 0
            const newId = lastId + 1
            const newObj = {id: newId, ...obj}
            objects.push(newObj)
            await this.saveObjects(objects)
            return newId 

        }catch (error){
            throw new Error('Error al guardar el objeto')
        }
    }

    async getById(id){
        try{
            const objects = await this.getAllOjects()
            const obj = objects.find((o) =>o.id === id)
            return obj || null



        }catch(error){
            throw new Error('Error al obtener ID')
        }
    }

    async getAll(){
        try{
            const objects = await this.getAllOjects()
            return objects


        }catch(error){
            throw new Error('Error al obtener los objetos')

        }
    }

    async deleteById(id){
        try{


            let objects = await this.getAllOjects()
            objects = objects.filter((o) => o.id !== id)
            await this.saveObjects(objects)

        }catch(error){
            throw new Error('Error al eliminar los objetos')
        }
    }

    async deleteAll(){
        try{
            await this.saveObjects([])

        }catch(error){
            throw new Error('Error al eliminar todo')
        }
    }

    async getAllOjects(){
        try{
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return data ? JSON.parse(data) : []


        }catch(error){
            return []
        }
    }

    async saveObjects(objects){
        try{
            await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2))
        }catch(error) {
            throw new Error('Error al guardar   ')
        }
}
}

const main = async () => {
    const productos = new Contenedor("Productos.txt")

    //GUARDAR
const id = await productos.save(
    { title: 'Producto 3', price: 10}
)
console.log('Objeto guardado con ID:', id)

//OBTENER TODOS LOS OBJETOS
const allObjects = await productos.getAll()
console.log('Objetos guardados', allObjects)

//ELIMINAR OBJETO
//await productos.deleteById(1)
//console.log("Objeto Eliminado")

//Obtener objeto por ID
const obj = await productos.getById(2)
console.log("Objeto Obtenido", obj)
}



main().catch((error) => console.error(error))