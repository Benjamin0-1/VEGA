const { OrderPayment, Order } = require("../db")
const Stripe = require('stripe');
const { Cart, Template } = require("../db");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe webhooks will be implemented in the future.


const paymentIntent = async (userId) => {
  try {
    // Retrieve the user's cart
    const userCart = await Cart.findOne({
      where: { user_id: userId },
      include: [{
        model: Template,
        as: 'inCart',
        through: {
          attributes: []
        }
      }]
    });

    if (!userCart || userCart.inCart.length === 0) {
      return { status: 400, message: 'El carrito está vacío' };
    }

    // Find all completed orders for the user and get purchased templates
    const purchasedTemplates = await Order.findAll({
      where: { user_id: userId},
      include: [{
        model: Template,
        as: 'purchasedTemplates',
        through: {
          attributes: []
        }
      }]
    });

    // Flatten purchased templates into a single array
    const purchasedTemplateIds = purchasedTemplates.flatMap(order =>
      order.purchasedTemplates.map(template => template.id)
    );

    // Filter out templates that the user has already purchased
    const newTemplatesInCart = userCart.inCart.filter(template =>
      !purchasedTemplateIds.includes(template.id)
    );

    if (newTemplatesInCart.length === 0) {
      return { status: 400, message: 'Todos los templates en el carrito ya han sido comprados.' };
    }

    // Create a new order for the templates not yet purchased
    let order = await Order.create({
      user_id: userId,
      total_amount: newTemplatesInCart.reduce((total, template) => total + template.price, 0),
      status: 'pending'
    });

    for (const template of newTemplatesInCart) {
      await order.addPurchasedTemplate(template);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: newTemplatesInCart.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `http://localhost:5173/paySuccess`,
      cancel_url: `http://localhost:5173/payCancel`,
    });

    order.stripe_session_id = session.id;
    await order.save();

    // Clean the user's cart after successful purchase
    await userCart.destroy();

    return { status: 201, id: session.id, session_url: session.url, order: order.id };
  } catch (error) {
    return { status: 500, message: `Internal Server Error: ${error.message}` };
  }
};



const paymentSuccess = async (orderId, userId) => {
  try {
    let order = await Order.findByPk(orderId, {
      include: [ {
        model: Template,
        as: 'purchasedTemplates',
        through: {
          attributes: []
        }
      } ]
    });

    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: [ {
        model: Template,
        as: 'inCart',
        through: {
          attributes: []
        }
      } ]
    });

    if (cart) {
      // Eliminar el carrito después de que el pago sea exitoso
      await cart.destroy();
    }

    order.status = 'completed';
    await order.save();
    return { status: 200, message: 'Pago realizado, el carrito fue eliminado', data: order };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

const paymentCanceled = async (orderId, userId) => {
  try {
    let order = await Order.findByPk(orderId, {
      include: [ {
        model: Template,
        as: 'purchasedTemplates',
        through: {
          attributes: []
        }
      } ]
    });
    if (!order) {
      return { status: 404, message: 'Orden no encontrada' };
    }

    order.status = 'canceled';
    await order.save();

    return { status: 200, message: 'Orden cancelada con éxito', data: order };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

module.exports = {
  paymentIntent,
  paymentSuccess,
  paymentCanceled
}

