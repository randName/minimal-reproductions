export const indexHtml = () => /*html*/ `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" href="data:null" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Singpass demo app</title>
	</head>
	<body>
		<div id="app">
			<button id="login">login</button>
		</div>
		<script type="module">
		document.querySelector('#login').onclick = async () => {
			const resp = await fetch('/url')
			const data = await resp.json()
			location.href = data.url
		}
		</script>
	</body>
</html>`

export const callbackHtml = (message) => /*html*/ `<!DOCTYPE html>
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" href="data:null" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Singpass demo app</title>
	</head>
	<body>
		<div>${message}</div>
		<a href="/">back to start</a>
	</body>
</html>`
