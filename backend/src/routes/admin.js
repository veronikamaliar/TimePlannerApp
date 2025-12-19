const express = require('express')
const { authenticate, adminMiddleware } = require('../middleware/auth')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

router.get('/dashboard', authenticate, adminMiddleware, async (req, res) => {
  try {
    const usersCount = await prisma.user.count()

    const tasksCount = await prisma.task.count()

    const categoriesCount = await prisma.category.count()

    const completedTasks = await prisma.task.count({
      where: { completed: true }
    })

    const pendingTasks = await prisma.task.count({
      where: { completed: false }
    })

    const overdueTasks = await prisma.task.count({
      where: {
        completed: false,
        dueDate: { lt: new Date() }
      }
    })

    const today = new Date()
    today.setHours(0,0,0,0)
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const todayTasks = await prisma.task.count({
      where: {
        dueDate: {
          gte: today,
          lt: tomorrow
        }
      }
    })

    res.json({
      users: usersCount,
      tasks: tasksCount,
      categories: categoriesCount,
      completedTasks,
      pendingTasks,
      overdueTasks,
      todayTasks
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Помилка при отриманні статистики' })
  }
})

module.exports = router
