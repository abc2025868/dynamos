const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 6
    },
    otp: {
        code: String,
        expiresAt: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate OTP
userSchema.methods.generateOTP = function() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otp = {
        code: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    };
    return otp;
};

// Method to verify OTP
userSchema.methods.verifyOTP = function(otp) {
    if (!this.otp || !this.otp.code || !this.otp.expiresAt) return false;
    if (this.otp.expiresAt < new Date()) return false;
    return this.otp.code === otp;
};

const User = mongoose.model('User', userSchema);

module.exports = User; 