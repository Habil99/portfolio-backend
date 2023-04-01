import { ValidationError } from 'class-validator';

export const normalizeValidatorErrors = (errors: ValidationError[]) => {
  return errors.map(error => {
    return {
      property: error.property,
      messages: Object.values(error.constraints as {}).join(', ')
    };
  });
}
