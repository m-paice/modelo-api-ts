import carteiraRepository from '../repository/Carteira';
import { CarteiraInstance } from '../models/Carteira';
import BaseResource from './BaseResource';

import reguaNegociacaoResource from './ReguaNegociacao';

export class CarteiraResource extends BaseResource<CarteiraInstance> {
  constructor() {
    super(carteiraRepository);
  }

  async registrarRecebimento(data: {
    lojistaId: string;

    documento: string;
    nome: string;
    valor: number;
  }) {
    const { lojistaId, documento, nome, valor } = data;

    return this.create({
      lojistaId,
      documento,
      nome,
      operacao: 'recebimento',
      valor,
    });
  }

  async registrarComissao(data: {
    lojistaId: string;
    reguaNegociacaoId: string;
    valor: number;
  }) {
    const { lojistaId, reguaNegociacaoId, valor } = data;

    const reguaNegociacao = await reguaNegociacaoResource.findById(
      reguaNegociacaoId
    );

    const valorTaxa = valor * (reguaNegociacao.assessoria / 100);

    return this.create({
      lojistaId,
      documento: '123.123.123/0001-23',
      nome: 'Credas',
      operacao: 'comissao',
      valor: valorTaxa,
    });
  }

  async registraLancamentos(data: {
    lojistaId: string;
    reguaNegociacaoId: string;
    documento: string;
    nome: string;
    valor: number;
  }) {
    const { lojistaId, reguaNegociacaoId, documento, nome, valor } = data;

    await this.registrarRecebimento({
      lojistaId,
      documento,
      nome,
      valor,
    });
    await this.registrarComissao({ lojistaId, reguaNegociacaoId, valor });
  }

  async registrarSaque(data) {}

  async registrarTaxaTransferencia(data) {}

  async registraLancamentoSaque(data) {
    await this.registrarSaque(data);
    await this.registrarTaxaTransferencia(data);
  }
}

export default new CarteiraResource();
