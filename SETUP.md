# Portfolio Development Setup

This guide will help you set up and run the portfolio website locally.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd Portfolio
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

## Development

### Option 1: Run both frontend and backend together

```bash
npm run dev
```

This will start both the React frontend (http://localhost:3000) and Express backend (http://localhost:5000) simultaneously.

### Option 2: Run frontend and backend separately

**Frontend only:**

```bash
npm run dev:frontend
```

**Backend only:**

```bash
npm run dev:backend
```

## Environment Setup

### Backend Environment Variables

1. Copy the example environment file:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit the `.env` file with your configuration:

   ```env
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000

   # Email Configuration (for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

### Email Configuration (Optional)

To enable the contact form email functionality:

1. **For Gmail:**

   - Enable 2-factor authentication
   - Generate an app-specific password
   - Use your Gmail address as `EMAIL_USER`
   - Use the app password as `EMAIL_PASS`

2. **For other email providers:**
   - Update the transporter configuration in `backend/routes/contact.js`

## Building for Production

### Frontend Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
Portfolio/
├── frontend/              # React frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── styles/        # CSS files
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json
├── backend/               # Express backend API
│   ├── routes/            # API routes
│   ├── server.js          # Express server
│   └── package.json
├── README.md
└── package.json           # Root package.json
```

## Available Scripts

- `npm run dev` - Run both frontend and backend
- `npm run dev:frontend` - Run only React frontend
- `npm run dev:backend` - Run only Express backend
- `npm run build` - Build frontend for production
- `npm start` - Start production server
- `npm run install:all` - Install all dependencies
- `npm run clean` - Clean all node_modules and build files

## Customization

### Personal Information

Update the following files with your personal information:

1. **Frontend Components:**

   - `src/components/Home.js` - Name, title, description
   - `src/components/About.js` - Personal details, experience
   - `src/components/Contact.js` - Contact information
   - `src/components/Footer.js` - Social links

2. **Backend Data:**

   - `backend/routes/projects.js` - Your projects
   - `backend/routes/skills.js` - Your skills and experience

3. **Configuration:**
   - `public/index.html` - Page title and meta tags
   - `public/manifest.json` - App name and description

### Styling

- All CSS files are in `src/styles/`
- The color scheme uses CSS custom properties
- Responsive design with mobile-first approach
- Smooth animations and transitions

### Adding New Features

1. **New API Endpoints:**

   - Create new route files in `backend/routes/`
   - Add routes to `backend/server.js`

2. **New React Components:**
   - Create components in `src/components/`
   - Add corresponding CSS files in `src/styles/`
   - Update routing in `src/App.js`

## Deployment

### Frontend (Netlify, Vercel, etc.)

1. Build the frontend: `npm run build`
2. Deploy the `frontend/build` folder

### Backend (Heroku, Railway, etc.)

1. Deploy the `backend` folder
2. Set environment variables in your hosting platform
3. Update the `FRONTEND_URL` in backend environment variables

### Full-Stack (Railway, Render, etc.)

1. Deploy the entire project
2. Configure build and start commands
3. Set up environment variables

## Troubleshooting

### Common Issues

1. **Port already in use:**

   - Change ports in package.json scripts or environment variables

2. **Email not sending:**

   - Check email credentials in .env file
   - Verify email service configuration

3. **API requests failing:**

   - Ensure backend is running on correct port
   - Check CORS configuration

4. **Styling issues:**
   - Clear browser cache
   - Check for CSS conflicts

### Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure environment variables are set correctly
4. Check that both frontend and backend are running

## Contributing

Feel free to customize this portfolio template for your own use. If you find bugs or have suggestions for improvements, please feel free to contribute!
