import Course from "../Models/courseModel.js";

// ============== COURSE CONTROLLER ==============

// Create Course
export async function createCourse(req, res) {
  const { name, duration, eligibility, fee, description, level } = req.body;
  try {
    const check = await Course.findOne({ name });
    if (check) {
      return res.status(400).send("Course already exists");
    }

    // Photo path from multer
    const photoPath = req.file ? `${req.protocol}://${req.get('host')}/uploads/courses/${req.file.filename}` : null;

    const course = new Course({
      name,
      duration,
      eligibility,
      fee: fee ? Number(fee) : undefined,
      description,
      level,
      photo: photoPath
    });

    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating course: " + error.message);
  }
}

// Get All Courses
export async function getAllCourses(req, res) {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching courses");
  }
}

// Get Course by ID
export async function getCourseById(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ _id: id });
    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching course");
  }
}

// update Course
export async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If a new file is uploaded, update the photo path
    if (req.file) {
      updateData.photo = `${req.protocol}://${req.get('host')}/uploads/courses/${req.file.filename}`;
    }

    if (updateData.fee) {
      updateData.fee = Number(updateData.fee);
    }

    const course = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating Course");
  }
}

// Delete Course
export async function deleteCourse(req, res) {
    const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    if(!course){
        return res.status(404).send("course not found");
    }
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in delete course");
  }
}
