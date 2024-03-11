import express from 'express';
import { holidayRequestRepository } from '../app.js';

const router = express.Router();

function changeStatus(req, res, newStatus) {
    const requestId = Number(req.params.id);
    try {
        holidayRequestRepository.setStatus(requestId, newStatus);
        res.redirect('/holidays');
    } catch (error) {
        console.error(`Error changing holiday request status to ${newStatus}:`, error);
        res.status(500).send('Internal Server Error');
    }
}

router.get('/', (req, res) => {
    const holidayRequests = holidayRequestRepository.getPending();
    res.render('holidays.ejs', { holidayRequests });
});

router.post('/:id/approve', (req, res) => {
    changeStatus(req, res, 'approved');
});

router.post('/:id/reject', (req, res) => {
    changeStatus(req, res, 'rejected');
});

export default router;
