import { useState } from 'react';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { ProjectsManager } from './components/projects-manager';
import { BlogManager } from './components/blog-manager';
import { LinksManager } from './components/links-manager';
import { SkillsManager } from './components/skills-manager';
import { AuthGuard } from '@/components/auth/auth-guard';
import { LogoutButton } from '@/components/auth/logout-button';

type ContentType = 'projects' | 'blog' | 'links' | 'skills';

export function AdminPage() {
  const [activeSection, setActiveSection] = useState<ContentType>('projects');

  const sections = {
    projects: <ProjectsManager />,
    blog: <BlogManager />,
    links: <LinksManager />,
    skills: <SkillsManager />
  };

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-12">
        <SketchContainer className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <SketchText as="h1" className="text-3xl">Admin Dashboard</SketchText>
            <LogoutButton />
          </div>
          
          <div className="flex space-x-4 mb-8">
            {Object.keys(sections).map((section) => (
              <SketchButton
                key={section}
                variant={activeSection === section ? 'primary' : 'outline'}
                onClick={() => setActiveSection(section as ContentType)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </SketchButton>
            ))}
          </div>

          {sections[activeSection]}
        </SketchContainer>
      </div>
    </AuthGuard>
  );
}