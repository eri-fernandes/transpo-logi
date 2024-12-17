import { z } from 'zod';

// Valida o formato da placa (padrão antigo e novo)
const licensePlateRegex = /^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;

export const createTruckSchema = z.object({
  licensePlate: z
    .string({
      required_error: 'A placa do caminhão é obrigatória.',
      invalid_type_error: 'A placa do caminhão deve ser uma string.',
    })
    .nonempty('A placa do caminhão não pode estar vazia.')
    .regex(
      licensePlateRegex,
      'A placa do caminhão deve estar no formato correto (LLL-0000 ou LLL0A00).'
    ),
});
