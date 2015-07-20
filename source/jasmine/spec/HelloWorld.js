'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

describe("Hello World", function () {
  var
    key;

  beforeEach(function () {
    // Choose a non-deterministic key because the keys persist in IPFS
    // between tests.
    key = String(Math.random());
  });

  it("should cause an error when getting a non-existent key", function (done) {
    var
      handler;

    handler = {
      reject: function () {
        expect(handler.reject).toHaveBeenCalled();
        done();
      }
    }

    spyOn(handler, 'reject').and.callThrough();
    HelloWorld.getItem(key).catch(handler.reject);
  });
  
  it("should be able to get an item after setting it", function (done) {
    HelloWorld.setItem(key, 'value').then(function () {
      HelloWorld.getItem(key).then(function (value) {
        expect(value).toBe('value');
        done();
      });
    });
  });

  it("should change the value when set again", function (done) {
    HelloWorld.setItem(key, 'first').then(function () {
      HelloWorld.getItem(key).then(function (value) {
        expect(value).toBe('first');
        
        HelloWorld.setItem(key, 'second').then(function () {
          HelloWorld.getItem(key).then(function (value) {
            expect(value).toBe('second');
            done();
          });
        });
      });
    });
  });
});
