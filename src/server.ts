import * as model from './model.js';
import express from 'express';
import cors from 'cors';
import * as config from './config.js';

const app = express();
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.get('/employees', (req: express.Request, res: express.Response) => {
	res.json(model.getEmployees());
});

app.listen(config.port, () => {
	console.log(`listening on port http://localhost:${config.port}`);
});