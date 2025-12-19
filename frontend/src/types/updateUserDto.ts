import { body } from 'express-validator'

export const updateUserValidation = [
  body('name').optional().isString().notEmpty(),
  body('email').optional().isEmail(),
  body('birthDate').optional().isISO8601(),

]