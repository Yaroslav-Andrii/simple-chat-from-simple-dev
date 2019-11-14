import Joi from '@hapi/joi';
import User from '../interfaces/user.interface';

export function registerValidation(data: User): Joi.ValidationResult {

	// Setting validation schema
	const schema = Joi.object({
		name: Joi.string()
			.min(3)
			.max(255)
			.required(),
		email: Joi.string()
			.min(6)
			.required()
			.email(),
		password: Joi.string()
			.min(6)
			.required(),
	});

	// Validation
	const { error, value } = schema.validate(data);
	if (error) { 
		throw error;
	} 
	return value;
}

export function loginValidation(data: User): Joi.ValidationResult {

	// Setting validation schema
	const schema = Joi.object({
		email: Joi.string()
			.min(6)
			.required()
			.email(),
		password: Joi.string()
			.min(6)
			.required(),
	});

	// Validation
	const { error, value } = schema.validate(data);
	if (error) { 
		throw error;
	} 
	return value;
}