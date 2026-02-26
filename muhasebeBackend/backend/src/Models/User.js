const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'İsim alanı zorunludur'] 
  },
  email: { 
    type: String, 
    required: [true, 'E-posta alanı zorunludur'],
    unique: true, // Aynı e-posta ile ikinci kayıt yapılamaz
    lowercase: true // E-postaları hep küçük harf kaydeder
  },
  password: { 
    type: String, 
    required: [true, 'Şifre alanı zorunludur'],
    minlength: 6 // Güvenlik için minimum şifre uzunluğu
  },
  role: {
    type: String,
    enum: ['Admin', 'Owner', 'Staff'],
    default: 'Staff', // Rol belirtilmezse varsayılan olarak Staff atanır
    required: true,
  },
  // Hangi şirkete bağlı olduğunu tutmak için (Multi-tenant yapı)
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }
}, {
  timestamps: true // createdAt ve updatedAt alanlarını otomatik ekler
});

module.exports = mongoose.model('User', UserSchema);