import Event from "../Models/eventModel.js";

// ============== EVENTS CONTROLLER ==============

// Create Event
export async function createEvent(req, res) {
  try {
    const { title, description, date, location, timmings } = req.body;
    const check = await Event.findOne({ title });
    if (check) {
      return res.status(400).send("Event already exists");
    }

    // Handle multiple uploaded files
    const imagePaths = req.files 
      ? req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/events/${file.filename}`)
      : [];

    const event = new Event({
      title,
      description,
      date: date || null,
      location,
      images: imagePaths,
      timmings,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating event: " + error.message);
  }
}

// Get All Events
export async function getAllEvent(req, res) {
  try {
    const event = await Event.find().sort({ date: -1 });
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching events");
  }
}

// Get Event By ID
export async function getEventById(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching Event");
  }  
}

// Update Event
export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle empty date string
    if (updateData.date === '') {
      updateData.date = null;
    }

    // Handle new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/events/${file.filename}`);
      updateData.images = newImages;
    }

    const event = await Event.findByIdAndUpdate(id, updateData, { new: true });
    if (!event) {
      return res.status(404).send("Event not found");
    }
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating event");
  }
}

// Delete Event
export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).send("Event not found");
    }
    res.status(200).send("Event deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting event");
  }
}
