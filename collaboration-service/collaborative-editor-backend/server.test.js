const request = require('supertest');
const app = require('./server'); // Import your Express app
const io = require('socket.io-client');
const http = require('http');
require('dotenv').config();


// Mock the Eureka client module
jest.mock('eureka-js-client', () => ({
    Eureka: jest.fn().mockImplementation(() => ({
      start: jest.fn(),
    })),
  }));

  describe('Collaboration Service', () => {
    let server;
    let socket;
  
    beforeAll(() => {
      server = app.listen(process.env.PORT || 4001);
      socket = io(`http://localhost:${process.env.PORT || 4001}`);
    });
  
    afterAll(() => {
      socket.disconnect();
      server.close();
    });
  
    describe('GET /', () => {
      it('should return a success message', async () => {
        const response = await request(app).get('/collab');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('msg', 'Hello world from collaboration service!');
      });
    });
  
    describe('Socket.IO events', () => {
      it('should connect to a room and receive the initial code', (done) => {
        const roomID = 'test-room';
        socket.on('connect', () => {
          socket.emit('CONNECTED_TO_ROOM', roomID);
        });
  
        socket.on('CODE_UPDATED', (code) => {
          expect(code).toBe('');
          done();
        });
      });
  
      it('should update the code and broadcast the changes', (done) => {
        const roomID = 'test-room';
        const newCode = 'console.log("Hello, World!");';
  
        socket.on('connect', () => {
          socket.emit('CONNECTED_TO_ROOM', roomID);
        });
  
        socket.on('CODE_UPDATED', (code) => {
          if (code === '') {
            socket.emit('CODE_CHANGED', { roomID: { room: roomID }, newCode });
          } else {
            expect(code).toBe(newCode);
            done();
          }
        });
      });
  

    });
  

  });