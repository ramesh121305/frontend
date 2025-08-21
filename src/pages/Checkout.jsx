import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const STEPS = ["Address", "Review", "Payment"];

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if cart empty
  useEffect(() => {
    if (!cart.length) navigate("/cart");
  }, [cart.length, navigate]);

  // Require login
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const [step, setStep] = useState(0); // 0=Address,1=Review,2=Payment
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    pincode: "",
  });
  const [payment, setPayment] = useState({
    method: "cod",
    upi: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Totals
  const { itemCount, subtotal, tax, total } = useMemo(() => {
    const itemCount = cart.reduce((s, i) => s + (i.qty || 1), 0);
    const subtotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;
    return { itemCount, subtotal, tax, total };
  }, [cart]);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const placeOrder = () => {
    const orderId = "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    clearCart?.();
    navigate("/order-success", {
      state: {
        orderId,
        total,
        address,
        payment: { method: payment.method },
      },
      replace: true,
    });
  };

  // Validations
  const addressValid =
    address.fullName &&
    address.phone &&
    address.line1 &&
    address.city &&
    address.pincode;

  const paymentValid =
    payment.method === "cod" ||
    (payment.method === "upi" && payment.upi) ||
    (payment.method === "card" &&
      payment.cardName &&
      payment.cardNumber &&
      payment.expiry &&
      payment.cvv);

  return (
    <div className="container">
      {/* Stepper */}
      <div className="checkout-steps card p-3 mb-4">
        {STEPS.map((label, i) => {
          const completed = i < step;
          const active = i === step;
          return (
            <div
              key={label}
              className={`step ${active ? "active" : ""} ${
                completed ? "completed" : ""
              }`}
            >
              <div className="circle">{completed ? "✓" : i + 1}</div>
              <div className="label">{label}</div>
              {i < STEPS.length - 1 && <div className="bar" />}
            </div>
          );
        })}
      </div>

      <div className="row g-4">
        {/* LEFT: Step Form */}
        <div className="col-12 col-lg-8">
          <div className="card p-4">
            {/* STEP 0: Address */}
            {step === 0 && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="mb-0">Delivery Address</h4>
                  <Link to="/cart" className="small">
                    ← Back to cart
                  </Link>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full name*</label>
                    <input
                      className="form-control"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone*</label>
                    <input
                      className="form-control"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address line 1*</label>
                    <input
                      className="form-control"
                      value={address.line1}
                      onChange={(e) =>
                        setAddress({ ...address, line1: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address line 2</label>
                    <input
                      className="form-control"
                      value={address.line2}
                      onChange={(e) =>
                        setAddress({ ...address, line2: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City*</label>
                    <input
                      className="form-control"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Pincode*</label>
                    <input
                      className="form-control"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-primary"
                    disabled={!addressValid}
                    onClick={next}
                  >
                    Continue to Review
                  </button>
                </div>
              </>
            )}

            {/* STEP 1: Review */}
            {step === 1 && (
              <>
                <h4 className="mb-3">Review Your Order</h4>

                <div className="mb-3">
                  <h6 className="text-muted">Deliver to</h6>
                  <div>
                    {address.fullName} • {address.phone}
                  </div>
                  <div>
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}, {address.city} -{" "}
                    {address.pincode}
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="text-muted">Items</h6>
                  {cart.map((it) => (
                    <div
                      key={it._id || it.id}
                      className="d-flex justify-content-between py-2 border-bottom"
                    >
                      <div>
                        {it.name} × {it.qty || 1}
                      </div>
                      <div>₹{it.price * (it.qty || 1)}</div>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-outline-secondary" onClick={back}>
                    Back
                  </button>
                  <button className="btn btn-primary" onClick={next}>
                    Continue to Payment
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <>
                <h4 className="mb-3">Payment</h4>

                <div className="list-group mb-3">
                  <label className="list-group-item">
                    <input
                      type="radio"
                      name="pay"
                      className="form-check-input me-2"
                      checked={payment.method === "cod"}
                      onChange={() => setPayment({ ...payment, method: "cod" })}
                    />
                    Cash on Delivery
                  </label>

                  <label className="list-group-item">
                    <input
                      type="radio"
                      name="pay"
                      className="form-check-input me-2"
                      checked={payment.method === "upi"}
                      onChange={() => setPayment({ ...payment, method: "upi" })}
                    />
                    UPI
                  </label>
                  {payment.method === "upi" && (
                    <div className="mt-2">
                      <input
                        className="form-control"
                        placeholder="yourname@upi"
                        value={payment.upi}
                        onChange={(e) =>
                          setPayment({ ...payment, upi: e.target.value })
                        }
                      />
                    </div>
                  )}

                  <label className="list-group-item">
                    <input
                      type="radio"
                      name="pay"
                      className="form-check-input me-2"
                      checked={payment.method === "card"}
                      onChange={() =>
                        setPayment({ ...payment, method: "card" })
                      }
                    />
                    Credit / Debit Card
                  </label>
                </div>

                {payment.method === "card" && (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name on card</label>
                      <input
                        className="form-control"
                        value={payment.cardName}
                        onChange={(e) =>
                          setPayment({ ...payment, cardName: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Card number</label>
                      <input
                        className="form-control"
                        value={payment.cardNumber}
                        onChange={(e) =>
                          setPayment({ ...payment, cardNumber: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Expiry (MM/YY)</label>
                      <input
                        className="form-control"
                        value={payment.expiry}
                        onChange={(e) =>
                          setPayment({ ...payment, expiry: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">CVV</label>
                      <input
                        className="form-control"
                        value={payment.cvv}
                        onChange={(e) =>
                          setPayment({ ...payment, cvv: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-outline-secondary" onClick={back}>
                    Back
                  </button>
                  <button
                    className="btn btn-success"
                    disabled={!paymentValid}
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="col-12 col-lg-4">
          <div className="card p-4 summary-sticky">
            <h4 className="mb-3">Order Summary</h4>
            <div className="summary-row">
              <span>Items</span>
              <strong>{itemCount}</strong>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="text-success">Free</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="mt-3">
              {step === 0 && (
                <button
                  className="btn btn-primary w-100"
                  disabled={!addressValid}
                  onClick={next}
                >
                  Continue to Review
                </button>
              )}
              {step === 1 && (
                <button className="btn btn-primary w-100" onClick={next}>
                  Continue to Payment
                </button>
              )}
              {step === 2 && (
                <button
                  className="btn btn-success w-100"
                  disabled={!paymentValid}
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              )}
            </div>

            <div className="text-center mt-3">
              <Link to="/cart" className="small">
                ← Edit cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
