module.exports = (req, res, next)=>
{
    if(req.user)
    {
        res.redirect('/main');
        console.log(req.user);
    }
    else
    {
        next();
    }
}