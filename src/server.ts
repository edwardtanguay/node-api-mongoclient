import * as model from './model.js';
import express from 'express';
import cors from 'cors';
import * as config from './config.js';
import { IEmployee } from './interfaces.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.get('/employees', async (req: express.Request, res: express.Response) => {
	try {
		const employees = await model.getEmployees();
		res.json(employees);
	}
	catch (e) {
		res.status(500).send(e.message);
	}
});

app.post('/employee', (req: express.Request, res: express.Response) => {
	const employee: IEmployee = req.body;
	const result = model.addEmployee(employee);
	res.send(result);
})

app.listen(config.port, () => {
	console.log(`listening on port http://localhost:${config.port}`);
});