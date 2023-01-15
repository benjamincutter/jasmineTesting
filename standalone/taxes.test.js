describe('calculate taxes tests', () => {
    it('should calculate the high tax bracket', () => {
        // toBe is called a matcher, and there are multiple types
        expect(calculateTaxes(50000)).toEqual(12500);
        expect(calculateTaxes(100000)).toEqual(25000);
    });

    it('should calculate the low tax bracket', () => {
        expect(calculateTaxes(10000)).toEqual(1500);
        expect(calculateTaxes(1000)).toEqual(150);
        expect(calculateTaxes(0)).toEqual(0);
    });
});



// matchers
// toBe is ===
// toEqual is deep equality (doesn't compare references)