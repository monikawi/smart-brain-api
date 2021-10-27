const register = require('./register');
const login = require('./login');
const profile = require('./profile');
const clarifai = require('./clarifai');

module.exports = {
    registerController: register,
    loginController: login,
    profileController: profile,
    clarifaiController: clarifai
};