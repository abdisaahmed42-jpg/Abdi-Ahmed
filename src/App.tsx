/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AdminModal } from './components/AdminModal';
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { ProfileView } from './components/views/ProfileView';
import { EducationView } from './components/views/EducationView';
import { SkillsView } from './components/views/SkillsView';
import { PortfolioView } from './components/views/PortfolioView';
import { ServicesView } from './components/views/ServicesView';
import { ExperienceView } from './components/views/ExperienceView';
import { AchievementsView } from './components/views/AchievementsView';
import { BlogView } from './components/views/BlogView';
import { GalleryView } from './components/views/GalleryView';
import { CVView } from './components/views/CVView';
import { ContactView } from './components/views/ContactView';
import { SocialMediaView } from './components/views/SocialMediaView';

const MainContent: React.FC = () => {
  const { currentPage } = useData();

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'profile':
        return <ProfileView />;
      case 'education':
        return <EducationView />;
      case 'skills':
        return <SkillsView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'services':
        return <ServicesView />;
      case 'experience':
        return <ExperienceView />;
      case 'achievements':
        return <AchievementsView />;
      case 'blog':
        return <BlogView />;
      case 'gallery':
        return <GalleryView />;
      case 'cv':
        return <CVView />;
      case 'contact':
        return <ContactView />;
      case 'social':
        return <SocialMediaView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>
      <Footer />
      <SearchModal />
      <AdminModal />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <MainContent />
    </DataProvider>
  );
}
