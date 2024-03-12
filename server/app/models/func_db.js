const sql = require("./db.js");

const Usuario = function(usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.telefone = usuario.telefone;
    this.coordenada_x = usuario.coordenada_x;
    this.coordenada_y = usuario.coordenada_y;
};

Usuario.get_usuario = (usuario, results) =>{
    let query = "SELECT * FROM tb_usuario";

    query+= " WHERE TRUE"

    if(usuario){
        query +=usuario.nome?` AND nome ILIKE '%${usuario.nome}%' `:'';
        query +=usuario.email?` AND email ILIKE '%${usuario.email}%' `:'';
        query +=usuario.telefone?` AND telefone ILIKE '%${usuario.telefone}%' `:'';
    }
    query+= " AND ativo ORDER BY id ASC;";
    sql.query(query, (err, res) =>{
        if(err){
            console.log(err);
            results(null, err);
            return;
        }
        results(null, res.rows);  
    });
};

Usuario.update_usuario = (usuario, results) => {
    sql.query(
        `UPDATE tb_usuario SET nome='${usuario.nome}', 
                               email='${usuario.email}', 
                               telefone='${usuario.telefone}',
                               coordenada_x='${usuario.coordenada_x}',
                               coordenada_y='${usuario.coordenada_y}'
        WHERE id= '${usuario.id}'`,
        (err, res) => {
            if (err) {
                console.error(err);
                results(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                results({"msg":"não encontrado"}, null);
                return;
            }
            console.log("atualizado com sucesso");
            results(null, res.rows)
        }
    )
};

Usuario.create_usuario = (usuario, results) => {
    const query = `INSERT INTO tb_usuario (nome, email, telefone, coordenada_x, coordenada_y) 
    VALUES('${usuario.nome}', 
           '${usuario.email}',
           '${usuario.telefone}',
           '${usuario.coordenada_x}',
           '${usuario.coordenada_y}') RETURNING *`;
    sql.query(query, (err, res) =>{
        if(err) {
            console.error(err);
            results(null, err);
        }
        console.log("Usuario criado com sucesso");
        results(null, res.rows); 
    });
};

Usuario.delete_usuario = (id, results) => {
    sql.query(
        `UPDATE tb_usuario SET ativo = false WHERE id = '${id}'`,
        (err, res) => {
            if (err) {
                console.error(err);
                results(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                results({"msg":"usuário não encontrado"}, null);
                return;
            }
            console.log("Usuário desativado com sucesso");
            results(null, res.rows)
        }
    )
};

module.exports = Usuario;