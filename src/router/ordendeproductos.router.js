const router = require("express").Router();
const { faker } = require("@faker-js/faker");

const Ordendeproductos = require("../model/ordendeproductos");
// Rutas para el método find()

router.get('/ordendeproductos', async (req, res) => {
 try{ 
  const ordendeproductos = await Ordendeproductos.findAll();
  res.status(200).json({
    ok:true,
    status: 200,
    body: ordendeproductos,
  });
} catch (error) {
  console.error("Error al recuperar una orden de producto:", error);
  res.status(500).json({
    ok: false,
    status: 500,
    message: "Error al recuperar una orden de producto",
    error: error.message, // Puedes personalizar esto según tus necesidades
  });
}
});

router.post("/ordendeproductos", async (req, res) => {
  try{
    const dataOrdendeproductos = req.body;

    const createOrden = await Ordendeproductos.create({
      producto_id: dataOrdendeproductos.producto_id,
      pedido_id : dataOrdendeproductos.pedido_id,
      costo: dataOrdendeproductos.costo,
      cantidad: dataOrdendeproductos.cantidad,
      detalles: dataOrdendeproductos.detalles,
      notas: dataOrdendeproductos.notas,
    })
    res.status(201).json({
      ok:true,
      status:201,
      message: "Orden creada correctamente",
      body: createOrden,
    });
} catch(error){
  console.error("Error al ordenar:",error);
  res.status(500).json({
    ok:false,
    status:500,
    message: "Error al ordenar",
    error: error.message,
  });
}
});

router.delete("/ordendeproductos", async (req, res) => {
  try{
    const{id} = req.params;

    const existingOrden= await Ordendeproductos.findByPk(id);

    if (!existingOrden){
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Orden no encontrada",
      });
    }
    await Ordendeproductos.destroy({
      where: {
        id:id,
      },
    });
    res.status(200).json({
      ok:true,
      status:200,
      body: Ordendeproductos,
    });
  }catch (error) {
    console.error("Error al eliminar la orden")
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al eliminar la orden",
      error: error.message,
    });
  }
});
// Rutas para el método update()

router.get('/ordendeproductos/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const existingOrdendeproducto = await Ordendeproductos.findByPk(id);
    
    if (!existingOrdendeproducto){
      return res.status(404).json({
        ok:false,
        status: 404,
        message: "Orden no encontrado",
      });
    }
  const ordendeproductos = await Ordendeproductos.findOne({
    where: {
      id:id,
    },
  });
  res.status(200).json({
    ok: true,
    status: 200,
    body: ordendeproductos,
  });
}catch(error){
  console.error("Error al encontrar orden de producto:", error);
  res.status(500).jason({
    ok:false,
    status: 500,
    message: "Error al encontrar orden de productos",
    error: error.message,
  });
}
});

module.exports = router