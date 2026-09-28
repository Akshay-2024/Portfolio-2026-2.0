'use client';

import React from 'react';

interface Project {
  id: number;
  type: string;
  tag: string;
  title: string;
  bgEmoji: string;
  gradient: string;
  desc: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  category: string;
  onClose: () => void;
  projects: Project[];
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  category,
  onClose,
  projects,
}) => {
  const filteredProjects = category === 'all'
    ? projects
    : projects.filter(p => p.type === category);

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <span className="modal-badge">
            {category === 'design' ? 'Web Design & UI/UX' : category === 'photos' ? 'Photography & Art Direction' : 'Selected Work'}
          </span>
          <h2>
            {category === 'design' ? 'Design Case Studies' : category === 'photos' ? 'Photography Gallery' : 'Featured Projects'}
          </h2>
          <p>Explore creative digital products, UI systems, and visual storytelling.</p>
        </div>

        <div className="modal-grid">
          {filteredProjects.map((item) => (
            <div key={item.id} className="project-card">
              <div className="project-img-wrapper" style={{ background: item.gradient, color: '#ffffff' }}>
                <span>{item.bgEmoji}</span>
              </div>
              <div className="project-info">
                <div className="project-tag">{item.tag}</div>
                <div className="project-title">{item.title}</div>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: '1.4' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
