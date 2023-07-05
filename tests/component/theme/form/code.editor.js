describe("mmCodeEditor => ", function() {
    mimi.vendorBaseUrl = "/site/vendors";
    mimi.siteBaseUrl = "/site";
    describe("Variables => ", function() {
        it("editor", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmCodeEditor",
                    props: {
                        class: "m-2",
                        height: "400",
                    },
                    language: "json"
                });

                expect(comp.editor).not.toBeNull();

                comp.destroy();

                done();
            });
        });
    });
    describe("Properties => ", function() {
        it("value", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmCodeEditor",
                    props: {
                        class: "m-2",
                        height: 400,
                        value: {
                            "hello": "world"
                        }
                    },
                    language: "json"
                });
                expect(comp.prop("value")).toEqual({
                    "hello": "world"
                });
                expect(comp.editor.getValue()).toEqual('{\n    "hello": "world"\n}');
                comp.destroy();
                done();
            });
        });
        it("actions", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmCodeEditor",
                    props: {
                        class: "m-2",
                        height: 400,
                        actions: [
                            {
                                value: "edit",
                                icon: "edit",
                                onClick: function() {
                                    expect(this.name).toEqual(comp.name);
                                }
                            }
                        ]
                    },
                    on: {
                        action: function(value) {
                            expect(value).toEqual("edit");
                            this.destroy();
                            done();
                        }
                    },
                    language: "json"
                });

                comp.element.find(".navbar-nav.justify-content-start button").eq(0).trigger("click");
            });
        });
    });
});