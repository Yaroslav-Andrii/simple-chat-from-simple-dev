import Joi from '@hapi/joi';
import IChat from '../interfaces/chat.interface';

export function chatValidator(data: IChat): Joi.ValidationResult {

	// Setting validation schema
	const schema = Joi.object({
		name: Joi.string()
			.min(3)
			.max(255)
			.required(),
		users: Joi.array()
			.required(),
		messages: Joi.array(),
		type: Joi.string()
			.pattern(/^(public|friend)$/i)
			.required(),
	});

	// Validation
	const { error, value } = schema.validate(data);
	if (error) { 
		throw error;
	} 
	return value;
}