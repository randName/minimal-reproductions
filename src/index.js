import { randomUUID, randomBytes } from 'node:crypto'

import { H3, serve, html, useSession, getQuery, redirect } from 'h3'
import { Issuer, generators } from 'openid-client'

import * as config from './config.js'
import { createHtml, indexBody, callbackBody } from './html.js'

const sigKey = config.PRIVATE_SIG_KEY
const encKey = config.PRIVATE_ENC_KEY
const redirect_uri = config.REDIRECT_URI

const issuer = await Issuer.discover(config.ISSUER_URL)
const client = new issuer.Client(
	{
		client_id: config.CLIENT_ID,
		response_types: ['code'],
		token_endpoint_auth_method: 'private_key_jwt',

		// values are from Singpass
		id_token_signed_response_alg: 'ES256',
		id_token_encrypted_response_enc: 'A256CBC-HS512',

		...(config.USE_MOCKPASS_ISSUER
			? { id_token_encrypted_response_alg: encKey.alg }
			: null), // demo app is not encrypting

		// values are from Singpass
		userinfo_signed_response_alg: 'ES256',
		userinfo_encrypted_response_enc: 'A256GCM',

		userinfo_encrypted_response_alg: encKey.alg,
	},
	{ keys: [sigKey, encKey] }
)

const app = new H3()

app.get('/.well-known/keys', () => {
	return { keys: [sigKey, encKey].map(({ d, ...key }) => key) }
})

app.get('/url', async (evt) => {
	const nonce = randomUUID()
	const state = randomBytes(16).toString('hex')
	const code_verifier = generators.codeVerifier()

	const session = await useSession(evt, config.session)
	await session.update({ code_verifier, nonce, state })

	const url = client.authorizationUrl({
		redirect_uri,
		code_challenge_method: 'S256',
		code_challenge: generators.codeChallenge(code_verifier),
		nonce,
		state,
		scope: 'openid uinfin name',
	})

	return redirect(evt, url)
})

/** @param {import('openid-client').TokenSet} tokenSet */
const getUserinfo = async (tokenSet) => {
	try {
		return await client.userinfo(tokenSet)
	} catch (err) {
		console.log(`could not get userinfo: ${err}`)
		return null
	}
}

app.get('/callback', async (evt) => {
	const session = await useSession(evt, config.session)

	try {
		const tokenSet = await client.callback(
			redirect_uri,
			getQuery(evt),
			session.data
		)
		console.log(tokenSet.claims())
		console.log(await getUserinfo(tokenSet))
		return html(evt, createHtml(callbackBody(`login ok`)))
	} catch (err) {
		console.log(err)
		return html(evt, createHtml(callbackBody('error during login')))
	}
})

app.get('/', (evt) => {
	return html(evt, createHtml(indexBody))
})

const server = serve(app, {
	port: 3080,
	silent: true,
})

await server.ready()
console.log('server ready')
