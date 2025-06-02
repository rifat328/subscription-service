import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
name: {
    type: String,
    required:[true, 'Subscription Name is Required'],
    trim: true,
    minLength: 3,
    maxLength: 100,
},
price: {
    type: Number,
    require:[true, 'Subscription price is required'],
    min: [0, 'price must be 0 or greater then 0'],
},
currency: {
    type: String,
    enum: ['USD','EUR','BDT','GBP','CAD','SR'],
    default: 'BDT',
},
frequency:{
    type: String,
    enum: ['daily', 'weekly', 'monthly','yearly',]
},
category: {
    type: String,
    enum: ['sports', 'news','technology','entertainment', 'lifestyle','finance','politics','other'],
    required: true,
},
paymentMethod:{
    type:String,
    required: true,
    trim: true,
},
status:{
    type: String,
    enum: ['active','cancelled','expired'],
    default:'active'
},
startDate:{
    type:Date,
    required: true,
    validate: {
        validator:(value)=> value <= new Date(),
        message: 'Start Date must be set in the past',
    }
},
renewalDate:{
    type:Date,
    validate: {
        validator: function(value){
           return value > this.startDate;
        } ,
        message: 'Renewal Date must be set in the future',
    }
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
}
},{timestamps: true})

// Auto-calculate renewal date if missing.

subscriptionSchema.pre('save', function (next){
    if(!this.renewalDate){
        const renewalPeriods ={
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        }
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+ renewalPeriods[this.frequency]);
    }

    // Auto-update the status if renewal date has passed 
    if(this.renewalDate < new Date()){
        this.status= 'expired';
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;