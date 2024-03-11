import express from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { HolidayManagmentRepositoryInMemoryFactory } from './repositories/repositories-in-memory.js';
import employeeRouter from './routes/employee-router.js';
import holidaysRouter from './routes/holidays-router.js';
import addHolidayRouter from './routes/add-holiday-router.js';

dayjs.extend(utc);
const repositoryFactory = new HolidayManagmentRepositoryInMemoryFactory();
const employeeRepository = repositoryFactory.createEmployeeRepository();
const holidayRequestRepository = repositoryFactory.createHolidayRequestRepository();
const holidayRulesRepository = repositoryFactory.createHolidayRulesRepository();
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index.ejs'))
app.use('/employees', employeeRouter);
app.use('/holidays', holidaysRouter);
app.use('/add-holiday', addHolidayRouter);

app.listen(4000);

export {
    employeeRepository,
    holidayRequestRepository,
    holidayRulesRepository
}
