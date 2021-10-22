import type { Response } from 'express';

export const response_handler = (
	res: Response,
    success: boolean,
	code: number,
	message : string,
	data: unknown = null,
): Response => {
	return res.status(code).json({ success, code, message, data });
};

export const response_internal_server_error = (
	res: Response,
	message = 'Internal Server Error',
	errors: Array<string> = []
): Response => {
	return response_handler(res, false, 500, message, errors);
};