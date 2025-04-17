import React, { useState, ReactNode } from "react";

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {isDropdownOpen && <List>{children}</List>}

      {isDropdownOpen && (
        <div className="fixed inset-0 z-0" onClick={closeDropdown} />
      )}
    </div>
  );
};

const List: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
      style={{ zIndex: 1000 }}
    >
      <div className="py-2">{children}</div>
    </div>
  );
};

export default DropdownMenu;
