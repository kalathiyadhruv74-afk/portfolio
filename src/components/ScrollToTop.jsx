import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/': 'Dhruv Kalathiya — Full-Stack Web Developer & Engineer',
  '/about': 'About Dhruv Kalathiya — Full-Stack Web Developer',
  '/work': 'Selected Projects & Work — Dhruv Kalathiya',
  '/skills': 'Technical Skills & Capabilities — Dhruv Kalathiya',
  '/contact': 'Contact & Start a Project — Dhruv Kalathiya',
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pageTitles[pathname] || 'Dhruv Kalathiya — Full-Stack Web Developer';
  }, [pathname]);

  return null;
};

export default ScrollToTop;
