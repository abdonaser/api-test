const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const appError = require("../utils/appError");
const { SUCCESS, FAIL } = require("../utils/json_status_text");
const errorMessage = require("../helpers/formatError");
const { accessTokenGenerated, refreshTokenGenerated } = require("../helpers/generateToken");
const asyncWrapper = require('../midelWares/asyncWrapper');
const usersModel = require('../models/users.model');

const register = asyncWrapper(
    async (req, res, next) => {
        const { firstName, lastName, email, password, role } = req.body;

        // Make Valdation
        const result = validationResult(req)
        if (!result.isEmpty()) {
            const error = appError.create(errorMessage(result.errors), 404, FAIL)
            return next(error)
        }

        // check if User ALready Exist
        const userIsExist = await usersModel.findOne({ email: email })
        if (userIsExist) {
            const error = appError.create("This email already exists", 409, FAIL)
            next(error)
        }


        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);

        const userData = {
            firstName, lastName, email, role: role || "user", password: passwordHashed
        }

        const newUser = await usersModel.create(userData)

        const accessToken = accessTokenGenerated(newUser)
        const refreshToken = refreshTokenGenerated(newUser)

        //   ' create cookies
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res
            .status(201)
            .json({
                status: SUCCESS,
                message: 'Successful Registration',
                data: { user: { email: newUser.email, id: newUser._id, token: accessToken } },
            })
    }
)

const login = asyncWrapper(
    async (req, res, next) => {
        const { email, password } = req.body;        // Make Valdation

        const result = validationResult(req)
        if (!result.isEmpty()) {
            const error = appError.create("Email | Password Must be Valied ", 409, FAIL)
            next(error)
        }

        const userIsExist = await usersModel.findOne({ email: email })

        if (!userIsExist) {
            const error = appError.create("This email Not exists Please Create new Email ", 409, FAIL)
            next(error)
        }

        const passwordMatch = await bcrypt.compare(password, userIsExist.password)
        if (!passwordMatch) {
            const error = appError.create("invalid Email | Password", 409, FAIL)
            next(error)
        }


        const accessToken = accessTokenGenerated(userIsExist)
        const refreshToken = refreshTokenGenerated(userIsExist)

        //   ' create cookies
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res
            .status(200)
            .json({
                status: SUCCESS,
                message: 'Successful Registration',
                data: { user: { email: userIsExist.email, id: userIsExist._id, token: accessToken } },
            })

    }
)

const logout = asyncWrapper(
    async (req, res) => {
        const cookies = req.cookies;
        console.log(req.cookies)
        // Check if the JWT cookie exists
        if (!cookies?.jwt) {
            console.log("test -- ", req.cookies)

            return res.sendStatus(204); // No JWT cookie found; send a 204 No Content response
        }

        // Clear the JWT cookie with the specified options:
        res.clearCookie('jwt', {
            httpOnly: true, // - `httpOnly: true`: Prevents client-side scripts from accessing the cookie
            sameSite: 'None', // - `sameSite: 'None'`: Allows the cookie to be sent with cross-origin requests
            secure: true, // - `secure: true`: Ensures the cookie is only transmitted over HTTPS
        });

        // Send a 200 OK response with a success message
        res.status(200).json({
            status: 'success',
            message: 'User successfully logged out and cookies cleared.',
        });
    }
)

const refresh = asyncWrapper(
    async (req, res, next) => {

    }
)


module.exports = {
    register,
    login,
    logout,
    refresh
}