exports.home_get = (req, res) => 
{
        res.render("home/index",{ layout: 'homeLayout' });
}