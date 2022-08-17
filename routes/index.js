const router = require('express').Router();
const FavouriteController = require('../controllers/FavouriteController');
const TeamController = require('../controllers/TeamController');
const authentication = require('../middleware/authentication');
const userRouter = require('./user');

router.use('/user', userRouter);
router.get('/teams', TeamController.readTeamPL);
router.get('/top-score-PL', TeamController.readTopScorePL);
router.get('/standings-PL', TeamController.readStandingsPL);
router.get('/teams/:id', TeamController.readTeamById);

//authentication
router.use(authentication);
router.post('/teamsFavourite/:id', FavouriteController.postFavourite);
router.get('/teamsFavourite', FavouriteController.readFavourite);

module.exports = router;
