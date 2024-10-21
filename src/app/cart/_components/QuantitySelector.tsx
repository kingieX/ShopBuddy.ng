import React, { useState } from 'react';

interface QuantitySelectorProps {
  initialQuantity?: number;
  minQuantity?: number;
  onQuantityChange: (quantity: number) => void; // Callback when quantity is updated
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1, // Default quantity is 1
  minQuantity = 0, // Minimum quantity (can be 0 or 1)
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  // Handle increment
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity); // Notify parent component about the update
  };

  // Handle decrement
  const handleDecrement = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // Notify parent component about the update
    }
  };

  return (
    <div className="flex items-center rounded-md border">
      <button
        className="border-r px-2 py-1 text-lg"
        onClick={handleDecrement}
        disabled={quantity === minQuantity} // Disable decrement when quantity is at minimum
      >
        -
      </button>
      <span className="px-4 py-1 text-lg">{quantity}</span>
      <button
        className="border-l bg-button px-2 py-1 text-lg text-white"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
