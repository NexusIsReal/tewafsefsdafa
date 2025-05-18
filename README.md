# JohanMedia Portfolio Website

A modern, responsive portfolio website for JohanMedia, a professional video editing brand. Built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- Sleek dark theme with minimalist design
- Responsive for all devices (mobile-first approach)
- Smooth animations and transitions
- Hero section with looping video background
- Portfolio section with video/image showcase
- Contact form with validation
- SEO optimized

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## Getting Started

### Prerequisites

- Node.js 14.6.0 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/johannmedia-portfolio.git
```

2. Navigate to the project directory
```bash
cd johannmedia-portfolio
```

3. Install dependencies
```bash
npm install
# or
yarn
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
johannmedia-portfolio/
├── public/              # Static files
├── src/                 # Source files
│   ├── app/             # Next.js App Router
│   │   ├── components/  # React components
│   │   │   ├── home/    # Home page specific components
│   │   │   ├── layout/  # Layout components (Header, Footer)
│   │   │   └── ui/      # Reusable UI components
│   │   └── styles/      # Global styles
│   └── README.md        # Project documentation
```

## Customization

- Replace placeholder images and videos in the `public` folder
- Update the content in component files to match your branding
- Modify colors in `globals.css` and `tailwind.config.js`

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## License

This project is licensed under the MIT License.
