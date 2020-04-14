const expect = require('chai').expect;
const db = require('../../db');
const { User, Order } = db.models;
let userList;

beforeEach(() => {
  return db.syncAndSeed();
});
describe('models', () => {
  User.findAll().then(users => {
    userList = users.reduce((obj, user) => {
      obj[user.id] = user;
      return obj;
    }, {});
  });
  describe('User', () => {
    it('exists', () => {
      expect(User).to.be.ok;
    });

    it('has a findOrCreateCart method', () => {
      return User.findOrCreateCart(1).then(cart => {
        expect(cart).to.be.ok;
      });
    });
    it('is assigned a cart when the findOrCreateCart method is called', () => {
      User.create({
        fullName: 'jack jack',
        email: 'j@aol.com',
        password: 'abcd1234'
      })
        .then(user => {
          return User.findOrCreateCart(user.id);
        })
        .then(() =>
          Order.findOne({
            where: { userId: 6 }
          })
        )
        .then(order => {
          expect(order).to.be.ok;
        });
    });
  });
});
