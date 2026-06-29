import { useState } from 'react';
import { cn } from '@utils/cn';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? '');

  return (
    <div className={cn('tabs', className)}>
      <div className="tabs__list" role="tablist" aria-label="Content tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            className={cn('tabs__trigger', activeTab === tab.id && 'tabs__trigger--active')}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
          className="tabs__panel"
        >
          {activeTab === tab.id && tab.content}
        </div>
      ))}

      <style>{`
        .tabs__list {
          display: flex;
          gap: 4px;
          border-bottom: 2px solid var(--color-border);
          padding-bottom: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .tabs__list::-webkit-scrollbar { display: none; }

        .tabs__trigger {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border: none;
          background: none;
          font-family: var(--font-sans);
          font-size: var(--fs-text-sm);
          font-weight: 500;
          color: var(--color-text-tertiary);
          cursor: pointer;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: color 150ms, border-color 150ms;
        }

        .tabs__trigger:hover {
          color: var(--color-text-primary);
        }

        .tabs__trigger--active {
          color: var(--color-primary-700);
          border-bottom-color: var(--color-primary-700);
          font-weight: 600;
        }

        .tabs__trigger:focus-visible {
          outline: 2px solid var(--color-primary-500);
          outline-offset: 2px;
          border-radius: 4px;
        }

        .tabs__panel {
          padding-top: var(--space-lg);
        }

        .tabs__panel:focus-visible {
          outline: 2px solid var(--color-primary-500);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
