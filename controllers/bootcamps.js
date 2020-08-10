const Bootcamp = require('../models/Bootcamp');
//@desc    Get all bootcamps
//@route   Get /api/v1/bootcamps
//@access  Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: "GET" });
}

//@desc    Get single bootcamp
//@route   Get /api/v1/bootcamps/:id
//@access  Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Get single ${req.params.id}` });
}

//@desc    Post bootcamp
//@route   Post /api/v1/bootcamps
//@access  Public
exports.createBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp
    })
}

//@desc    Update bootcamp
//@route   Delete /api/v1/bootcamps/:id
//@access  Public
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update ${req.params.id}` });
}

//@desc    Delete bootcamp
//@route   Delete /api/v1/bootcamps/:id
//@access  Public
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete ${req.params.id}` });
}