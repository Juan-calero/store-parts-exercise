const app = require("./src/server/app");

const server = app.listen(8081, () => {
	console.log(`Store API running on ${server.address().port}`);
});
