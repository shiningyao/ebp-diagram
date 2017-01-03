/**
 * Created by yaoshining on 2016/12/29.
 */
const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
    res.render('api', {
        title: 'API references'
    });
});

module.exports = router;