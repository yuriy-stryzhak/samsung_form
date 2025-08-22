# Quick Start Guide

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка окружения

Скопируйте `.env.example` в `.env` и заполните необходимые поля:

```bash
cp env.example .env
```

### 3. Настройка Google Sheets

**Примечание**: Функциональность загрузки файлов на Google Drive была удалена.

#### Настройка Google Sheets:

1. **Создайте Google Sheet** в Google Sheets
2. **Добавьте Service Account** с правами "Editor"
3. **Скопируйте ID таблицы** из URL

#### Проверка настройки:

```bash
cd backend
npm run setup
```

**Примечание**: Данные записываются в Google Sheets напрямую без заголовков, в том же порядке, что и в админке.

### 4. Запуск приложения

```bash
# Backend
cd backend
npm run backend

# Frontend (в новом терминале)
npm run frontend
```

### 5. Тестирование

Откройте http://localhost:3000 и протестируйте форму.

## 🔧 Устранение проблем

### Проверка настройки

```bash
# Инициализация базы данных
npm run setup

# Настройка Google Sheets
npm run setup:sheets
```

## 📚 Дополнительная информация

- [README.md](./README.md) - Полное описание проекта