# Multi App - React Mini Applications Collection

A modern React application featuring a collection of useful mini-applications with an elegant user interface and smooth animations.

## 🚀 Features

- **Interactive Carousel**: Navigate through different mini-apps with smooth transitions
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Glass morphism effects and animated backgrounds
- **Component-Based Architecture**: Modular and reusable React components
- **Performance Optimized**: Only renders visible applications to save resources

## 📱 Available Applications

### 1. Quote Generator
- Displays inspirational quotes randomly
- Clean and elegant presentation
- Interactive quote generation

### 2. BMI Calculator
- Calculate Body Mass Index
- Input validation and error handling
- Instant results with health category classification
- Smooth animations when displaying results

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **CSS Modules** - Scoped styling with modular CSS
- **JavaScript (ES6+)** - Modern JavaScript features

## 🏗️ Project Structure

```
src/
├── assets/
│   ├── apps/
│   │   ├── cal-imc/          # BMI Calculator
│   │   └── gen-citas/        # Quote Generator
│   ├── buttons/              # Reusable Button Components
│   ├─── icons/               # SVG Icons
│   └── components/
│       ├── background/       # Animated Background
│       └── layout/           # Layout Components
├── App.jsx                   # Main App Component
└── main.jsx                  # Entry Point
```

## 🎨 Design Features

- **Animated Gradient Background**: Dynamic color transitions
- **Glass Morphism**: Modern frosted glass effects
- **Smooth Transitions**: CSS animations for better UX
- **Fixed Header**: Always accessible navigation
- **Carousel Navigation**: Arrow buttons and indicators

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd multi-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Component Architecture

### Layout Component
- Manages the overall application structure
- Handles carousel navigation logic
- Responsive design implementation

### Mini Applications
Each mini-app is a self-contained React component:
- Independent state management
- Modular CSS styling
- Reusable across the application

### Reusable Components
- `BasicButton`: Customizable button with onClick handling
- `AnimatedGradientBackground`: Dynamic background effects
- Icon components with SVG graphics

## 🎯 Future Enhancements

- Additional mini-applications
- Dark/Light theme toggle
- Local storage for user preferences
- Mobile-first optimizations
- Progressive Web App (PWA) features

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**KAMI** - [GitHub Profile](https://github.com/Kamiiuwu)

---

*Built with ❤️ using React and modern web technologies*
