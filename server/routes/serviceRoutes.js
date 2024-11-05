// backend/routes/serviceRoutes.js
const express = require('express');
const { getAllServices, addService ,deleteService,updateService} = require('../controllers/serviceController');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the directory to store images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append current timestamp to the filename
    },
  });
  
  const upload = multer({ storage });
  
  router.post('/', upload.single('image'), addService); // Modify to use multer
  router.put('/:id', upload.single('image'), updateService);

router.get('/', getAllServices);
router.post('/', addService);
router.delete('/:id', deleteService);
router.put('/:id', updateService);
// Add other routes for update and delete as necessary

module.exports = router;
