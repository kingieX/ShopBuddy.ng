interface CurrencyFormatterProps {
  amount?: number; // Optional amount
}

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({ amount }) => {
  // If amount is undefined or null, show a placeholder
  if (amount === undefined || amount === null) {
    return <span>N/A</span>; // You can customize this placeholder
  }

  // Format the amount using the NG locale with currency style
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2, // Ensure at least 2 decimal places
    maximumFractionDigits: 2, // Limit to 2 decimal places
  }).format(amount);

  return <span>{formattedAmount}</span>;
};

export default CurrencyFormatter;
