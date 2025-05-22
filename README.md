<div align="center">
  <img src="https://via.placeholder.com/200x200?text=GymBro+Logo" alt="GymBro Logo" width="200"/>
  
  # GymBro - AI Fitness Coach
  
  [![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/apps/aspnet)
  [![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)](https://docs.microsoft.com/en-us/dotnet/csharp/)
  
  Your personal AI fitness coach that adapts to your progress, creates custom workouts, and provides real-time feedback.
</div>

## ✨ Features

- **💬 AI Fitness Coach** - Chat with an AI coach for personalized fitness guidance
- **🔐 User Authentication** - Secure login and registration system
- **👤 Profile Management** - User profile with customizable settings
- **📱 Responsive Design** - Optimized for all devices from mobile to desktop
- **🔄 Real-time Feedback** - Instant form correction and technique guidance
- **📊 Smart Analysis** - Advanced analytics to track performance and identify patterns
- **🏋️ Custom Workouts** - AI-generated workout plans tailored to your fitness level and goals

## 📸 Screenshots

<div align="center">
  <details>
    <summary>🏠 Home Page</summary>
    ![image](https://github.com/user-attachments/assets/873f8449-ddca-4cdc-be37-64f72ece4548)

  </details>
  
  <details>
    <summary>🤖 AI Chat Interface</summary>
   ![image](https://github.com/user-attachments/assets/838485d4-6e3d-4466-a5c0-f92b246c4baa)
  </details>
  
  <details>
    <summary>👤 About Developer</summary>
    ![image](https://github.com/user-attachments/assets/6e25a955-cd91-468c-b341-4e90b2505408)
  </details>
  
   <details>
    <summary>➕ Sign up</summary>
    ![image](https://github.com/user-attachments/assets/1e103223-ea7d-4ef0-aef6-e7317f30a204)
  </details>

   <details>
    <summary>🚪 Sign in</summary>
   ![image](https://github.com/user-attachments/assets/90e1f253-5791-498e-8f17-7522204270f6)
  </details>

   <details>
    <summary>👤 Profile</summary>
   ![image](https://github.com/user-attachments/assets/45172fbd-d713-4282-872f-681da5df3e39)
  </details>
</div>

## 🔗 API Integration

This frontend is designed to work with the GymBro ASP.NET Core backend API. Key integration points:

### Authentication Endpoints
\`\`\`typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
DELETE /api/auth/logout
\`\`\`

### User Management
\`\`\`typescript
GET /api/users/profile
PUT /api/users/profile
GET /api/users/stats
\`\`\`

### AI Coach Integration
\`\`\`typescript
POST /api/chat/message
GET /api/chat/history
POST /api/workouts/generate
\`\`\`

---

## 📁 Project Structure

\`\`\`
gymbro-frontend/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 (auth)/            # Authentication routes
│   │   ├── signin/           # Sign in page
│   │   └── signup/           # Sign up page
│   ├── 📁 about/             # About developer page
│   ├── 📁 chat/              # AI coach chat interface
│   ├── 📁 profile/           # User profile management
│   ├── 📁 fonts/             # Local font files
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── 📁 components/            # Reusable components
│   ├── 📁 ui/                # shadcn/ui components
│   ├── app-sidebar.tsx       # Application sidebar
│   ├── auth-provider.tsx     # Authentication context
│   ├── hero-section.tsx      # Landing page hero
│   └── features-section.tsx  # Features showcase
├── 📁 lib/                   # Utility functions
│   └── utils.ts              # Common utilities
├── 📁 public/                # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS config
└── tsconfig.json             # TypeScript config
\`\`\`

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Make your changes**
4. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`
5. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure components are responsive
- Add proper error handling
- Write meaningful commit messages

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Related Repositories

### Backend Development

🚧 **Currently working on the ASP.NET Core backend API**

The backend repository will include:
- RESTful API endpoints
- JWT authentication
- Entity Framework Core
- AI service integration
- Comprehensive testing

**Backend Repository**: [GymBro Backend API](https://github.com/yourusername/gymbro-backend)
