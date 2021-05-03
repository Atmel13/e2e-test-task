import random = require('randomstring');

export class DataGenerator {
    static getRandomString(length: number, type: string) {
        return random.generate({length: length, charset: type});
    };

    static getRandomPassword() {
        return this.getRandomString(10, 'alphabetic')
    };

    static getRandomEmail() {
        return `${this.getRandomString(10, 'alphabetic')}@mail.com`
    };
}