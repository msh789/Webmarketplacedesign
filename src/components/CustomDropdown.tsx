import { useState, useRef, useEffect, ReactNode } from 'react';

interface CustomDropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export function CustomDropdown({ trigger, children, align = 'right', className = '' }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div 
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 bg-white rounded-md shadow-lg border border-slate-200 z-50 ${className}`}
          style={{ minWidth: '200px' }}
        >
          <div onClick={() => setIsOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface CustomDropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function CustomDropdownItem({ children, onClick, className = '' }: CustomDropdownItemProps) {
  return (
    <div
      className={`px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CustomDropdownSeparator() {
  return <div className="h-px bg-slate-200 my-1" />;
}
