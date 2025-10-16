import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, CreditCard, Shield, ArrowLeft, Loader2 } from 'lucide-react';

// Pi Network SDK types
interface PiPayment {
  amount: number;
  memo: string;
  metadata: Record<string, any>;
  paymentId: string;
}

interface PiNetwork {
  authenticate: () => Promise<any>;
  createPayment: (payment: PiPayment) => Promise<any>;
  openShareDialog: (title: string, message: string) => Promise<any>;
}

declare global {
  interface Window {
    Pi: PiNetwork;
  }
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CheckoutPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pi' | 'card'>('pi');
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    saveInfo: false
  });

  // Sample cart items - in real app, this would come from props or context
  const cartItems: CartItem[] = [
    { id: '1', name: 'Wireless Headphones', price: 99.99, quantity: 1 },
    { id: '2', name: 'Phone Case', price: 25.00, quantity: 2 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0.00; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  const piAmount = total / 30; // Assuming 1 Pi = $30

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Authenticate user with Pi Network
  const handlePiAuth = async () => {
    if (!window.Pi) {
      alert('Pi Browser is required for authentication. Please open this app in the Pi Browser.');
      return;
    }

    setIsAuthenticating(true);
    try {
      const userData = await window.Pi.authenticate();
      setUser(userData);
      console.log('Authentication successful:', userData);
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Create Pi payment
  const handlePiPayment = async () => {
    if (!window.Pi) {
      alert('Pi Browser is required for payments. Please open this app in the Pi Browser.');
      return;
    }

    if (!user) {
      alert('Please authenticate first.');
      return;
    }

    setIsProcessing(true);

    try {
      // Generate a unique payment ID
      const paymentId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const paymentData: PiPayment = {
        amount: piAmount,
        memo: `Payment for order ${paymentId}`,
        metadata: {
          orderId: paymentId,
          products: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode
          },
          totalAmount: total,
          piAmount: piAmount
        },
        paymentId: paymentId
      };

      console.log('Creating Pi payment:', paymentData);

      // Initiate payment through Pi SDK
      const payment = await window.Pi.createPayment(paymentData);

      console.log('Payment initiated:', payment);

      // Here you would typically send the payment data to your backend
      // to verify and complete the transaction
      await sendPaymentToBackend(payment);

      alert('Payment successful! Thank you for your order.');

      // Optional: Share payment success
      try {
        await window.Pi.openShareDialog(
          'Payment Successful!',
          `I just completed a payment of π ${piAmount.toFixed(2)} for my order!`
        );
      } catch (shareError) {
        console.log('Share dialog cancelled or failed:', shareError);
      }

      // Reset form and clear cart
      resetCheckout();

    } catch (error: any) {
      console.error('Payment failed:', error);
      
      // Handle specific Pi payment errors
      if (error.message?.includes('user cancelled')) {
        alert('Payment was cancelled by user.');
      } else if (error.message?.includes('insufficient balance')) {
        alert('Insufficient Pi balance. Please ensure you have enough Pi in your wallet.');
      } else {
        alert('Payment failed. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock function to send payment data to backend
  const sendPaymentToBackend = async (payment: any) => {
    // In a real application, you would send this to your backend
    // to verify the payment and update your database
    console.log('Sending payment to backend:', payment);
    
    // Simulate API call to backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Your backend would typically:
    // 1. Verify the payment with Pi Server API
    // 2. Update order status in database
    // 3. Send confirmation email
    // 4. Update inventory, etc.
  };

  const resetCheckout = () => {
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zipCode: '',
      saveInfo: false
    });
    // In a real app, you would also clear the cart context
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.email || !formData.firstName || !formData.lastName || 
        !formData.address || !formData.city || !formData.zipCode) {
      alert('Please fill in all required fields.');
      return;
    }

    if (paymentMethod === 'pi') {
      handlePiPayment();
    } else {
      // Handle card payment (existing simulation)
      handleCardPayment();
    }
  };

  const handleCardPayment = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Card payment successful! Thank you for your order.');
      resetCheckout();
    } catch (error) {
      console.error('Card payment failed:', error);
      alert('Card payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-4" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping and Payment */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, saveInfo: checked as boolean }))
                    }
                  />
                  <Label htmlFor="saveInfo">Save this information for next time</Label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={paymentMethod === 'pi' ? 'default' : 'outline'}
                    className="h-16"
                    onClick={() => setPaymentMethod('pi')}
                  >
                    <div className="text-center">
                      <div className="font-semibold">Pi Coin</div>
                      <Badge variant="secondary" className="mt-1">
                        Recommended
                      </Badge>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    className="h-16"
                    onClick={() => setPaymentMethod('card')}
                  >
                    Credit/Debit Card
                  </Button>
                </div>

                {paymentMethod === 'pi' && (
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-3">
                        Pay securely with Pi Coin. You'll be redirected to the Pi Browser app to complete your payment.
                      </p>
                      
                      {!user ? (
                        <Button
                          type="button"
                          onClick={handlePiAuth}
                          disabled={isAuthenticating}
                          className="w-full"
                        >
                          {isAuthenticating ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Authenticating...
                            </>
                          ) : (
                            'Authenticate with Pi Network'
                          )}
                        </Button>
                      ) : (
                        <div className="text-sm text-green-600">
                          ✓ Authenticated as {user.username}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                          <span className="text-xs font-medium">Item</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Pi Coin Equivalent */}
                  {paymentMethod === 'pi' && (
                    <div className="flex justify-between text-sm font-semibold text-primary">
                      <span>Pi Coin Amount</span>
                      <span>π {piAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground pt-4 border-t">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout • Encrypted payment</span>
                </div>

                {/* Checkout Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg"
                  disabled={isProcessing || (paymentMethod === 'pi' && !user)}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : paymentMethod === 'pi' ? (
                    `Pay π ${piAmount.toFixed(2)} with Pi Coin`
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
