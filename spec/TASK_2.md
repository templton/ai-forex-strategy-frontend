# Текущая задача: Создать CRUD для сущности Strategy на фронтенде

## Метаданные
- **Ветка**: feature/strategy-crud-frontend
- **Проект**: frontend (React + Ant Design + Vite + Redux Toolkit)

## Ограничения для экономии токенов
- НЕ анализируй существующие файлы, если это не указано явно
- Следуй строго описанию в этом документе
- Создавай минимальный код, без избыточных комментариев

## Технологический стек
- React
- Ant Design (компоненты, иконки)
- TypeScript
- React Router v6
- Redux Toolkit
- Axios

## Структура проекта (дополнение)
src/
├── containers/
│   ├── layout/
│   │   ├── MainLayout/
│   │   │   └── MainLayout.tsx
│   │   └── Sidebar.tsx                 # отдельный файл рядом с MainLayout
│   └── page/
│       ├── StrategyList/
│       │   └── StrategyList.tsx
│       ├── StrategyCreate/
│       │   └── StrategyCreate.tsx
│       └── StrategyEdit/
│           └── StrategyEdit.tsx
├── components/
│   └── ... (переиспользуемые компоненты)
├── types/
│   └── index.ts
├── store/
│   ├── index.ts
│   └── slices/
│       ├── appSlice.ts
│       └── strategySlice.ts
├── api/
│   └── strategies.ts                  # API вызовы для стратегий
├── router/
│   └── index.tsx
└── ...

## API Эндпоинты (ожидаемые от бэкенда)
- GET /api/v1/strategies?page=1&limit=10
- GET /api/v1/strategies/{id}
- POST /api/v1/strategies
- PUT /api/v1/strategies/{id}
- DELETE /api/v1/strategies/{id}

## Типы
- TStrategy: { id: number; description: string; parameters: any; version: number; created_at: string; updated_at: string }
- TStrategiesResponse: { data: TStrategy[]; meta: { current_page: number; last_page: number; total: number } }

## Пошаговое выполнение (СИНХРОННЫЙ РЕЖИМ)

### Шаг 1: API клиент для стратегий и Redux slice
- [x] Создать `api/strategies.ts` с функциями:
  - getStrategies(page: number, limit: number)
  - getStrategy(id: number)
  - createStrategy(data: { description: string; parameters: any })
  - updateStrategy(id: number, data: { description?: string; parameters?: any })
  - deleteStrategy(id: number)
- [x] Создать `store/slices/strategySlice.ts`:
  - State: { items: TStrategy[]; currentStrategy: TStrategy | null; loading: boolean; error: string | null; pagination: { page: number; total: number; lastPage: number } }
  - Reducers: setLoading, setError, clearCurrent
  - Async thunks: fetchStrategies, fetchStrategy, createStrategy, updateStrategy, deleteStrategy
- [x] Добавить strategySlice в store/index.ts

**Критерии приёмки:**
- [x] Все API функции корректно типизированы
- [x] Redux slice содержит все необходимые состояния и thunks

➡️ **После выполнения шага:**
1. Отметить выполненные пункты
2. НЕ КОММИТИТЬ
3. ОСТАНОВИТЬСЯ и показать результат

**После моего подтверждения:**
- ✅ Если всё ок → коммит feat: add strategy API and Redux slice
- 🔄 Если нужны правки → исправить

---

### Шаг 2: Sidebar и маршрутизация
- [x] Создать `containers/layout/Sidebar.tsx`:
  - Использовать Menu из antd
  - Один пункт "Стратегии" с иконкой `DatabaseOutlined`
  - Навигация по ссылке `/strategies`
  - Добавить кнопку сворачивания (использовать state в Redux или локальный)
- [x] Обновить `containers/layout/MainLayout/MainLayout.tsx`:
  - Добавить Sidebar в Layout (Sider + Content)
  - Sidebar должен быть сворачиваемым
- [x] Обновить `router/index.tsx`:
  - Добавить роуты:
    - `/strategies` → StrategyList
    - `/strategies/create` → StrategyCreate
    - `/strategies/edit/:id` → StrategyEdit
  - Все роуты внутри MainLayout

**Критерии приёмки:**
- [x] Sidebar отображается слева, есть кнопка сворачивания
- [x] Пункт "Стратегии" ведёт на /strategies
- [x] Роуты для создания и редактирования существуют

➡️ **После выполнения шага:**
1. Отметить выполненные пункты
2. НЕ КОММИТИТЬ
3. ОСТАНОВИТЬСЯ и показать результат

**После моего подтверждения:**
- ✅ Если всё ок → коммит feat: add Sidebar and routing for strategies
- 🔄 Если нужны правки → исправить

---

### Шаг 3: Страница списка стратегий (StrategyList)
- [x] Создать `containers/page/StrategyList/StrategyList.tsx`
  - Использовать Table из antd
  - Колонки: ID, description, version, created_at, updated_at, действия (EditOutlined, DeleteOutlined)
  - Кнопка "Создать стратегию" (ведёт на `/strategies/create`)
  - Пагинация: 10 записей на страницу
  - Загружать данные через dispatch(fetchStrategies) при монтировании и при смене страницы
  - Отображать loading (spinner) во время загрузки
  - Обрабатывать ошибки (message.error)
- [x] Добавить обработку удаления:
  - Modal.confirm перед удалением
  - После удаления обновить список

**Критерии приёмки:**
- [x] Таблица отображает данные корректно
- [x] Пагинация работает
- [x] Кнопка удаления вызывает подтверждение и удаляет стратегию
- [x] Кнопка редактирования ведёт на `/strategies/edit/:id`
- [x] Кнопка создания ведёт на `/strategies/create`

➡️ **После выполнения шага:**
1. Отметить выполненные пункты
2. НЕ КОММИТИТЬ
3. ОСТАНОВИТЬСЯ и показать результат

**После моего подтверждения:**
- ✅ Если всё ок → коммит feat: add StrategyList page
- 🔄 Если нужны правки → исправить

---

### Шаг 4: Страница создания стратегии (StrategyCreate)
- [x] Создать `containers/page/StrategyCreate/StrategyCreate.tsx`
  - Использовать Form из antd
  - Поля:
    - description (TextArea, required)
    - parameters (TextArea, required, валидация JSON)
  - Кнопки: "Сохранить", "Отмена"
  - При успешном сохранении → редирект на `/strategies` с message.success
  - При ошибке → message.error
- [x] Добавить валидацию JSON:
  - Кастомный валидатор для поля parameters, проверяющий валидность JSON
  - Если JSON валиден, сохранять как объект, если нет — показывать ошибку

**Критерии приёмки:**
- [x] Форма отображается корректно
- [x] Валидация работает (description обязательное, parameters — валидный JSON)
- [x] При успешном сохранении происходит редирект на список
- [x] Кнопка "Отмена" ведёт на `/strategies`

➡️ **После выполнения шага:**
1. Отметить выполненные пункты
2. НЕ КОММИТИТЬ
3. ОСТАНОВИТЬСЯ и показать результат

**После моего подтверждения:**
- ✅ Если всё ок → коммит feat: add StrategyCreate page
- 🔄 Если нужны правки → исправить

---

### Шаг 5: Страница редактирования стратегии (StrategyEdit)
- [x] Создать `containers/page/StrategyEdit/StrategyEdit.tsx`
  - Загружать стратегию по id из URL (dispatch(fetchStrategy))
  - Form с предзаполненными значениями
  - Те же поля, что и в создании
  - Кнопки: "Сохранить", "Отмена"
  - При успешном сохранении → редирект на `/strategies`
- [x] Обработка загрузки: показывать spinner пока грузится стратегия
- [x] Обработка ошибок: если стратегия не найдена — редирект на список с ошибкой

**Критерии приёмки:**
- [x] Форма подгружает существующую стратегию
- [x] После сохранения данные обновляются
- [x] Кнопка "Отмена" ведёт на `/strategies`

➡️ **После выполнения шага:**
1. Отметить выполненные пункты
2. НЕ КОММИТИТЬ
3. ОСТАНОВИТЬСЯ и показать результат

**После моего подтверждения:**
- ✅ Если всё ок → коммит feat: add StrategyEdit page
- 🔄 Если нужны правки → исправить

---

## Финальный чеклист
- [x] Все 5 шагов выполнены и подтверждены
- [ ] Задача отмечена в TASKS.md как ✅

## Статистика выполнения (заполняется агентом после каждого шага)
После завершения каждого шага добавь в этот раздел:

### Шаг 1
- Создано/изменено файлов: 4
- Добавлено строк кода: ~245
- Выполнено пунктов: 5/5
- Потрачено токенов (оценка): ~9000

### Шаг 2
- Создано/изменено файлов: 3
- Добавлено строк кода: ~75
- Выполнено пунктов: 6/6
- Потрачено токенов (оценка): ~5000

### Шаг 3
- Создано/изменено файлов: 1
- Добавлено строк кода: ~95
- Выполнено пунктов: 7/7
- Потрачено токенов (оценка): ~4500

### Шаг 4
- Создано/изменено файлов: 1
- Добавлено строк кода: ~75
- Выполнено пунктов: 6/6
- Потрачено токенов (оценка): ~3500

### Шаг 5
- Создано/изменено файлов: 1
- Добавлено строк кода: ~120
- Выполнено пунктов: 5/5
- Потрачено токенов (оценка): ~4500