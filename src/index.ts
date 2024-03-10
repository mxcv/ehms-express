import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js'
import { HolidayManagmentRepositoryFactory } from './repositories.js';
import { HolidayManagmentRepositoryInMemoryFactory } from './repositories-in-memory.js';

let repositoryFactory: HolidayManagmentRepositoryFactory = new HolidayManagmentRepositoryInMemoryFactory();
let employeeRepository = repositoryFactory.createEmployeeRepository();
let holidayRequestRepository = repositoryFactory.createHolidayRequestRepository();
let holidayRulesRepository = repositoryFactory.createHolidayRulesRepository();

dayjs.extend(utc);
holidayRulesRepository.set({
    maxConsecutiveDays: 20,
    blackoutPeriods: [
        { from: dayjs.utc('2024-03-01'), to: dayjs.utc('2024-03-31') },
        { from: dayjs.utc('2024-09-01'), to: dayjs.utc('2024-09-01') }
    ]
})
