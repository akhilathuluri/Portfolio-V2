import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from '@/lib/theme';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import { SearchDialog } from './components/search/search-dialog';
import { SearchButton } from './components/search/search-button';
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';
import { ProjectsPage } from './pages/projects';
import { AdminPage } from './pages/admin';
import { BlogPage } from './pages/blog';
import { BlogPostPage } from './pages/blog/[id]';
import { LinksPage } from './pages/links';
import { SkillsPage } from './pages/skills';
import { LoginPage } from './pages/login';
import { ContactPage } from './pages/contact';
import { TechStackPage } from './pages/tech-stack';
// import { Analytics } from '@vercel/analytics/next';
// import { SpeedInsights } from '@vercel/speed-insights/next';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-200 flex flex-col">
          <Navbar />
          <main className="pt-16 flex-grow">
            <SearchButton onClick={() => setIsSearchOpen(true)} />
            <SearchDialog 
              isOpen={isSearchOpen} 
              onClose={() => setIsSearchOpen(false)} 
            />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/links" element={<LinksPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/tech-stack" element={<TechStackPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        {/* <Analytics />
        <SpeedInsights /> */}
      </Router>
    </ThemeProvider>
  );
}