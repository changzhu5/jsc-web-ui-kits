describe("TypeTest => ", function() {
    it("BaseFormElement", function(done) {
        mimi.ready(function() {
            const mmTextfield = mimi.create({
                type: 'mmTextfield'
            });
            expect(mmTextfield instanceof mmBaseFormElement).toBeTrue();
            mmTextfield.destroy();
            done();
        });
    });
});