const express = require('express');
const router = express.Router();

//Middlewares
const { authToken } = require('../middlewares/authMiddleware');
const { uploadFile } = require('../middlewares/uploadFile');
//Auth
const { register, login } = require('../controllers/auth');
router.post('/register', register);
router.post('/login', login);

//User
const { createUser, getUsers, deleteUser } = require('../controllers/user');
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.get("/users", authToken, getUsers);

//Donate
const {  createDonate, getDonate } = require('../controllers/donate');
router.post("/donate", uploadFile("imageFile"), createDonate);
router.get("/donations", getDonate);

//Fund
const { createFund, getFund, deleteFund, editFund, updateDonate } = require('../controllers/fund');
router.post("/fund", uploadFile("imageFile"), createFund);
router.patch("/fund/:id", editFund);
router.patch("/fund/:id/:id2", updateDonate);
router.get("/funds", getFund);
router.delete("/fund/:id", deleteFund);

// const {test} = require('../controllers/fund')
// router.post("/test", uploadFile('image'), test);

module.exports = router;