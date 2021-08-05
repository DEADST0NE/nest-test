import random from './index';

describe('Random string generation tests', () => {
  it('should return the default length of 12 characters when no length argument is provided', (done) => {
    expect(random()).toHaveLength(12);
    done();
  });

  it('should return the exact length when length argument is provided', (done) => {
    expect(random(20)).toHaveLength(20);
    done();
  });

  it('creation matches', () => {
    const testCreateUserId = () => {
      let arrayId = [];
      let status = false;
      for (let i = 0; i < 5000; i++) {
        arrayId.push(random());
      }

      if (arrayId.length === 0) {
        status = true;
      }

      arrayId = arrayId.filter(
        (elem, pos, arr) =>
          pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem),
      );
      if (arrayId.length > 0) {
        status = true;
      }
      return status;
    };

    expect(testCreateUserId()).toBe(false);
  });
});
