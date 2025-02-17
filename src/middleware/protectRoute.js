import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (accessToken) {
      return jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_KEY,
        (err, decoded) => {
          if (!err) {
            req.user = decoded;
            console.log("Access token verified, proceeding...");
            return next();
          }
          console.log("Access token expired or invalid");
        }
      );
    }

    if (refreshToken) {
      return jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        (err, decodedRefresh) => {
          if(err){               
            console.log("Invalid refresh token");
            return res
              .status(401)
              .json({ success: false, message: "Invalid refresh token" });
          }

          const newAccessToken = jwt.sign(
            { id: decodedRefresh.id },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: "15m" }
          );

          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000,
          });

          req.user = decodedRefresh;
          console.log("New access token issued, proceeding...");
          return next();
        }
      );
    }

    return res
      .status(401)
      .json({ success: false, message: "Unauthorized, please log in" });
  } catch (error) {
    console.log("Error in Auth Middleware:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
