import express from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js'
import { HolidayManagmentRepositoryFactory } from './repositories/repositories.js';
import { HolidayManagmentRepositoryInMemoryFactory } from './repositories/repositories-in-memory.js';
import employeeRouter from './routes/employee-router.js';

dayjs.extend(utc);
const repositoryFactory: HolidayManagmentRepositoryFactory = new HolidayManagmentRepositoryInMemoryFactory();
const employeeRepository = repositoryFactory.createEmployeeRepository();
const holidayRequestRepository = repositoryFactory.createHolidayRequestRepository();
const holidayRulesRepository = repositoryFactory.createHolidayRulesRepository();
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index.ejs'))
app.use('/employees', employeeRouter)

app.listen(4000);

export {
    employeeRepository,
    holidayRequestRepository,
    holidayRulesRepository
}
