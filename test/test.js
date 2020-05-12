process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block


describe('AIK-PORTAL', () => {

  describe('Tests when back-end server is down', () => {

    describe('GET /',() => {
      it('Probar que el método muestra la página principal del portal AIK.', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });
    });

    describe('GET /buycars', () => {
      it('Probar que el método no redirecciona al contenido de la sección de comprar vehículos, cuando no se puede establecer comunicación con el back-end.', (done) => {
        chai.request(server)
        .get('/buycars')
        .end((err, res) => {
          res.should.have.status(404);
          chai.expect(res.body).to.eql({});
          done();
      });
      });
    });

    describe('GET /vehicles', () => {
      it('Probar que el método no redirecciona al contenido de la sección de vehículos, cuando no se puede establecer comunicación con el back-end.', (done) => {
        chai.request(server)
        .get('/vehicles')
        .end((err, res) => {
          res.should.have.status(404);
          chai.expect(res.body).to.eql({});
          done();
      });
      });
    });

    describe('GET /support', () => {
      it('Probar que el método no redirecciona al contenido de la sección de soporte, cuando no se puede establecer comunicación con el back-end.', (done) => {
        chai.request(server)
        .get('/support')
        .end((err, res) => {
          res.should.have.status(404);
          chai.expect(res.body).to.eql({});
          done();
      });
      });
    });
    
    describe('GET /experience', () => {
      it('Probar que el método no redirecciona al contenido de la sección de experiencia, cuando no se puede establecer comunicación con el back-end.', (done) => {
        chai.request(server)
        .get('/experience')
        .end((err, res) => {
          res.should.have.status(404);
          chai.expect(res.body).to.eql({});
          done();
      });
      });
    });
      
  });
});