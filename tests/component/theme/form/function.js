describe("mmFunction => ", function() {
    describe("Properties => ", function() {
        it("value", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmFunction",
                    props: {
                        class: "p-2",
                        value: {
                            params: ["event"],
                            body: ""
                        }
                    }
                });

                comp.destroy();
                
                done();
            });
        });
    });
});