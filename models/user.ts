import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('User', {

    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN     // sequelize lo convierte a 1 y 0 (por tynint de la bd)
    },

});

export default User;