router.get('/chatroom/private', function(req, res, next){
    let token = req.cookies.jwt;
    console.log(req.body)
    authService.verifyUser(token).then(user => {
        if(user){
            
        }
    });
});
