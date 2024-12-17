import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body); // Valida o body da requisição
      next(); // Continua para o próximo middleware se a validação passar
    } catch (error) {
      if (error instanceof ZodError) {
        next(error); // Passa o erro de validação para o middleware de erro
      } else {
        next(error); // Passa outros erros para o middleware de erro
      }
    }
  };
