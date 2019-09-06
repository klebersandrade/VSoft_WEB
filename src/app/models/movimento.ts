import { Vaga } from './vaga';
import { Cliente } from './cliente';

export interface Movimento {
    id?: number;
    vaga?: Vaga;
    cliente?: Cliente;
    dataEntrada?: Date;
    dataSaida?: Date;
    valorPermanencia?: number;
    qtdHorasExtras?: number;
    valorHorasExtras?: number;
    valorTotal?: number;
}
