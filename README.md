# AryzenTube 🎬

A smarter YouTube clone built with React that focuses on better learning experiences.

## ✨ Features

### 🎨 Better Design
- **AMOLED Dark Theme** - Easy on eyes during long study sessions
- **Cleaner Layout** - Simple and organized interface
- **Better Fonts** - Improved readability

### 🧠 Learning Lab (Main Feature)
Stop wasting time searching for the right tutorial. Learning Lab creates personalized learning paths:

1. **Choose what to learn** - React, Python, Web Development, etc.
2. **Select your language** - Hindi, English, or others
3. **Set your daily time** - 30 minutes, 1 hour, etc.
4. **Pick your timeline** - 2 weeks, 1 month, etc.
5. **Select your level** - Beginner, Intermediate, or Advanced

The system then creates a daily learning plan with the best videos for your needs.

### 🔧 Other Features
- **Dark/Light Mode Toggle**
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Video Categories** - Easy filtering by topic
- **YouTube-like Interface** - Familiar but improved

## 🚀 How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aryzentube.git
   cd aryzentube
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Go to `http://localhost:3000`

## 📁 Project Structure

```
aryzentube/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   ├── VideoGrid.js
│   │   └── VideoPlayer.js
│   ├── data/
│   │   └── mockData.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── Sidebar.css
│   │   ├── VideoGrid.css
│   │   └── VideoPlayer.css
│   ├── App.js
│   └── index.js
├── public/
└── package.json
```

## 🛠️ Technologies Used

- **React** - Frontend framework
- **React Router** - Page navigation
- **Material-UI** - Icons and components
- **CSS3** - Styling and animations
- **Local Storage** - Save user preferences

## 🎯 Problem Solved

YouTube has millions of educational videos, but:
- Hard to find the right one for your level
- No structure or learning path
- Videos might be in wrong language
- Time wasted searching instead of learning

AryzenTube fixes this by creating personalized learning journeys.

## 📱 How to Use

1. **Browse videos** like normal YouTube
2. **Click "Learning Lab"** in the header
3. **Fill your preferences** - what, how, and when to learn
4. **Get your plan** - daily video schedule
5. **Follow along** - one click to each day's video

## 🎨 Customization

You can easily customize:
- Colors in `src/styles/App.css`
- Mock videos in `src/data/mockData.js`
- Learning paths logic in components
- Add more languages or skills

## 🤝 Contributing

Feel free to fork this project and:
- Add more features
- Improve the design
- Add real YouTube API integration
- Create more learning paths

## 📄 License

This project is open source and available for educational purposes.

## 🐛 Known Issues

- Uses mock data (no real YouTube API)
- Basic learning path algorithm
- Limited to demo videos

## 🚀 Future Improvements

- [ ] Real YouTube API integration
- [ ] More languages support
- [ ] User accounts and progress tracking
- [ ] Community learning paths
- [ ] Video download option
- [ ] Quiz system for each video

## 💡 Why I Built This

As a student, I wasted hours jumping between tutorials. I wanted to create a tool that helps people learn efficiently without the frustration of searching.

## 👤 Author

**ARYZEN NEX**
- Built during a 3-hour hackathon
- Focus on solving real learning problems
- Simple and effective design

---

AryzenTube made with ❤️ by ARYZEN NEX 👾