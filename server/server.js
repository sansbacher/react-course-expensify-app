// Back-end NodeJS Express-based web server - just a static web server

const path = require('path')
const express = require('express')
const app = express()

const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000

// Serve all static assets from the /public folder
app.use(express.static(publicPath))

// Handle 404 and direct all page requests to /index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}, if local then: http://localhost:${port}/`);
})
