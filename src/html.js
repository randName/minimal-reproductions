export const createHtml = (body) => /*html*/ `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" href="data:null" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Singpass demo app</title>
	</head>
	<body>${body}</body>
</html>`

export const indexBody = /*html*/ `<a href="/url">login</a>`

export const callbackBody = (message) => /*html*/ `
<div>${message}</div>
<a href="/">back to start</a>
`
