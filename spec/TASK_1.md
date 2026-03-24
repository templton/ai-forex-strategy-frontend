# Текущая задача: Настройка React + Ant Design + Vite + Redux Toolkit (базовая сборка и тестовая страница)

## Метаданные
- **Ветка**: feature/frontend-setup

## Ограничения для экономии токенов
- НЕ анализируй существующие файлы, если это не указано явно
- Следуй строго описанию в этом документе
- Создавай минимальный код, без избыточных комментариев
- Все команды для терминала выполняй через `npm`

## Технологический стек
- React (последняя версия)
- Ant Design (последняя версия)
- TypeScript
- React Router v6
- Redux Toolkit
- Vite (сборка)
- Axios (для API)
- @ant-design/icons (v6.x)

## Структура проекта
src/
├── containers/
│   ├── layout/
│   │   └── MainLayout/
│   │       ├── MainLayout.tsx
│   │       └── MainLayout.module.css
│   └── page/
│       └── Hello/
│           └── Hello.tsx
├── components/
│   ├── index.tsx
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.types.ts
│   └── Card/
│       ├── Card.tsx
│       └── Card.types.ts
├── types/
│   └── index.ts
├── store/
│   ├── index.ts
│   └── slices/
│       └── appSlice.ts
├── api/
│   └── client.ts
├── router/
│   └── index.tsx
├── App.tsx
├── main.tsx
└── vite-env.d.ts

## Алиасы (Vite)
В vite.config.ts настроить следующие алиасы:
- @components → src/components
- @containers → src/containers
- @types → src/types
- @store → src/store
- @api → src/api
- @router → src/router

## Принципы организации компонентов
- Папка components содержит переиспользуемые визуальные компоненты
- Каждый компонент лежит в своей папке с одноимённым tsx файлом и файлом типов
- Файл components/index.tsx экспортирует все компоненты для удобного импорта
- Импорт в приложении: import { Button, Card } from '@components'

## Пошаговое выполнение (СИНХРОННЫЙ РЕЖИМ)

### Шаг 1: Инициализация проекта и установка зависимостей
- [x] Создать проект: npm create vite@latest . -- --template react-ts
- [x] Установить зависимости:
  - npm install antd @ant-design/icons react-router-dom @reduxjs/toolkit react-redux axios
  - npm install -D @types/react-router-dom
- [x] Проверить, что dev-сервер запускается (npm run dev)

**Критерии приёмки:**
- [x] Проект запускается на http://localhost:5173

➡️ **После выполнения шага:**
1. Отметить выполненные пункты
2. НЕ КОММИТИТЬ
3. ОСТАНОВИТЬСЯ и показать результат

**После моего подтверждения:**
- ✅ Если всё ок → коммит feat: init react + vite + antd + redux
- 🔄 Если нужны правки → исправить

---

### Шаг 2: Создать структуру папок и базовые файлы
- [x] Создать структуру папок:
  - containers/layout/MainLayout
  - containers/page/Hello
  - components/Button, components/Card
  - types, store/slices, api, router
- [x] Создать components/index.tsx с экспортами компонентов (пока пустыми)
- [x] Создать types/index.ts с экспортом пустого объекта (для будущих типов)
- [x] Создать api/client.ts с базовой конфигурацией axios (baseURL: /api/v1)
- [x] Создать store/slices/appSlice.ts с примером состояния (counter или просто пустой)
- [x] Создать store/index.ts с конфигурацией store (combineReducers, configureStore)
- [x] Создать router/index.tsx с базовым маршрутом на /hello (пока без компонента)
- [x] Настроить алиасы в vite.config.ts

**Критерии приёмки:**
- [x] Проект собирается без ошибок
- [x] Алиасы работают (можно проверить временным импортом)

➡️ **После выполнения шага:**
1. Отметить выполненные пункты
2. НЕ КОММИТИТЬ
3. ОСТАНОВИТЬСЯ и показать результат

**После моего подтверждения:**
- ✅ Если всё ок → коммит feat: add project structure and aliases
- 🔄 Если нужны правки → исправить

---

### Шаг 3: Создать тестовую страницу Hello
- [x] Создать containers/layout/MainLayout/MainLayout.tsx
  - Использовать Layout из antd (Header, Content, Footer)
  - В Header добавить заголовок "Forex Strategy Manager"
  - В Content использовать Outlet для вложенных маршрутов
- [x] Создать containers/page/Hello/Hello.tsx
  - Использовать Card из antd
  - Отображать заголовок "Hello from React + Ant Design"
  - Добавить кнопку с иконкой (использовать @ant-design/icons/SmileOutlined)
  - При нажатии показывать message.success из antd
- [x] Обновить router/index.tsx:
  - Создать роут с MainLayout как родительским
  - Вложенный роут /hello с компонентом Hello
  - Добавить редирект с / на /hello
- [x] Обновить App.tsx: использовать Provider из react-redux, RouterProvider из react-router
- [x] Подключить antd стили в main.tsx (импорт antd/dist/reset.css)

**Критерии приёмки:**
- [x] При открытии http://localhost:5173 видна страница с заголовком "Hello from React + Ant Design"
- [x] Кнопка с иконкой вызывает сообщение
- [x] Вёрстка соответствует antd Layout

➡️ **После выполнения шага:**
1. Отметить выполненные пункты
2. НЕ КОММИТИТЬ
3. ОСТАНОВИТЬСЯ и показать результат

**После моего подтверждения:**
- ✅ Если всё ок → коммит feat: add Hello page and MainLayout
- 🔄 Если нужны правки → исправить

---

## Финальный чеклист
- [x] Все 3 шага выполнены и подтверждены
- [ ] Задача отмечена в TASKS.md как ✅

## Статистика выполнения (заполняется агентом после каждого шага)
После завершения каждого шага добавь в этот раздел:

### Шаг 1
- Создано/изменено файлов: 7
- Добавлено строк кода: ~380
- Выполнено пунктов: 4/4
- Потрачено токенов (оценка): ~13000

### Шаг 2
- Создано/изменено файлов: 14
- Добавлено строк кода: ~220
- Выполнено пунктов: 9/9
- Потрачено токенов (оценка): ~11000

### Шаг 3
- Создано/изменено файлов: 5
- Добавлено строк кода: ~95
- Выполнено пунктов: 8/8
- Потрачено токенов (оценка): ~9000