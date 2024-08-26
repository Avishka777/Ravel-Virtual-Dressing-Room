const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers/index');

const verifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    // First, verify the access token
    if (!accessToken) {
        return next(HttpError(401, "Access token is missing"));
    }

    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            // If the access token has expired or is invalid
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return next(HttpError(401, "Refresh token is also required for continued access"));
            }

            // Verify the refresh token
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decodedRefresh) => {
                if (err) {
                    return next(HttpError(401, "Invalid refresh token"));
                }

                // Generate a new access token from the refresh token
                const newAccessToken = jwt.sign(
                    { id: decodedRefresh.id, isAdmin: decodedRefresh.isAdmin },
                    process.env.JWT_ACCESS_SECRET,
                    { expiresIn: process.env.JWT_ACCESS_EXPIRE }
                );

                // Optionally send the new access token back to the client
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: true, // should be set to true if using HTTPS
                    sameSite: 'Strict'
                });

                req.user = decodedRefresh; // Set the user info for downstream middleware
                next();
            });
        } else {
            req.user = decoded; // Set the user info for downstream middleware
            next();
        }
    });
};

module.exports = verifyUser;
