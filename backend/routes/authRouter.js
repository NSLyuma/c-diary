const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

authRouter.post('/login', async (req, res) => {
  // достаём почту и пароль пользователя
  const isEmail = Boolean(req.body.email.trim());
  const isPassword = Boolean(req.body.password.trim());

  // проверка, что пользователь ввёл и почту, и пароль
  if (!isEmail || !isPassword) {
    res.status(403).json({ error: 'Необходимо ввести email и пароль!' });
    return;
  }

  // создаём пользователя
  let user;

  // достаём его из БД по email
  try {
    user = await User.findOne({
      where: { email: req.body.email },
    });
  } catch (error) {
    console.log(`Ошибка при авторизации: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
    return;
  }

  // если такого пользователя нет в БД, отправляем ошибку
  if (!user) {
    res.status(403).json({ error: 'Неверный email или пароль!' });
    return;
  }

  // достаём сырой и хэшированный пароли
  const rawPassword = req.body.password;
  const hashedPassword = user.password;
  let isSame;

  // сравниваем пароли
  try {
    isSame = await bcrypt.compare(rawPassword, hashedPassword);
  } catch (error) {
    console.log(`Ошибка при сравнении паролей: ${error.message}`);
    res.status(500).json({ error: 'Ошибка сервера' });
  }

  // если пароли не совпадают, отправляем ошибку
  if (!isSame) {
    res.status(403).json({ error: 'Неверный email или пароль!' });
    return;
  }

  // если всё хорошо, создаём сессию
  req.session.userId = user.id;

  res.json({
    userName: user.name,
    role: user.role,
  });
});

authRouter.post('/register', async (req, res) => {
  // проверка на длину имени
  if (req.body.userName.trim().length < 2) {
    res.status(403).json({ error: 'Имя должно содержать минимум 2 символа!' });
    return;
  }

  // проверка на формат ввода почты
  if (!req.body.email.includes('@')) {
    res
      .status(403)
      .json({ error: 'Неверный формат: email должен содержать символ @!' });
    return;
  }

  const rawPassword = req.body.password.trim();

  // проверка на длину пароля
  if (rawPassword.length < 5) {
    res.status(403).json({
      error: 'Пароль должен содержать минимум 5 символов без пробелов!',
    });
    return;
  }

  let isEmailRepeat;

  try {
    isEmailRepeat = await User.findOne({ where: { email: req.body.email } });
  } catch (error) {
    console.log(`Ошибка при регистрации: ${error.message}`);
    res.status(500).json({ error: 'Ошибка при обращении к БД' });
    return;
  }

  if (isEmailRepeat) {
    res.status(403).json({
      error: 'Пользователь с такой почтой уже существует!',
    });
    return;
  }

  let hashedPassword;

  // хэширование пароля
  try {
    hashedPassword = await bcrypt.hash(
      rawPassword,
      Number(process.env.SALT_ROUNDS) || 11,
    );
  } catch (error) {
    console.log(`Ошибка при создании пароля: ${error.message}`);
    res.status(500).json({ error: 'Ошибка при создании пароля' });
    return;
  }

  // наконец-то создаём нового пользователя
  try {
    const user = await User.create({
      role: 'user',
      name: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // создаём сессию
    req.session.userId = user.id;

    res.json({ userName: user.userName });
  } catch (error) {
    console.log(`Ошибка при создании пользователя: ${error.message}`);
    res.status(500).json({ error: 'Не удалось зарегистрироваться' });
  }
});

module.exports = authRouter;
