describe("mmContent => ", function() {
    describe("Properties => ", function() {
        it("content, data", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmContent",
                    props: {
                        class: "text-center",
                        content: {
                            type: "mmButton",
                            props: {
                                label: "Hello World"
                            }
                        }
                    }
                });

                expect(comp.prop("content")).toEqual({
                    type: "mmButton",
                    props: {
                        label: "Hello World"
                    }
                });
                expect(comp.findOne("mmButton")).toBeInstanceOf(mimi.getComponentDef("mmButton"));

                comp.prop("data", {
                    msg: "Hello World"
                });
                expect(comp.prop("data")).toEqual({
                    msg: "Hello World"
                });

                comp.prop("content", `{{msg}}`);

                expect(comp.prop("content")).toEqual("{{msg}}");
                expect(comp.element.text().trim()).toEqual("Hello World");

                comp.prop("content", {
                    type: "mmHeading",
                    props: {
                        label: "Hello World"
                    }
                });

                expect(comp.prop("content")).toEqual({
                    type: "mmHeading",
                    props: {
                        label: "Hello World"
                    }
                });
                expect(comp.findOne("mmHeading")).toBeInstanceOf(mimi.getComponentDef("mmHeading"));

                comp.destroy();

                done();
            });
        });
    });
});