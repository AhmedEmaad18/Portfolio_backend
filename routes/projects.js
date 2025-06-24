const express = require('express');
const Project = require('../models/projects');
const cors = require('cors');
const router = express.Router();
const multer = require('multer');
const app = express();
const path = require('path'); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});
app.use(cors());
app.use(express.json());

const upload = multer({ storage });

     app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
     app.use('/projects', router);

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({ isactive: true }).sort({ date: -1 }); 
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

   router.post('/', upload.array('images'), async (req, res, next) => {
     try {
       const { title, description, technologies, link, date,isactive } = req.body;

       let techArray = [];
       if (typeof technologies === 'string') {
         try {
           techArray = JSON.parse(technologies);
         } catch (e) {
           techArray = technologies.split(',').map(t => t.trim());
         }
       } else if (Array.isArray(technologies)) {
         techArray = technologies;
       }

       // Get image paths
       const imageUrls = req.files?.map(file => 
         file.path.replace(/\\/g, '/')
       ) || [];

       const project = new Project({ 
         title, 
         description, 
         technologies: techArray,
         link, 
         imageUrl: imageUrls, // Now an array of image paths
         date ,isactive
       });

       await project.save();
       res.status(201).json(project);
       
     } catch (error) {
       console.error('Error saving project:', error);
       res.status(500).json({ 
         message: 'Error saving project',
         error: error.message 
       });
     }
   });
   

router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.post('/', upload.single('img'), async (req, res, next) => {
  try {
    const { title, description, technologies, link, imageUrl, date } = req.body;
    const project = new Project({ title, description, technologies, link, imageUrl, date });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, technologies, link, imageUrl, date } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, technologies, link, imageUrl, date },
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isactive: false }, // Set isactive to false instead of deleting
      { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project marked as inactive' });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
