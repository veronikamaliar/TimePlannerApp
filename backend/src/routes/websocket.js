/**
 * @swagger
 * tags:
 *   - name: WebSocket
 *     description: Події реального часу через Socket.IO
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WSBaseEvent:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *         timestamp:
 *           type: number
 *         payload:
 *           type: object
 *     User:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         name: { type: string }
 *         email: { type: string }
 *     Task:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         title: { type: string }
 *         description: { type: string }
 *         status: { type: string }
 *         userId: { type: integer }
 *     File:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         filename: { type: string }
 *         originalName: { type: string }
 *         size: { type: number }
 *         mimetype: { type: string }
 *         uploadedBy: { type: integer }
 *         taskId: { type: integer }
 *     Timelog:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         taskId: { type: integer }
 *         userId: { type: integer }
 *         startTime: { type: string, format: date-time }
 *         endTime: { type: string, format: date-time }
 *         duration: { type: number }
 *     Notification:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         userId: { type: integer }
 *         type: { type: string }
 *         message: { type: string }
 *         read: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 */

/**
 * @swagger
 * x-websocket-events:
 *   connection:
 *     - event: "connect"
 *       description: Клієнт підключився
 *     - event: "disconnect"
 *       description: Клієнт відключився
 *   user:
 *     - event: "user:created"
 *       description: Створено нового користувача
 *       payload:
 *         $ref: "#/components/schemas/User"
 *     - event: "user:updated"
 *       description: Користувача оновлено
 *       payload:
 *         $ref: "#/components/schemas/User"
 *     - event: "user:deleted"
 *       description: Користувача видалено
 *       payload:
 *         type: integer
 *     - event: "user:statusChanged"
 *       description: Зміна онлайн-статусу
 *       payload:
 *         properties:
 *           userId: { type: integer }
 *           online: { type: boolean }
 *   task:
 *     - event: "task:created"
 *       description: Створено нову задачу
 *       payload:
 *         $ref: "#/components/schemas/Task"
 *     - event: "task:updated"
 *       description: Задачу оновлено
 *       payload:
 *         $ref: "#/components/schemas/Task"
 *     - event: "task:deleted"
 *       description: Задачу видалено
 *       payload:
 *         type: integer
 *   timelog:
 *     - event: "timelog:started"
 *       description: Таймлог стартував
 *       payload:
 *         $ref: "#/components/schemas/Timelog"
 *     - event: "timelog:stopped"
 *       description: Таймлог зупинено
 *       payload:
 *         $ref: "#/components/schemas/Timelog"
 *   file:
 *     - event: "file:uploaded"
 *       description: Файл завантажено
 *       payload:
 *         $ref: "#/components/schemas/File"
 *     - event: "file:deleted"
 *       description: Файл видалено
 *       payload:
 *         type: integer
 *   notification:
 *     - event: "notification:new"
 *       description: Нове сповіщення
 *       payload:
 *         $ref: "#/components/schemas/Notification"
 *     - event: "notification:updated"
 *       description: Сповіщення оновлено
 *       payload:
 *         $ref: "#/components/schemas/Notification"
 *   sync:
 *     - event: "sync:events"
 *       description: Відправка історії після reconnect
 *       payload:
 *         type: array
 *         items:
 *           $ref: "#/components/schemas/WSBaseEvent"
 */

/**
 * @swagger
 * /ws:
 *   get:
 *     tags:
 *       - WebSocket
 *     summary: WebSocket події
 *     description: |
 *       ## Події WebSocket, які надсилає сервер
 *       
 *       ###  Події підключення
 *       - **connect** — клієнт підключився  
 *       - **disconnect** — клієнт відключився  
 *       
 *       ###  Події користувачів
 *       - **user:created** — створено нового користувача  
 *       - **user:updated** — користувача оновлено  
 *       - **user:deleted** — користувача видалено  
 *       - **user:statusChanged** — змінено онлайн-статус  
 *       
 *       ###  Події задач
 *       - **task:created** — створено задачу  
 *       - **task:updated** — задачу оновлено  
 *       - **task:deleted** — задачу видалено  
 *       
 *       ###  Події таймлогів
 *       - **timelog:started** — таймлог стартував  
 *       - **timelog:stopped** — таймлог зупинено  
 *       
 *       ###  Події файлів
 *       - **file:uploaded** — файл завантажено  
 *       - **file:deleted** — файл видалено  
 *       
 *       ###  Сповіщення
 *       - **notification:new** — нове сповіщення  
 *       - **notification:updated** — сповіщення оновлено  
 *       
 *       ###  Синхронізація після reconnect
 *       - **sync:events** — надсилається історія подій
 *
 *     responses:
 *       200:
 *         description: Документація WebSocket подій
 */
