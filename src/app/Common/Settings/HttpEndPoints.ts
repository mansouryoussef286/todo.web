
export class HttpEndPoints {

	public static Account = {
		Authenticate: 'authentication',
		Refresh: 'authentication/refresh',
	}

	public static Tasks = {
		GetAll: 'todotasks/list',
		Create: 'todotasks',
	}
}
