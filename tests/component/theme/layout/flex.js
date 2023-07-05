describe("mmFlexLayout => ", function() {
    describe("Properties => ", function() {
        it("itemClass", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmFlexLayout",
                    props: {
                        class: "justify-content-center",
                        itemClass: "p-2",
                        components: [
                            {
                                comp: {
                                    type: "mmButton",
                                    props: {
                                        label: "Button 1"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "mmButton",
                                    props: {
                                        label: "Button 2"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "mmButton",
                                    props: {
                                        label: "Button 2"
                                    }
                                }
                            }
                        ]
                    }
                });

                expect(comp.prop("itemClass")).toEqual(["p-2"]);
                comp.element.children().each(function() {
                    expect(jQuery(this).hasClass("p-2")).toBeTrue();
                });

                comp.destroy();

                done();
            });
        });
    });
});