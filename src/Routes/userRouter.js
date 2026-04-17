import express from 'express'
import { deleteUser, getAllUsers, getUserById, Register, updateUser, Login } from '../controller/userConytroller.js'
const userRouter = express.Router()

// userRouter.get('/', (req, res) => {
//   res.send('Hello World! Router')
// })
// userRouter.get('/profile', (req, res) => {
//   res.send('Hello World Profile Router')
// })

import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'

userRouter.post("/reg",Register)
userRouter.post("/login",Login)
userRouter.get("/one/:id", authMiddleware, getUserById)
userRouter.put("/update/:id", authMiddleware, adminMiddleware, updateUser)
userRouter.get("/all", authMiddleware, adminMiddleware, getAllUsers)
userRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteUser)

export default userRouter