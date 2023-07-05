describe("mmProgress => ", function() {
    describe("Properties => ", function() {
        it("perct, visible", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmProgress",
                    props: {
                        class: "m-2",
                        perct: 100,
                        visible: true
                    }
                });

                comp.destroy();

                done();
            });
        });
    });
});