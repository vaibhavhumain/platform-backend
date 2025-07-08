const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ msg: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword })
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// Protected route example
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select('-password')
  res.json(user)
})

module.exports = router
