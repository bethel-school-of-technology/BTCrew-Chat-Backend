router.get('/chatroom/private', function(req, res, next){
    let token = getToken(req);
    if (token) {
        console.log(req.body)
        authService.verifyUser(token).then(user => {
            if(user){
                
            }
        });
    } else {
        res.json({
            message: "token not found",
            status: 400
        })
    }
   
});
