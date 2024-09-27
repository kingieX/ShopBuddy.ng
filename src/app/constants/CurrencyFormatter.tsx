interface CurrencyFormatterProps {
  amount?: number; // Optional amount
}

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({ amount }) => {
  // If amount is undefined or null, show a placeholder
  if (amount === undefined || amount === null) {
    return <span>N/A</span>; // You can customize this placeholder
  }

  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);

  return <span>{formattedAmount}</span>;
};

export default CurrencyFormatter;
