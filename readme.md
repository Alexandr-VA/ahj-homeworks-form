# Popovers Widget

[![Build and Deploy to GitHub Pages](https://github.com/Alexandr-VA/ahj-homeworks-form/actions/workflows/deploy.yml/badge.svg)](https://github.com/Alexandr-VA/ahj-homeworks-form/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://Alexandr-VA.github.io/ahj-homeworks-form/)

## Описание

Реализация виджета Popover на чистом JavaScript без использования jQuery, аналогичного компоненту из Bootstrap.

## Демо

Посмотреть работающий виджет можно по ссылке: [https://Alexandr-VA.github.io/ahj-homeworks-form/](https://Alexandr-VA.github.io/ahj-homeworks-form/)

## Особенности

- 🎯 Popover позиционируется сверху от целевого элемента
- 📐 Автоматическое центрирование по горизонтали
- 🎨 Стилизация соответствует Bootstrap
- 🔄 Плавные анимации появления/скрытия
- 🖱️ Управление кликом (показ/скрытие)
- 🚫 Скрытие при клике вне области popover
- ✅ 100% покрытие тестами
- 📦 Данные для popover берутся из data-атрибутов кнопки

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка проекта
npm run build

# Запуск тестов
npm test

# Проверка покрытия тестами
npm run coverage