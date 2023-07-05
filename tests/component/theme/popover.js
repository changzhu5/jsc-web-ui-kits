describe("mmPopover => ", function() {
    describe("Properties => ", function() {
        it("visible", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmPopover",
                    props: {
                        class: "ms-5",
                        title: "Test",
                        content: "Hello World",
                        visible: true,
                        arrowStyle: "top: 10px"
                    }
                });

                comp.destroy();

                done();
            });
        });
    });
});