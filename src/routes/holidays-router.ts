import express from 'express';
import { holidayRequestRepository } from '../app.js';

const router = express.Router();

router.get('/', (req, res) => {
    const holidayRequests = holidayRequestRepository.getPending();

    res.render('holidays.ejs', { holidayRequests });
});

router.post('/:id/approve', (req, res) => {
    const requestId = Number(req.params.id);
    try {
        holidayRequestRepository.setStatus(requestId, 'approved');
        res.redirect('/holidays');
    } catch (error) {
        console.error('Error approving holiday request:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/:id/reject', (req, res) => {
    const requestId = Number(req.params.id);
    try {
        holidayRequestRepository.setStatus(requestId, 'rejected');
        res.redirect('/holidays');
    } catch (error) {
        console.error('Error rejecting holiday request:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
