# Настройка для продакшена

## Переменные окружения для продакшена

### Обязательные переменные

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Base URL Configuration - ВАЖНО для продакшена!
BASE_URL=https://yourdomain.com

# JWT Configuration - Обязательно измените в продакшені!
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database Configuration
DATABASE_PATH=/path/to/your/database.sqlite

# Admin User
ADMIN_EMAIL=your-admin-email@yourdomain.com
ADMIN_PASSWORD=your-very-secure-password

# Google API Configuration
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
GOOGLE_SHEETS_ID=your-google-sheets-id
```

## Ключевые моменты для продакшена

### 1. BASE_URL
**ВАЖНО**: Установите правильный домен для вашего сайта:
```env
# Для продакшена
BASE_URL=https://yourdomain.com

# НЕ используйте localhost в продакшені!
# BASE_URL=http://localhost:3000  # ❌ НЕПРАВИЛЬНО
```

### 2. Безопасность
- Измените `JWT_SECRET` на уникальный, сложный ключ
- Используйте HTTPS в продакшені
- Настройте правильные CORS налаштування
- Ограничьте доступ к папці `uploads/` только через API

### 3. Файлы
- Папка `uploads/` должна быть доступна для записи веб-сервером
- Настройте правильные права доступа
- Рассмотрите использование CDN для статических файлов

### 4. База данных
- Используйте абсолютный путь к базе данных
- Убедитесь, что веб-сервер имеет права на запись
- Регулярно делайте резервные копии

## Примеры настройки для разных хостингов

### Heroku
```env
BASE_URL=https://your-app-name.herokuapp.com
PORT=$PORT
```

### Vercel
```env
BASE_URL=https://your-app-name.vercel.app
```

### DigitalOcean App Platform
```env
BASE_URL=https://your-app-name.ondigitalocean.app
```

### AWS EC2
```env
BASE_URL=https://yourdomain.com
# или
BASE_URL=http://your-ip-address
```

## Проверка настройки

После настройки проверьте:

1. **Файлы загружаются**: Отправьте форму с файлом
2. **URL в базе данных**: Проверьте, что `file_link` содержит полный домен
3. **Google таблица**: Убедитесь, что ссылки кликабельны
4. **Доступ к файлам**: Откройте ссылку на файл в новой вкладке

## Логи для отладки

Сервер логирует создание URL файлов:
```
📁 File uploaded successfully: document-1234567890-123456789.pdf
🔗 File link created: https://yourdomain.com/uploads/document-1234567890-123456789.pdf
```

## Устранение проблем

### Файлы не открываются
1. Проверьте `BASE_URL` в `.env`
2. Убедитесь, что папка `uploads/` доступна
3. Проверьте права доступа веб-сервера

### Неправильные URL в Google таблице
1. Перезапустите сервер после изменения `BASE_URL`
2. Проверьте логи сервера
3. Убедитесь, что переменная окружения загружается правильно

### Ошибки CORS
1. Настройте правильные CORS налаштування для вашего домена
2. Убедитесь, что frontend и backend используют одинаковый домен
