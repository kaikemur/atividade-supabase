import ExemploModel from '../models/ExemploModel.js';

import {
    upload as uploadStorage,
    deletar as deleteStorage,
} from '../lib/helpers/arquivoHelper.js';

const uploadArquivo = (tipo) => async (req, res) => {
    try {
      const { id } = req.params;
      
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

      const exemplo = await ExemploModel.buscarPorId(parseInt(id));

      if (!exemplo) return res.status(404).json({ error: 'Registro não encontrado para upload.' });

      if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado. Envie um arquivo!' });

      if (exemplo[tipo]) await deleteStorage(exemplo[tipo]);
      
      exemplo[tipo] = await uploadStorage(id, req.file);

      const data = await exemplo.atualizar();

      return res.status(200).json({ message: `${tipo} foi enviado com sucesso`, url: data[tipo] });
    } catch (error) {
      return res.status(500).json({ error: `Erro ao enviar ${tipo}.` });
    }
};

const buscarArquivo = (tipo) => async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json ({ error: 'ID invaldo.'});

        const exemplo = await ExemploModel.buscarPorId(parsenInt(id));

        if (!exemplo) return res.status(404).json ({error : 'registro não foi encontrado.'});

        if (exemplo[tipo]) return res.status(404).json ({ error: `Não tem nenhum ${tipo} cadastrado.`});
    
        return res.status(200).json({ url: exemplo[tipo] });
    } catch (error) {
        return res.status(500).json({ error: `Erro ao buscar ${tipo}.` });
    }
};

const deletarArquivo = (tipo) => async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json ({ error: 'ID invaldo.'});

        const exemplo = await ExemploModel.buscarPorId(parsenInt(id));

        if (!exemplo) return res.status(404).json ({error : 'registro não foi encontrado.'});

        if (exemplo[tipo]) return res.status(404).json ({ error: `Não tem nenhum ${tipo} para ser deletado.`});
    
        await deleteStorage(exemplo[tipo]);

        exemplo[tipo] = null;

        await exemplo.atualizar();

        return res.status(200).json({ message: `${tipo} deletado com sucesso!` });
    } catch (error) {
        return res.status(500).json({ error: `Erro ao deletar ${tipo}.` });
    }
};

export const uploadFoto = uploadArquivo('foto');

export const buscarFoto = buscarArquivo('foto');

export const deletarFoto = deletarArquivo('foto');

export const uploadDocumento = uploadArquivo('documento');

export const buscarDocumento = buscarArquivo('documento');

export const deletarDocumento = deletarArquivo('documento');