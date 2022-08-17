const router = require('express').Router();
const authentication = require('../middleware/authentication');
const userRouter = require('./user');

router.use('/user', userRouter);
router.get('/standings');
router.get('/ucl');
router.get('/teams');
//authentication
router.use(authentication);
router.post('/teamsFavourite/:id');
router.get('/teamsFavourite');

module.exports = router;
