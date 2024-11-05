// backend/controllers/serviceController.js
const Service = require('../models/Service');

// Function to get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
};

// Function to create a new service
// exports.addService = async (req, res) => {
//   const { name, description, price } = req.body;
//   try {
//     const newService = new Service({ name, description, price });
//     await newService.save();
//     res.status(201).json(newService);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding service' });
//   }
// };

// Function to delete a service
exports.deleteService = async (req, res) => {
  const { id } = req.params; // Get the service ID from the request parameters

  try {
    const deletedService = await Service.findByIdAndDelete(id);
    
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(204).send(); // No content to send back after successful deletion
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service' });
  }
};

//Function to update service
// exports.updateService = async (req, res) => {
//   const { id } = req.params; // Get the service ID from the request parameters
//   const { name, description, price } = req.body; // Extract updated data from the request body

//   try {
//     const updatedService = await Service.findByIdAndUpdate(
//       id,
//       { name, description, price },
//       { new: true } // This option returns the updated document
//     );

//     if (!updatedService) {
//       return res.status(404).json({ message: 'Service not found' });
//     }

//     res.status(200).json(updatedService);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating service' });
//   }
// };

exports.addService = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.path : null; // Get the image path
  
  try {
    const newService = new Service({ name, description, price, image });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error adding service' });
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description, price, image }, // Include image
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service' });
  }
};
