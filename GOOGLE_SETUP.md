# Google Sheets Setup Guide

## Обзор

Этот проект использует только **Google Sheets** для логирования отправок форм. Функциональность загрузки файлов на Google Drive была удалена.

## Пошаговая настройка

### 1. Создание Google Cloud Project

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com)
2. Создайте новый проект или выберите существующий
3. Запомните ID проекта

### 2. Включение Google Sheets API

1. В вашем проекте перейдите в "APIs & Services" → "Library"
2. Найдите "Google Sheets API"
3. Нажмите "Enable"

### 3. Создание Service Account

1. Перейдите в "APIs & Services" → "Credentials"
2. Нажмите "Create Credentials" → "Service Account"
3. Заполните форму:
   - **Service account name**: `samsung-form-service`
   - **Description**: `Service account for Samsung Form app`
4. Нажмите "Create and Continue"
5. Пропустите назначение ролей (нажмите "Continue")
6. Нажмите "Done"

### 4. Генерация ключа Service Account

1. В списке учетных записей найдите ваш Service Account
2. Нажмите на email Service Account
3. Перейдите на вкладку "Keys"
4. Нажмите "Add Key" → "Create new key"
5. Выберите формат "JSON"
6. Нажмите "Create"
7. **Важно**: JSON файл скачается автоматически. Храните его в безопасности!

### 5. Размещение ключевого файла

1. Переименуйте скачанный файл в `service-account-key.json`
2. Поместите его в папку `backend/` вашего проекта
3. **Никогда не коммитьте этот файл в систему контроля версий!**

### 6. Настройка Google Sheets

1. Перейдите в [Google Sheets](https://sheets.google.com/)
2. Создайте новую таблицу
3. Назовите её (например, "Samsung Form Submissions")
4. Нажмите кнопку "Share"
5. Добавьте email вашего Service Account (из JSON файла)
6. Дайте ему права "Editor"
7. Скопируйте ID таблицы из URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

## 🔐 Конфигурация окружения

Обновите ваш `.env` файл полученными значениями:

```env
# Google API Configuration
GOOGLE_APPLICATION_CREDENTIALS=./backend/service-account-key.json

# Google Sheets Configuration
GOOGLE_SHEETS_ID=your-sheet-id-here
```

## 🧪 Тестирование интеграции

Запустите инициализацию базы данных:

```bash
cd backend
npm run setup
```

## 📊 Структура данных в Google Sheets

Каждая отправка формы будет добавлена как новая строка. Данные записываются без заголовков:

**Порядок данных в строке:**
1. Время отправки (timestamp)
2. Тип формы ("Form")
3. Имя (name)
4. Email (email)
5. Телефон (phone)
6. Значение поля 1 (field_1755855549347)
7. Значение поля 2 (field_1755855577188)
8. Значение поля 3 (field_1755855635707)
9. Значение поля 4 (field_1755855695107)
10. Значение поля 5 (field_1755855714011)
11. Значение поля 6 (field_1755855729485)
12. Статус файла ("Немає файлу")

**Пример строки в таблице:**
```
22.08.2025  Form  test@test.com  22222  2222222222  RTV Euro AGD  Очисник повітря AX60R5080WD/EU    true  true  Немає файлу
```

**Важно**: 
- Заголовки не создаются автоматически
- Данные записываются напрямую в таблицу
- Количество столбцов адаптируется к данным формы

## ⚠️ Важные замечания

- **Файлы больше не загружаются** на Google Drive
- **Только данные форм** сохраняются в Google Sheets
- **Service Account** должен иметь доступ только к Google Sheets
- **Не требуется** настройка Google Drive API

## 🆘 Устранение проблем

### "Permission denied" ошибки
- Проверьте, что Service Account имеет доступ к таблице
- Убедитесь, что Google Sheets API включен
- Проверьте правильность ID таблицы

### "File not found" ошибки
- Эти ошибки больше не должны возникать
- Проверьте, что используете правильный ID таблицы

### "API quota exceeded"
- Проверьте биллинг в Google Cloud Console
- Мониторьте использование API в Cloud Console

## 📚 Дополнительные ресурсы

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Service Account Best Practices](https://cloud.google.com/iam/docs/service-accounts)

---

**Нужна помощь?** Проверьте раздел устранения проблем или изучите документацию API.
