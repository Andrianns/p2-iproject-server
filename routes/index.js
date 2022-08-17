const router = require('express').Router();
const TeamController = require('../controllers/TeamController');
const authentication = require('../middleware/authentication');
const userRouter = require('./user');

router.use('/user', userRouter);
router.get('/standings');
router.get('/ucl');
router.get('/teams', TeamController.readTeamPL);
router.get('/top-score-PL', TeamController.readTopScorePL);
router.get('/standings-PL', TeamController.readStandingsPL);
//authentication
router.use(authentication);
router.post('/teamsFavourite/:id');
router.get('/teamsFavourite');

module.exports = router;
