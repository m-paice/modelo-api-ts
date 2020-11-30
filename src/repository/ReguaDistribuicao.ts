import ReguaDistribuicao, {
  ReguaDistribuicaoInstance,
} from "../models/ReguaDistribuicao";
import BaseRepository from "./BaseRepository";

class ReguaDistribuicaoRepository extends BaseRepository<ReguaDistribuicaoInstance> {
  constructor() {
    super(ReguaDistribuicao);
  }
}

export default new ReguaDistribuicaoRepository();
