const User = require("./user");
const Role = require("./role");
const Permission = require("./permission");
const RolePermission = require("./rolePermission");
const Employee = require("./employee");
const Designation = require("./designation");
const Department = require("./department");
const Book = require("./book");
const Category = require("./category");
const Publisher = require("./publisher");
const Customer = require("./customer");
const Order = require("./order");
const OrderItem = require("./orderitem");
const Payment = require("./payment");
const Wishlist = require("./wishlist");
const Cart = require("./cart");
const Discount = require("./discount");
const BookReview = require("./bookReview");
const Subscription = require("./subscription");
const Notification = require("./notification");
const Country = require("./country");
const Region = require("./region");
const State = require("./state");
Book.hasMany(OrderItem, { foreignKey: "bookId", as: "orderItems" });
OrderItem.belongsTo(Book, { foreignKey: "bookId", as: "book" });

Customer.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasOne(Employee, { foreignKey: "userId", as: "employeeDetails" });
Employee.belongsTo(User, { foreignKey: "userId", as: "user" });

Country.hasMany(Region, { foreignKey: 'countryId', as: 'regions' });
Region.belongsTo(Country, { foreignKey: 'countryId', as: 'country' });

Region.hasMany(State, { foreignKey: 'regionId', as: 'states' });
State.belongsTo(Region, { foreignKey: 'regionId', as: 'region' });


Role.hasMany(User, { foreignKey: "roleId", as: "users" });
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });


Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId", as: "permissions" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId", as: "roles" });


Designation.hasMany(Employee, { foreignKey: "designationId", as: "employees" });
Employee.belongsTo(Designation, { foreignKey: "designationId", as: "designation" });

Department.hasMany(Employee, { foreignKey: "departmentId", as: "employees" });
Employee.belongsTo(Department, { foreignKey: "departmentId", as: "department" });


Category.hasMany(Book, { foreignKey: "categoryId", as: "books" });
Book.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

Publisher.hasMany(Book, { foreignKey: "publisherId", as: "books" });
Book.belongsTo(Publisher, { foreignKey: "publisherId", as: "publisher" });

Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "orderItems" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });


Order.hasOne(Payment, { foreignKey: "orderId", as: "payment" });
Payment.belongsTo(Order, { foreignKey: "orderId", as: "order" });


Customer.hasMany(Wishlist, { foreignKey: "customerId", as: "wishlists" });
Wishlist.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

Customer.hasMany(Cart, { foreignKey: "customerId", as: "carts" });
Cart.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

Book.hasMany(Wishlist, { foreignKey: "bookId", as: "wishlistItems" });
Wishlist.belongsTo(Book, { foreignKey: "bookId", as: "book" });

Book.hasMany(Cart, { foreignKey: "bookId", as: "carts" });
Cart.belongsTo(Book, { foreignKey: "bookId", as: "book" });


Discount.hasMany(Order, { foreignKey: "discountId", as: "orders" });
Order.belongsTo(Discount, { foreignKey: "discountId", as: "discount" });


Book.hasMany(BookReview, { foreignKey: "bookId", as: "reviews" });
BookReview.belongsTo(Book, { foreignKey: "bookId", as: "book" });

Customer.hasMany(BookReview, { foreignKey: "customerId", as: "reviews" });
BookReview.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });


Customer.hasMany(Subscription, { foreignKey: "customerId", as: "subscriptions" });
Subscription.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });


User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = {
  User,
  Role,
  Permission,
  RolePermission,
  Employee,
  Designation,
  Department,
  Book,
  Category,
  Publisher,
  Customer,
  Order,
  OrderItem,
  Payment,
  Wishlist,
  Cart,
  Discount,
  BookReview,
  Subscription,
  Notification
};
