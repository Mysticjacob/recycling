const OrderConfirmation = ({ orderDetails }) => {
    return (
      <div>
        <h2>Order Confirmation</h2>
        <p>Thank you for your purchase, {orderDetails.name}!</p>
        <p>Your order has been placed and will be shipped to {orderDetails.address}.</p>
        <p>Check your email ({orderDetails.email}) for order updates.</p>
      </div>
    );
  };
  
  export default OrderConfirmation;
  