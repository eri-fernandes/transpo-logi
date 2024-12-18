import { z } from 'zod';

// Regex atualizado para validar CNH com 11 dígitos numéricos
const licenseNumberRegex = /^\d{11}$/;

export const createDriverSchema = z.object({
  name: z
    .string({
      required_error: 'O nome do motorista é obrigatório.',
      invalid_type_error: 'O nome do motorista deve ser uma string.',
    })
    .min(3, 'O nome deve ter pelo menos 3 caracteres.')
    .nonempty('O nome não pode estar vazio.'),
  licenseNumber: z
    .string({
      required_error: 'O número da CNH é obrigatório.',
      invalid_type_error: 'O número da CNH deve ser uma string.',
    })
    .regex(
      licenseNumberRegex,
      'O número da CNH deve ter exatamente 11 dígitos numéricos (ex: 21259934801).'
    ),
});

export const updateDriverSchema = createDriverSchema.partial();
