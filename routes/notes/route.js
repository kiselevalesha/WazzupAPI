
const { Router } = require('express');
const { StrErrorServer } = require('../../languages/russian');
const { Save } = require('./save');
const { SelectAll, SelectOne } = require('./select');
const { Delete } = require('./delete');

const router = Router();


router.use('*', require('../../middleware/token'))

// /api/notes/
router.post('/', Save);


// /api/notes
router.get('/', SelectAll);


// /api/notes/id
router.get('/:id', SelectOne);


// /api/notes/id
router.delete('/:id', Delete);


router.all('*', async (req, res, next) => {
    res.status(404).json({ message: StrErrorServer });
});


module.exports = router;