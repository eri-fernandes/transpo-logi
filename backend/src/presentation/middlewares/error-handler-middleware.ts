/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { BaseException } from '../../domain/exceptions/base-exception';

interface ErrorResponse {
  status: string;
  message: string;
  code: number;
  details?: unknown;
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction // É importante manter este argumento
): Response => {
  // Log do erro para debugging
  console.error('[Error Handler]:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  const errorResponse: ErrorResponse = {
    status: 'error',
    message: 'Internal server error',
    code: 500,
  };

  // Tratamento para nossas exceções personalizadas
  if (error instanceof BaseException) {
    errorResponse.status = error.name;
    errorResponse.message = error.message;
    errorResponse.code = error.statusCode;
  }

  // Tratamento para erros de validação do Zod
  else if (error instanceof ZodError) {
    errorResponse.status = 'ValidationError';
    errorResponse.message = 'Invalid request data';
    errorResponse.code = 400;
    errorResponse.details = error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
  }

  // Tratamento para erros de sintaxe JSON
  else if (error instanceof SyntaxError && 'body' in error) {
    errorResponse.status = 'SyntaxError';
    errorResponse.message = 'Invalid JSON format';
    errorResponse.code = 400;
  }

  // Outros erros não tratados
  else {
    // Em produção, não envie detalhes do erro interno
    if (process.env.NODE_ENV === 'production') {
      errorResponse.message = 'An unexpected error occurred';
    } else {
      errorResponse.message = error.message;
      errorResponse.details = {
        name: error.name,
        stack: error.stack,
      };
    }
  }

  // Adiciona o timestamp à resposta
  const response = {
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    ...errorResponse,
  };

  return res.status(errorResponse.code).json(response);
};
