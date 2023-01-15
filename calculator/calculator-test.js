describe('calculateMonthPayment()', () => {
    // if you have immutable (won't change) data that could be used across tests
    // it's often good to include them in the describe scope, so they are accessible
    // in all tests and the next developer can use them in their tests
    const mockRate = 6;
    const mockPrinciple = 1000
    const mockYears = 1;

    /*
        I structure my tests in the following way:
            1. Setup: this is where you create any values and/or mock functions
            2. execution: this is where you run the actual functionality being tested
            3. validation: this is where you ensure the result matches what you expected

        I like this setup for unit testing because it gives clear boundaries between where you take actions,
        and ensures nothing is changing between your execution and validation.  However, sometimes it
        becomes necessary to combine these portions, particularly when testing things that may have a
        demanding setup/teardown between tests or where you want to test multiple actions sequentially
     */

    it('should calculate the monthly rate correctly', function () {
        // setup
        const expected = 86.07;
        const mockInput = {
            amount: mockPrinciple,
            years: mockYears,
            rate: mockRate
        }

        // execution
        const result = calculateMonthlyPayment(mockInput);

        // validation
        expect(result).toBe(expected);
    });


    it("should return a result with 2 decimal places", function() {
        // setup
        const irrationalPrinciple = 10000 / 3;
        const mockInput = {
            amount: irrationalPrinciple,
            years: mockYears,
            rate: mockRate
        }

        // execution
        const result = calculateMonthlyPayment(mockInput);

        // validation
        const decimalStr = ("" + result).split(".")[1];
        expect(decimalStr.length).toBe(2);
    });
});


/*
    A nice part about breaking up a complex algorithm into functions is you can do individual testing
    to make sure the different pieces work
 */

describe('cleanRate()', () => {
    it('returns a decimal if user passes in decimal', () => {
        const rate = 0.06;

        const result = cleanRate(rate);

        expect(result).toBe(rate);
    });

    it('returns a decimal if user passes in percentage', () => {
        const rate = 6;
        const expected = 0.06;

        const result = cleanRate(rate);

        expect(result).toBe(expected);
    });

    it('returns the default when invalid rate is passed', () => {
        const invalidRate = 8999;
        const expected = 0.065;

        const result = cleanRate(invalidRate);

        expect(result).toBe(expected);
    })
})