const router = require("express").Router();
const { faker } = require("@faker-js/faker");

const Producto = require("../model/producto");

router.get("/producto", async (req, res) => {
    try{
        const producto = await Producto.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: producto,
        });
    }catch (error){
            console.error("Error al recuperar un poducto:", error);
            res.status(200).json({
                ok:false,
                status: 500,
                message: "Error al recuperar un producto",
                error: error.message,
            });
        }
    });

    router.post("/producto", async (req, res) =>{
        try{
            const dataProducto = req.body;
            Producto.sync()
            const createProducto = await Producto.create({
                nombre: dataProducto.nombre,
                descripcion: dataProducto.descripcion,
                precio: dataProducto.precio,
                ingredientes_id: dataProducto.ingredientes_id ,
            });
            res.status(200).json({
                ok: true,
                status: 201,
                message: "producto creado correctamente",
                body: createProducto,
            });
        }catch (error){
            console.error("Error al crear un producto");
            res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al crear un producto",
                error:error.message,
            });
        }
    });

    router.delete("/producto/:id", async (req, res)=> {
    try{
        const { id } = req.params;

        const existingProducto = await Producto.findByPk(id);

        if (!existingProducto){
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Producto no encontrado",
            });
        }

        await Productos.destroy({
            where:{
                id:id,
            },
        });
        res.status(200).json({
            ok:true,
            status:200,
            body: Producto,
        });
    }catch (error){
        console.error("Error al eliminar un producto:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al eliminar un producto",
            error: error.message,
        });
    }
    });

    router.get("/producto/:id", async (req,res) => {
        try{
            const {id} = req.params;
            const existingProducto= await Productos.findByPk(id);

            if (!existingProducto){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "Producto no encontrado",
                });
            }
            const productos = await Producto.findOne({
                where:{
                    id:id,
                },
            });
            res.status(200).json({
                ok:true,
                status: 200,
                body: producto,
            });
        }catch(error){
            console.error("Error al encontrar un producto:", error);
            res.status(500).json({
                ok:false,
                status: 500,
                message: "Error al encontrar un producto",
                error: error.message,
            });
        }
    });

    module.exports = router