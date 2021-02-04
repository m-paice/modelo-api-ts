import carteiraRepository from '../repository/Carteira';
import { CarteiraInstance } from '../models/Carteira';
import BaseResource from './BaseResource';

import LojistaResource from './Lojista';

export class CarteiraResource extends BaseResource<CarteiraInstance> {
  constructor() {
    super(carteiraRepository);
  }

  async registrarRecebimento(data: { lojistaId: string; valor: number }) {
    const { lojistaId, valor } = data;

    const lojista = await LojistaResource.findById(lojistaId);

    return this.create({
      lojistaId,
      documento: lojista.cnpj,
      nome: lojista.razaoSocial,
      operacao: 'recebimento',
      valor,
    });
  }

  async registrarComissao(data: { lojistaId: string; valor: number }) {
    const { lojistaId, valor } = data;

    const valorTaxa = valor * 0.15; // 15% de taxa

    return this.create({
      lojistaId,
      documento: '123.123.123/0001-23',
      nome: 'Credas',
      operacao: 'comissao',
      valor: valorTaxa,
    });
  }

  async registraLancamentos(data: { lojistaId: string; valor: number }) {
    const { lojistaId, valor } = data;

    await this.registrarRecebimento({ lojistaId, valor });
    await this.registrarComissao({ lojistaId, valor });
  }

  async registrarSaque(data) {}

  async registrarTaxaTransferencia(data) {}

  async registraLancamentoSaque(data) {
    await this.registrarSaque(data);
    await this.registrarTaxaTransferencia(data);
  }
}

export default new CarteiraResource();
