const Usuario  = require("../models/func_db.js");

exports.get_usuario = (req, res) => {
    const usuario = {
        "nome": req.query.nome,
        "email": req.query.email,
        "telefone": req.query.telefone
    }
    
    Usuario.get_usuario(usuario, (err, dados) => {
        if(err){
            res.status(500).send({
                "msg": err.message || "Error"
            });
        }else{
            res.send(dados)
        }
    });
};

exports.update_usuario = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Vazio!"
        });
    }
    const usuario = new Usuario({
        id: req.body.id,
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        coordenada_x: req.body.coordenada_x,
        coordenada_y: req.body.coordenada_y
    });

    Usuario.update_usuario(usuario, (err, dados) => {
        if(err){
            res.status(500).send({
                "msg": err.message || "Error"
            });
        }else{
            res.send(dados)
        }
    });

}


exports.add_usuario = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Vazio!"
        });
    }

    const usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        coordenada_x: req.body.coordenada_x,
        coordenada_y: req.body.coordenada_y
    });

    Usuario.create_usuario(usuario, (err, dados) =>{
        // refatorar msg de erro para padrão
        if(err){
            res.status(500).send({
                "msg": err.message || "Error"
            });
        }else{
            res.send(dados)
        }
    });
}

exports.delete_usuario = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Vazio!"
        });
    }
    Usuario.delete_usuario(req.body.id, (err, dados)=>{
        if(err){
            res.status(500).send({
                "msg": err.message || "Error"
            });
        }else{
            res.send(dados)
        }
    });
}