describe("mmSelect => ", function() {
    describe("Properties => ", function() {
        it("value, options", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmSelect",
                    props: {
                        value: 1,
                        options: [
                            {
                                value: 1,
                                label: "Item 1"
                            },
                            {
                                value: 2,
                                label: "Item 2"
                            }
                        ]
                    }
                }, jQuery('body'));

                comp.destroy();

                done();
            });
        });
    });
});