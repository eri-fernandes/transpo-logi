import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export class ValidateSchemaMiddleware {
  constructor(private schema: ZodSchema<unknown>) {}

  validate = (req: Request, res: Response, next: NextFunction): void => {
    try {
      this.schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.errors.map((e) => e.message),
        });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor.' });
      }
    }
  };
}
