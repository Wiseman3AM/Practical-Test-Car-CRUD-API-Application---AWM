import assert from 'assert';
import mostPopularCar from '../function/mostPopularCar.js';
import { describe, it } from 'node:test';
import cars from '../cars/data.js'


describe('The mostPopularCar function', function () {
    it('must determine what the most popular car in the array is', function () {
        assert.equal(mostPopularCar(cars), 'Toyota');;
    });
});

