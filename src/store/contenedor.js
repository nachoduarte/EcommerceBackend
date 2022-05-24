const fs = require('fs')

module.exports = class Contenedor {
    constructor(nombreArchivo) {
        this.rutaArchivo = __dirname + `/${nombreArchivo}.txt`
        this.contID = 1
    }


    async getAll() {
        try {
            if (!fs.existsSync(this.rutaArchivo))
                throw new Error(`No se encontró ${this.rutaArchivo}`)
            const content = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
            if (!content.length > 0) {
                await fs.promises.writeFile(this.rutaArchivo, '[]')
            } else {
                const arr = JSON.parse(content)
                return arr
            }
            return []
        } catch (error) {
            throw new Error(`Error al leer archivo ${this.rutaArchivo}, Ver más: ${error.message}`)
        }
    }

    async save(obj) {
        try {
            let text = ''
            if (!fs.existsSync(this.rutaArchivo)) {
                obj.id = this.contID
                text = JSON.stringify([obj])
            } else {
                const content = await this.getAll()
                if (content.length > 0) {
                    this.contID = content[content.length - 1].id + 1
                } else {
                    this.contID = 1
                }
                obj.id = this.contID
                text = JSON.stringify([...content, obj])
            }
            await fs.promises.writeFile(this.rutaArchivo, text)
            return obj.id
        } catch (error) {
            throw new Error(`Error al guardar objeto: ${JSON.stringify(obj)} en el archivo ${this.rutaArchivo}, ver mas: ${error.message}`)
        }
    }

    async getById(id) {
        try {
            const content = await this.getAll()
            if (content.length > 0) {
                const obj = content.find((obj) => obj.id === parseInt(id))
                if (obj) return obj
            } else {
                throw new Error(`No se encontro la ID ${id} en el archivo ${this.rutaArchivo}`)
            }
        } catch (error) {
            throw new Error(`Error al obtener el ID ${id} en el archivo ${this.rutaArchivo}, ver mas: ${error.message}`)
        }
    }

    async updateById(obj) {
        try {
            const content = await this.getAll()
            if (!fs.existsSync(this.rutaArchivo) || content.length < 1) {
                throw new Error(`No se puede editar el objeto ${obj.id} del archivo ${this.rutaArchivo}`)
            }

            let updateObj = null
            const newContent = content.map((item) => {
                if (item.id === parseInt(obj.id)) {
                    updateObj = { ...item, ...obj, id: item.id }
                    return { ...item, ...obj, id: item.id }
                }
                return item
            })

            const text = JSON.stringify([...newContent])
            await fs.promises.writeFile(this.rutaArchivo, text)

            if (!updateObj)
                throw new Error(`No se puede editar el objeto ${obj.id} en el archivo ${this.rutaArchivo}`)
            return updateObj
        } catch (error) {
            throw new Error(`Error al editar el objeto ${obj.id} en el archivo ${this.rutaArchivo}, ver mas: ${error.message}`)
        }
    }

    async deleteById(id) {
        try {
            if (!fs.existsSync(this.rutaArchivo)) {
                throw new Error(`No se puede eliminar el objeto ${id} del archivo ${this.rutaArchivo}`)
            } else {
                const content = await this.getAll()
                if (content.length > 0) {
                    const index = content.findIndex((obj) => obj.id === parseInt(id))
                    if (index === -1) {
                        throw new Error(`No se puede eliminar el objeto ${id} del archivo ${this.rutaArchivo} porque no existe`)
                    } else {
                        content.splice(index, 1)
                        const text = JSON.stringify(content)
                        await fs.promises.writeFile(this.rutaArchivo, text)
                        return id
                    }
                }
            }
        } catch (error) {
            throw new Error(`Error al eliminar el objeto ${id} del archivo ${this.rutaArchivo}, ver mas: ${error.message}`)
        }
    }

    async deleteAll() {
        try {
          if (!fs.existsSync(this.rutaArchivo)) {
            throw new Error(
              `No se puede borrar el archivo ${this.rutaArchivo} porque no existe`
            )
          } else {
            await fs.promises.writeFile(this.rutaArchivo, '')
            console.log(`Se limpió el archivo: ${this.rutaArchivo}`)
          }
        } catch (error) {
          throw new Error(
            `Error al borrar el archivo: ${this.rutaArchivo}, ver mas: ${error.message}`
          )
        }
    }
}