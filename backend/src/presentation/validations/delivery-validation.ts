import { z } from 'zod';
import { CargoType, Destination } from '../../domain/entities/delivery';

export const createDeliverySchema = z.object({
  truckId: z.string({
    required_error: 'O ID do caminhão é obrigatório.',
    invalid_type_error: 'O ID do caminhão deve ser uma string.',
  }),
  driverId: z.string({
    required_error: 'O ID do motorista é obrigatório.',
    invalid_type_error: 'O ID do motorista deve ser uma string.',
  }),
  type: z.nativeEnum(CargoType, {
    required_error: 'O tipo de carga é obrigatório.',
    invalid_type_error: 'Tipo de carga inválido.',
  }),
  value: z
    .number({
      required_error: 'O valor da entrega é obrigatório.',
      invalid_type_error: 'O valor deve ser um número.',
    })
    .min(0, 'O valor não pode ser negativo.'),
  destination: z.nativeEnum(Destination, {
    required_error: 'O destino é obrigatório.',
    invalid_type_error: 'Destino inválido.',
  }),
  date: z.coerce.date({
    required_error: 'A data é obrigatória.',
    invalid_type_error: 'Data inválida.',
  }),
  insured: z
    .boolean({
      required_error:
        'O indicador de seguro é obrigatório para cargas eletrônicas.',
      invalid_type_error: 'O indicador de seguro deve ser um booleano.',
    })
    .optional(),
});

export const updateDeliverySchema = createDeliverySchema.partial();
