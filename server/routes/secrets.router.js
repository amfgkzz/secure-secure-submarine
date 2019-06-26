const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    pool.query(`SELECT "content" FROM "secret"
    FULL OUTER JOIN "user" ON "secrecy_level"<"clearance_level"
    WHERE "user"."id"=$1;`, [req.user.id])
        .then(results => {
            console.log('results.rows:',results.rows);
            res.send(results.rows)})
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;