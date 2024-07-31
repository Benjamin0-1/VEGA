import { useState } from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DropdownMenu = ({ title, items, selectedItems, handleItemChange }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="relative w-full">
        <div 
          className="flex justify-between items-center cursor-pointer p-2 border-b-2 border-[#06B6D4]" 
          onClick={toggleMenu}
        >
          <h3 className="font-semibold">{title}</h3>
          {isOpen ? (
  <div className="text-[#06B6D4]">
    <FaChevronUp />
  </div>
) : (
  <div className="text-[#06B6D4]">
    <FaChevronDown />
  </div>
)}
        </div>
        {isOpen && (
          <div className="max-h-60 overflow-y-auto border border-t-0 border-[#06B6D4] rounded-b p-2">
            <div className="grid grid-cols-2 gap-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={selectedItems.includes(item.name)}
                    onChange={() => handleItemChange(item.name)}
                    className="mr-2"
                  />
                  <label htmlFor={`item-${item.name}`} className="text-sm">{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default DropdownMenu;