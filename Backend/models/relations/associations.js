module.exports = function(models) {
    models.users.hasMany(models.messages, 
        { 
            foreignKey: 'UserId'
        });
    models.messages.belongsTo(models.users,
        {
            foreignKey: 'UserId'
        });
};