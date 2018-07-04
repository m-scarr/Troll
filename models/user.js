module.exports = function (sequelize, Sequelize) {

    var User = sequelize.define('user', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        email: { type: Sequelize.STRING, validate: { isEmail: true } },
        password: { type: Sequelize.STRING, allowNull: false },
        chapter: { type: Sequelize.INTEGER },
        last_login: { type: Sequelize.DATE },
        status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' }

    });

    return User;

}