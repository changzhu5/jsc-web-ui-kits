describe("mmBadge => ", function() {
    describe("Properties => ", function() {
        it("label", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmBadge",
                    props: {
                        label: "Hello World"
                    }
                });

                expect(comp.prop("label")).toEqual("Hello World");
                expect(comp.element.text().trim()).toEqual("Hello World");
                comp.destroy();

                done();
            });
        });
        it("label", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmBadge",
                    props: {
                        label: "Hello World",
                        bg: "secondary"
                    }
                });

                expect(comp.prop("bg")).toEqual("secondary");
                expect(comp.element.hasClass("bg-secondary")).toBeTrue();

                comp.destroy();

                done();
            });
        });
    });
});