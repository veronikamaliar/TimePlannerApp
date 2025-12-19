// routes/dashboardRoutes.js
const express = require('express')
const { authorize } = require('../middleware/authorize')
const router = express.Router()

router.get(
  '/stats',
  authorize(['ADMIN']),
  async (req, res) => {
    const usersCount = await User.count()
    const tasksCount = await Task.count()
    const categoriesCount = await Category.count()

    res.json({
      users: usersCount,
      tasks: tasksCount,
      categories: categoriesCount,
    })
  }
)

module.exports = router
