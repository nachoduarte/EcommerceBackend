# EcommerceBackend
proyecto final para curso de programación backend desarrollado en Nodejs.

## Instalación

-para correr la app: `npm run build` 
-dentro de la carpeta generada /dist : `node main.js`
-es necesario para la persistencia de los datos crear los archivos products.txt y shoppingCarts.txt dentro de la carpeta /dist. 

## Persistencia de archivos en base de datos

El proyecto puede usar File System, Firebase o MongoDB para la persistencia en la base de datos, para utilizar MongoDB o Firebase:

1. Descomente la importacion del archivo de conexión en index.ts del proyecto

```

// import './store/mongoDb/connection' // connect to MongoDB
// import './store/firebase/connection' // connect to Firebase

import express from 'express'
// ...

```

2. Cambiar al DAO correspondiente en el archivo index.ts de la ruta  `src/store/daos/index.ts`

```

import productDaoFileSystem from './productDaoFileSystem'
import shoppingCartDaoFileSystem from './shoppingCartDaoFileSystem'
// import productDaoMongoDB from './productDaoMongoDB'
// import shoppingCartDaoMongoDB from './shoppingCartDaoMongoDB'
// import productDaoFirebase from '../../store/daos/productDaoFirebase'

const productDao = productDaoFileSystem
const shoppingCartDao = shoppingCartDaoFileSystem
export { productDao, shoppingCartDao }


```

3. Modificar el archivo .env del proyecto con los datos necesarios siguiendo el .env.example
