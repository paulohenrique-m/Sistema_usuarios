module.exports = app =>{
    const usuario = require("../controllers/usuario.controller.js")

    var router = require("express").Router();

    // READ
    router.get("/", usuario.get_usuario);

    // CREATE
    router.post("/add_usuario", usuario.add_usuario);

    // UPDATE
    router.post("/update_usuario", usuario.update_usuario);

    // DELETE
    router.post("/delete_usuario", usuario.delete_usuario);

    app.use('/usuarios', router);
}