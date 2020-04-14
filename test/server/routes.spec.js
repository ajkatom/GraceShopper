const expect = require('chai').expect;
const app = require('../../server/app');
const request = require('supertest');

//==================== orders API test ====================
const serv = request(app);
describe('findes orders', () => {
  it('gets all orders', () => {
    serv.get('/api/orders').then(res => {
      console.log(res.body.length);
      expect(res.status).to.equal(200);
    });
  });
  it('gets all orders', () => {
    serv.get('/api/orders/1').then(res => {
      console.log(res.body);
      expect(res.status).to.equal(200);
    });
  });
});

describe('handle orders', () => {
  it('adds an order', () => {
    serv.post('/api/orders/', { status: 'cart' }).then(res => {
      console.log(res.body);
      expect(res.status).to.equal(200);
    });
  });
});
