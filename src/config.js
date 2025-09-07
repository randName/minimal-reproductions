const USE_MOCKPASS_KEYS = true
export const USE_MOCKPASS_ISSUER = true

export const PRIVATE_SIG_KEY = /** @type {const} */ ({
	kid: 'my-sig-key',
	kty: 'EC',
	use: 'sig',
	...(USE_MOCKPASS_KEYS
		? {
				alg: 'ES512',
				crv: 'P-521',
				x: 'AAj_CAKL9NmP6agPCMto6_LiYQqko3o3ZWTtBg75bA__Z8yKEv_CwHzaibkVLnJ9XKWxCQeyEk9ROLhJoJuZxnsI',
				y: 'AZeoe0v-EwqD3oo1V5lxUAmC80qHt-ybqOsl1mYKPgE_ctGcD4hj8tVhmD0Of6ARuKVTxNWej-X82hEW_7Aa-XpR',
				d: 'AFOzlND2sq43ykty-VZXw-IEIOyHkBsNXUU77o5yEYcktpoMe9Dl3jsaXwzRK6wtDJH_uoz4IG1Uj4J_WyH5O3GS',
		  }
		: {
				alg: 'ES256',
				crv: 'P-256',
				x: 'tqG7PiAPD0xTBKdxDd4t8xAjJleP3Szw1CZiBjogmoc',
				y: '256TjvubWV-x-C8lptl7eSbMa7pQUXH9LY1AIHUGINk',
				d: 'PgL1UKVpvg_GeKdxV-oUEPIDhGBP2YYZLGiZ5HXDZDI',
		  }),
})

export const PRIVATE_ENC_KEY = /** @type {const} */ ({
	kid: 'my-enc-key',
	kty: 'EC',
	use: 'enc',
	...(USE_MOCKPASS_KEYS
		? {
				alg: 'ECDH-ES+A256KW',
				crv: 'P-521',
				x: 'AB-16HyJwnlSZbQtqhFskADqFrm6rgX9XeaV8FgynX61750GCRbYjoueDosSNt-qzK5QNHskdQw0QZ700YF2JIlb',
				y: 'AZwYlSBSdV-CxGRMz6ovTvWxKJ6e44gaZHf-YfbJV7w9VdAJb3OuzbHNGRuzNDjEa8eH-paLDaAB84ezrEm1SRHq',
				d: 'AP7xECOnlKW-FuLpe1h3ULZoqFzScFrbyAEQTFFG49j5HRHl0k13-6_6nWnwJ9Y8sTrGOWH4GszmDBBZGGvESJQr',
		  }
		: {
				alg: 'ECDH-ES+A256KW',
				crv: 'P-256',
				x: '_TSrfW3arG1Ebc8pCyT-r5lAFvCh_rJvC5HD5-y8yvs',
				y: 'Sr2vpuU6gzdUiXddGnRJIroXCfdameaR1mgU49H5h9A',
				d: 'AEabUwi3VjOOfiyoOtSGrqpl8cfhcUhNtj-xh1l-UYE',
		  }),
})

// staging demo app
export const CLIENT_ID = 'RsrOy2iB0edR53TJSuD5ULad1pGmrVZL'

export const REDIRECT_URI = 'http://localhost:3080/callback'

export const ISSUER_URL = USE_MOCKPASS_ISSUER
	? 'http://localhost:5156/singpass/v2'
	: 'https://stg-id.singpass.gov.sg'

export const session = {
	password: 'singpass-demo-app-session-password',
}
