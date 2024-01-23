import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        default: 'usd'
    },
    status: {
        type: String,
        required: true,
        default: 'pending', 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;