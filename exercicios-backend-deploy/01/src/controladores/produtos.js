const knex = require('../conexao')

const listarProdutos = async (req, res) => {
    const { usuario } = req;

    try {
        const query = await knex('produtos').where({usuario_id: usuario.id})

        return res.status(200).json(query);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const query = await knex('produtos').where({usuario_id: usuario.id, id})

        if (query.length === 0) {
            return res.status(404).json('Produto não encontrado');
        }

        return res.status(200).json(query[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarProduto = async (req, res) => {
    const { usuario } = req;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome) {
        return res.status(404).json('O campo nome é obrigatório');
    }

    if (!estoque) {
        return res.status(404).json('O campo estoque é obrigatório');
    }

    if (!preco) {
        return res.status(404).json('O campo preco é obrigatório');
    }

    if (!descricao) {
        return res.status(404).json('O campo descricao é obrigatório');
    }

    try {
        const query = await knex('produtos').insert({usuario_id: usuario.id, nome, estoque, preco, categoria, descricao, imagem}).returning('*')

        if (query.length === 0) {
            return res.status(400).json('O produto não foi cadastrado');
        }

        return res.status(200).json(query[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
        return res.status(404).json('Informe ao menos um campo para atualizaçao do produto');
    }

    try {
        const query = await knex('produtos').where({usuario_id: usuario.id, id})

        if (query.length === 0) {
            return res.status(404).json('Produto não encontrado');
        }
      
        const queryAtualizacao = await knex('produtos').update({usuario_id: usuario.id, nome, estoque, categoria, descricao, imagem}).where({id})

        if (queryAtualizacao.length === 0) {
            return res.status(400).json("O produto não foi atualizado");
        }

        return res.status(200).json('produto foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const query = await knex('produtos').where({usuario_id: usuario.id, id})

        if (query.length === 0) {
            return res.status(404).json('Produto não encontrado');
        }

        const produtoExcluido = await knex('produtos').del().where({id})

        if (produtoExcluido.length === 0) {
            return res.status(400).json("O produto não foi excluido");
        }

        return res.status(200).json('Produto excluido com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
}