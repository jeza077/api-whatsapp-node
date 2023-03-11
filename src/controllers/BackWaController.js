
const backWa = (req, res) => {
    res.render('wa/backWa');
}

const redirectWa = (req, res) => {
    console.log(req.body)
}

module.exports = {
    backWa,
    redirectWa,
}