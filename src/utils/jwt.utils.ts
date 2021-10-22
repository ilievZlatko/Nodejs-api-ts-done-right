import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
	return jwt.sign(object, privateKey, {
		...(options && options),
		algorithm: 'RS256',
	});
}

function verifyJWT(token: string) {
	try {
		const decoded = jwt.verify(token, publicKey);

		return {
			valid: true,
			expired: false,
			decoded,
		};
	} catch (error: any) {
		return {
			valid: false,
			expired: error.message === 'jwt expired',
			decoded: null,
		};
	}
}

export { signJWT, verifyJWT };
