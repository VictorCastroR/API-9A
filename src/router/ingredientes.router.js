const router = require("express").Router();
const { faker } = require("@faker-js/faker");

const Ingredientes = require("../model/ingredientes");

router.get("/ingredientes", async (req, res) => {
    try {
      const ingredientes = await Ingredientes.findAll();
      res.status(200).json({
        ok: true,
        status: 200,
        body: ingredientes,
      });
    } catch (error) {
      console.error("Error al recuperar ingredientes:", error);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error al recuperar ingredientes",
        error: error.message, // Puedes personalizar esto según tus necesidades
      });
    }
  });
  
  router.post("/ingredientes", async (req, res) => {
    try {
      const dataIngredients = req.body;

      const createIngredients = await Ingredientes.create({
        nombre: dataIngredients.nombre,
        cantidad: dataIngredients.cantidad,
        unidad_medida: dataIngredients.unidad_medida,
      });
      res.status(201).json({
        ok: true,
        status: 201,
        message:
         "Ingredientes creado correctamente",
        body: createIngredients,
      });
    } catch (error) {
      console.error("Error al crear ingrediente:", error);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error al crear ingrediente",
        error: error.message, // Puedes personalizar esto según tus necesidades
      });
    }
  });
  
  //Eliminacion de ingredientes
  router.delete("/ingredientes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      // Verificar si el ingrediente existe antes de intentar eliminarlo
  
      const existingIngredient = await Ingredientes.findByPk(id);
  
      if (!existingIngredient) {
        return res.status(404).json({
          ok: false,
          status: 404,
          message: "Ingrediente no encontrado",
        });
      }
      // Eliminar el ingrediente
      await Ingredientes.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        ok: true,
        status: 200,
        body: Ingredientes,
      });
    } catch (error) {
      console.error("Error al eliminar ingrediente:", error);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error al eliminar ingrediente",
        error: error.message,
      });
    }
  });
  
  //Recuperar un ingrediente por id
  router.get("/ingredientes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const existingIngredient = await Ingredientes.findByPk(id);
  
      if (!existingIngredient) {
        return res.status(404).json({
          ok: false,
          status: 404,
          message: "Ingrediente no encontrado",
        });
      }
      const ingredientes = await Ingredientes.findOne({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        ok: true,
        status: 200,
        body: ingredientes,
      });
    } catch (error) {
      console.error("Error al encontrar ingrediente:", error);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Error al encontrar ingrediente",
        error: error.message,
      });
    }
  });

module.exports = router