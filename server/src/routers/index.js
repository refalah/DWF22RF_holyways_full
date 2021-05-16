const express = require('express');
const router = express.Router();

//Middlewares
const { authToken } = require('../middlewares/authMiddleware');
const { uploadFile } = require('../middlewares/uploadFile');
//Auth
const { register, login, checkAuth } = require('../controllers/auth');
router.post('/register', register);
router.post('/login', login);
router.get("/check-auth", authToken, checkAuth);

//User
const { createUser, getUsers, deleteUser, profile } = require('../controllers/user');
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.get("/users", authToken, getUsers);
router.get("/profile/", authToken, profile);

//Donate
const {  createDonate, getDonate, approveDonate, getUserDonate } = require('../controllers/donate');
router.post("/donate/:id2", uploadFile("imageFile"),  authToken, createDonate);
router.get("/donations/:id", getDonate);
router.get("/donate/", authToken, getUserDonate);
router.patch("/approve/:id", approveDonate);

//Fund
const { createFund, getFund, deleteFund, editFund, updateDonate, fundDetails, fundUser } = require('../controllers/fund');
router.post("/fund", uploadFile("imageFile"), authToken, createFund);
router.patch("/fund/:id", uploadFile("imageFile"), editFund);
router.patch("/fund/:id/:id2", updateDonate);
router.get("/funds/", getFund);
router.get("/user-fund/", fundUser);
router.get("/fund/:id", fundDetails);
router.delete("/fund/:id", deleteFund);

// const {test} = require('../controllers/fund')
// router.post("/test", uploadFile('image'), test);

module.exports = router;