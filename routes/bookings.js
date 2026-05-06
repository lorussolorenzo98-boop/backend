import express from 'express'
import Booking from '../models/Booking.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router()

// POST /api/bookings - crea prenotazione (protetta)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { professionalId, date, timeSlot, description, address, amount } = req.body

        const booking = new Booking({
            clientId: req.user.id,
            professionalId,
            date,
            timeSlot,
            description,
            address,
            amount
        })

        await booking.save()
        res.status(201).json({ message: 'Prenotazione creata con successo', booking })

    } catch (error) {
        res.status(500).json({ message: 'Errore del server', error: error.message })
    }
})

// GET /api/bookings/me - prenotazioni dell'utente loggato (protetta)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ clientId: req.user.id })
            .populate('professionalId')
            .sort({ createdAt: -1 })

        res.json(bookings)

    } catch (error) {
        res.status(500).json({ message: 'Errore del server', error: error.message })
    }
})

export default router