import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface QuantitySelectorProps {
  cartItemId: string;
  initialQuantity: number;
  minQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity,
  minQuantity,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Update local quantity state if initialQuantity changes
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
    toast.success('Product quantity increased');
  };

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
      toast.success('Product quantity decreased');
    } else if (quantity === minQuantity) {
      onQuantityChange(0); // Remove from cart
      toast.error('Product removed from cart');
    }
  };

  const buttonColor = quantity > 0 ? 'bg-button' : 'bg-white';

  return (
    <div className="flex items-center rounded-md border">
      <button
        className={`border-r px-2 py-1 text-lg ${buttonColor}`}
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="px-4 py-1 text-lg">{quantity}</span>
      <button
        className={`border-l px-2 py-1 text-lg ${buttonColor}`}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
