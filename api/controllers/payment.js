import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51OK4fKAuxcCPLWUM1zV1UqmBrUB6DCwsLEmx7wiDw1iuf179w2AOkSxdqhtjIZ58ibiOuMtBAia4YBxA8A62jxF000vXkx45U4");

export const createCheckoutSession = async (req, res, next) => {
    try {
        const { price } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'pln',
                        product_data: {
                            name: 'Rezerwacja noclegu',
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancel`,
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        next(error);
    }
};