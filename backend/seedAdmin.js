const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./schema/admin');
const bcrypt = require('bcrypt');

async function seedSuperAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.db_url);
    console.log('Connected to database for seeding');

    // Check if super admin already exists
    const existingSuperAdmin = await Admin.findOne({ isSuperuser: true });
    if (existingSuperAdmin) {
      console.log('Super admin already exists');
      return;
    }

    // Create super admin
    const hashedPassword = await bcrypt.hash('superadmin123', 10);
    const superAdmin = new Admin({
      fullname: 'Super Admin',
      username: 'superadmin',
      password: hashedPassword,
      isSuperuser: true
    });

    await superAdmin.save();
    console.log('Super admin created successfully');
    console.log('Username: superadmin');
    console.log('Password: superadmin123');

  } catch (error) {
    console.error('Error seeding super admin:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedSuperAdmin();
