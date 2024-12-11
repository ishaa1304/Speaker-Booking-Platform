import express from 'express';
import Speaker from '../models/speaker.js';
import mongoose from 'mongoose';



const router = express.Router();

// Test route to check if the /api/speakers route is reachable
router.get('/', async (req, res) => {
  console.log('GET /api/speakers route is reached');
  try {
    const speakers = await Speaker.find();
    res.status(200).json(speakers);
  } catch (error) {
    console.error('Error fetching speakers:', error);
    res.status(500).json({ error: 'Failed to fetch speakers' });
  }
});



// Booking a session
router.post("/book-session/:id", async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;
  
    if (!date) {
      return res.status(400).json({ error: "Date and time for the session is required." });
    }
  
    const bookingDate = new Date(date);
    const endDate = new Date(bookingDate.getTime() + 60 * 60 * 1000);
  
    try {
      const speaker = await Speaker.findById(id);
      if (!speaker) {
        return res.status(404).json({ error: "Speaker not found." });
      }
  
      const isBooked = speaker.bookedSlots.some((slot) => {
        const slotStart = new Date(slot);
        const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);
        return (bookingDate < slotEnd && endDate > slotStart);
      });
  
      if (isBooked) {
        return res.status(400).json({ error: "Time slot is already booked." });
      }
  
      speaker.bookedSlots.push(bookingDate);
      await speaker.save(); 
  
      res.status(200).json({ message: `Session booked with speaker ${speaker.firstName} ${speaker.lastName}` });
    } catch (error) {
      console.error("Error booking session:", error);
      res.status(500).json({ error: "Failed to book session" });
    }
  });
  
  

// Route to get booked slots for a speaker
router.get("/booked-slots/:id", async (req, res) => {
  const { id } = req.params;
  console.log('Received id:', id);  

  if (!id) {
    return res.status(400).json({ error: "Speaker ID is required." });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid speaker ID format." });
  }

  try {
    const speaker = await Speaker.findById(id);
    if (!speaker) {
      return res.status(404).json({ error: "Speaker not found." });
    }

    res.status(200).json({ bookedSlots: speaker.bookedSlots });
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    res.status(500).json({ error: "Failed to fetch booked slots" });
  }
});


export default router;


