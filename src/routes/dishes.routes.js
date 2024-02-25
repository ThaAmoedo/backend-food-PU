const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/uploads")
const DishesController = require('../controllers/DishesController')
const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)
const dishesController = new DishesController()

dishesRoutes.post("/", upload.single("image"), dishesController.create)
dishesRoutes.get("/", dishesController.index)
dishesRoutes.get("/:id", dishesController.show)
dishesRoutes.patch("/:id", upload.single("image"), dishesController.update)
dishesRoutes.delete("/:id", dishesController.delete)
module.exports = dishesRoutes
