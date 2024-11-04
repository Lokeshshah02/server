import prisma from "../config/db.config.js";
import jwt from 'jsonwebtoken';
class AuthController {
    static async login(request, response) {
        try {
            const body = request.body;
            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email
                }
            });
            if (!findUser) {
                findUser = await prisma.user.create({
                    data: body
                });
            }
            let JWTPayload = {
                name: body.name,
                email: body.email,
                id: findUser.id
            };
            const token = jwt.sign(JWTPayload, process.env.JWT_SECRETKEY, {
                expiresIn: "365d"
            });
            return response.json({
                message: "Logged in successfully!",
                user: {
                    ...findUser,
                    token: `Bearer ${token}`
                }
            });
        }
        catch (error) {
            return response.status(500).json({ message: 'something went wrong!!' });
        }
    }
}
export default AuthController;
