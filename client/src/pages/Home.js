import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Modal from 'react-modal';
function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [nomeFiltro, setNomeFiltro] = useState('');
  const [emailFiltro, setEmailFiltro] = useState('');
  const [telefoneFiltro, setTelefoneFiltro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioAtual, setUsuarioAtual] = useState({
    id: null,
    nome: '',
    email: '',
    telefone: ''
  });
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [adicionandoUsuario, setAdicionandoUsuario] = useState(false);

  useEffect(() => {
    handleListaLimpa()
  }, []);

  const handleFiltro = () => {
    let url = '/usuarios?';
    if (nomeFiltro) {
      url += `nome=${nomeFiltro}&`;
    }
    if (emailFiltro) {
      url += `email=${emailFiltro}&`;
    }
    if (telefoneFiltro) {
      url += `telefone=${telefoneFiltro}&`;
    }
    console.log(url)
    axios.get(url)
    .then(res => {
        setUsuarios(res.data);
    })
    .catch(err => {
        console.error(err);
    });
  };

  const handleListaLimpa = () => {
    setNomeFiltro('');
    setEmailFiltro('');
    setTelefoneFiltro('');
    axios.get('/usuarios')
      .then(res => {
        setUsuarios(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleAbrirModal = (usuario) => {
    // modal pode adicionar ou modificar o usuario
    if (usuario) {
      setUsuarioEditando(usuario);
      setUsuarioAtual({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone
      });
    } else {
      setUsuarioEditando(null);
      setUsuarioAtual({
        nome: '',
        email: '',
        telefone: ''
      });
    }
    setModalAberto(true);
    setAdicionandoUsuario(!usuario);
  };
  
  const handleFecharModal = () => {
    setModalAberto(false);
    setUsuarioAtual({
      id: null,
      nome: '',
      email: '',
      telefone: ''
    });
    handleListaLimpa();
  };

  const handleInserirModal = (e) => {
    const { name, value } = e.target;
    setUsuarioAtual({ ...usuarioAtual, [name]: value });
  };

  const handleModificarUsuario = () => {
    axios.post(`/usuarios/update_usuario`, usuarioAtual)
      .then(res => {
        const index = usuarios.findIndex(u => u.id === usuarioAtual.id);
        const novosUsuarios = [...usuarios];
        novosUsuarios[index] = res.data;
        setUsuarios(novosUsuarios);
        handleFecharModal();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleAdicionarUsuario = () => {
    axios.post(`/usuarios/add_usuario`, usuarioAtual)
      .then(res => {
        setUsuarios([...usuarios, res.data]);
        handleFecharModal();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleDeleteUsuario = (id) => {
    axios.post('/usuarios/delete_usuario', { id })
      .then(() => {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <h1>LISTA DE USUÁRIOS</h1>
      <div>
        <input type="text" placeholder="Nome" value={nomeFiltro} onChange={(e) => setNomeFiltro(e.target.value)}/>
        <input type="text" placeholder="Email" value={emailFiltro} onChange={(e) => setEmailFiltro(e.target.value)}/>
        <input type="text" placeholder="Telefone" value={telefoneFiltro} onChange={(e) => setTelefoneFiltro(e.target.value)}/>
        <button onClick={handleFiltro}>Filtrar</button>
        <button onClick={handleListaLimpa}>Limpar Filtro</button>
      </div>
      <div className="list_box" >
          <ul>
            {usuarios.map(usuario => (
              <li key={usuario.id}>
                {usuario.nome} - {usuario.email} - {usuario.telefone}
                <div>
                    <button onClick={() => handleAbrirModal(usuario)}>Update</button>
                    <button onClick={() => handleDeleteUsuario(usuario.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
          <Modal
            isOpen={modalAberto}
            onRequestClose={handleFecharModal}
            contentLabel={adicionandoUsuario ? "Adicionar Usuário" : "Atualizar"}
          >
            <h2>{adicionandoUsuario ? "Adicionar Usuário" : "Atualizar Usuário"}</h2>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={usuarioAtual.nome}
              onChange={handleInserirModal}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={usuarioAtual.email}
              onChange={handleInserirModal}
            />
            <label>Telefone:</label>
            <input
              type="text"
              name="telefone"
              value={usuarioAtual.telefone}
              onChange={handleInserirModal}
            />
            <button onClick={adicionandoUsuario ? handleAdicionarUsuario : handleModificarUsuario}>
              {adicionandoUsuario ? "Adicionar" : "Alterar"}
            </button>
            <button onClick={handleFecharModal}>Cancelar</button>
          </Modal>
      </div>
      <div>
        <button onClick={() => handleAbrirModal(null)}>Adicionar</button>
      </div>
    </div>
  );
}

export default Home;
