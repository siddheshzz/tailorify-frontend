# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```



```

tailorify-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   └── ClientLayout.tsx
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ConfirmDialog.tsx
│   │   ├── services/
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── ServiceList.tsx
│   │   │   └── ServiceForm.tsx
│   │   ├── orders/
│   │   │   ├── OrderCard.tsx
│   │   │   ├── OrderList.tsx
│   │   │   ├── OrderForm.tsx
│   │   │   ├── OrderDetail.tsx
│   │   │   └── ImageUpload.tsx
│   │   ├── bookings/
│   │   │   ├── BookingCard.tsx
│   │   │   ├── BookingList.tsx
│   │   │   └── BookingForm.tsx
│   │   └── users/
│   │       ├── UserProfile.tsx
│   │       ├── UserList.tsx
│   │       └── UserForm.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── client/
│   │   │   ├── Home.tsx
│   │   │   ├── ServiceDetail.tsx
│   │   │   ├── CreateOrder.tsx
│   │   │   ├── MyOrders.tsx
│   │   │   ├── OrderDetail.tsx
│   │   │   ├── Bookings.tsx
│   │   │   └── Profile.tsx
│   │   └── admin/
│   │       ├── Dashboard.tsx
│   │       ├── ManageServices.tsx
│   │       ├── ManageOrders.tsx
│   │       ├── ManageBookings.tsx
│   │       └── ManageUsers.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── service.service.ts
│   │   ├── order.service.ts
│   │   ├── booking.service.ts
│   │   └── user.service.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   └── themeStore.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── storage.ts
│   │   └── constants.ts
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── service.types.ts
│   │   ├── order.types.ts
│   │   ├── booking.types.ts
│   │   └── user.types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md


```




@tailwind base;
@tailwind components;
@tailwind utilities;


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  color: #111827; /* gray-900 */
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}


::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9; 
}

::-webkit-scrollbar-thumb {
  background: #94a3b8; /* slate-400 */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b; /* slate-500 */
}


@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fade-in 0.3s ease-out;
}


.transition-smooth {
  transition: background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}



From what i see is we need to tweartk frontend a lot to accomodate this backend

so completed with admin route it was like the admin route
Turns out it was a Race condition and a Router conflict during initial load and sub sequent navigation

What steps i did was check first if token set and get was correct- by checking Inspect- Application-LocalStorage

when we first hit the admin route, the app tries to render --- does route check -- Is it ProtectedRoute requireAdmin

State is initial stage and flags liek isAuthenticated is set to false as it is just a start --- THEY DONT KNOW I AM AUTHENTICATED WHY THOUGH - 

but but - Redirect Fires as isAuthenticated is fakse and navigate to login --

then initialize() runs and successfully sets isAuthenticated: true.

SO IN ALL initialize was not rendering due to which isAuthenticated was not setting up

To fix this we wanted to make sure that the protected content is rendered give it time to render like delay.... initialize is called before redirecting or navigating to login again

we created isInitializing flag which sets as true from begining , once the token is set or deleted it sets to false.

so App.tsx now waits for initialization to complete for every screen. -Done



On delete what happends to fireignkey constrains
