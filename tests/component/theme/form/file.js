describe("mmFile => ", function() {
    describe("Properties => ", function() {
        it("disabled", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmFile",
                    props: {
                        disabled: true
                    }
                });

                expect(comp.prop('disabled')).toBeTrue();
                expect(comp.element.find('input').is(":disabled")).toBeTrue();

                comp.destroy();

                done();
            });
        });
    });
});