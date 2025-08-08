import { Request, Response, NextFunction } from 'express';
import { apiResponse } from '../utils/apiResponse';

export const validateContactId = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return apiResponse(res, 400, null, 'No existe el registro');
  }
  next();
};

export const validateContactData = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const { name } = req.body;
  
  if (!name) {
    return apiResponse(res, 400, null, 'El nombre es requerido');
  }

  next();
};
