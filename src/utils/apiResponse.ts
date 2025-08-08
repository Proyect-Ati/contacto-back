import { Response } from 'express';
import { IApiResponse } from '../interfaces/apiResponse.interface';



export const apiResponse = (
  res: Response,
  statusCode: number,
  data: any = null,
  message: string = ''
): Response => {
  const response: IApiResponse = {
    data,
    message: message || getDefaultMessage(statusCode),
    statusCode
  };
  
  return res.status(statusCode).json(response);
};

const getDefaultMessage = (statusCode: number): string => {
  const messages: Record<number, string> = {
    200: 'Operación exitosa',
    201: 'Recurso creado exitosamente',
    204: 'Recurso eliminado exitosamente',
    400: 'Solicitud inválida',
    401: 'No autorizado',
    403: 'Prohibido',
    404: 'Recurso no encontrado',
    500: 'Error interno del servidor'
  };

  return messages[statusCode] || 'Operación completada';
};