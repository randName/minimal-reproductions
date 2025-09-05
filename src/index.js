import { randomUUID, randomBytes } from 'node:crypto'

import { H3, serve, html, useSession, getQuery } from 'h3'
import { Issuer, generators } from 'openid-client'

import * as config from './config.js'
import { indexHtml, callbackHtml } from './html.js'

const sigKey = config.PRIVATE_SIG_KEY
const encKey = config.PRIVATE_ENC_KEY

const redirect_uri = config.REDIRECT_URI

const issuer = await Issuer.discover(config.ISSUER_URL)
const client = new issuer.Client(
	{
		client_id: config.CLIENT_ID,
		token_endpoint_auth_method: 'private_key_jwt',
		response_types: ['code'],

		id_token_signed_response_alg: sigKey.alg,

		id_token_encrypted_response_alg: encKey.alg,

		id_token_encrypted_response_enc: 'A256CBC-HS512',

		userinfo_signed_response_alg: sigKey.alg,

		userinfo_encrypted_response_alg: encKey.alg,

		userinfo_encrypted_response_enc: 'A256GCM',
	},
	{ keys: [sigKey, encKey] }
)

const app = new H3()

const toPublicKey = ({ d, ...key }) => key

app.get('/.well-known/keys', () => {
	return { keys: [toPublicKey(sigKey), toPublicKey(encKey)] }
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

	return { url }
})

app.get('/callback', async (evt) => {
	const session = await useSession(evt, config.session)

	try {
		const tokenSet = await client.callback(
			redirect_uri,
			getQuery(evt),
			session.data
		)
		console.log(tokenSet.claims())
		return callbackHtml(`ok`)
	} catch (err) {
		console.log(err)
		return callbackHtml('error during login')
	}
})

app.get('/', (evt) => {
	return html(evt, indexHtml())
})

serve(app, {
	port: 3080,
	silent: true,
})
