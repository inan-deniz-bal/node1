const mongoose = require('mongoose');
const currentOrder = require('./currentOrder');
const tempOrderSchema = new mongoose.Schema({
    currentOrderId: mongoose.Schema.Types.ObjectId,
    orderedMeals: [
        {
            mealName: String,
            mealQuantity: Number,
            mealPrice: Number,
        },
    ],
    paidMeals: [
        {
            mealName: String,
            mealQuantity: Number,
            mealPrice: Number,
        },
    ],

});

module.exports = mongoose.model('TempOrder', tempOrderSchema);