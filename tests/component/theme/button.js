describe("mmButton => ", function() {
    describe("Properties => ", function() {
        it("label", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmButton",
                    props: {
                        label: "Hello"
                    }
                });

                expect(comp.prop("label")).toEqual("Hello");
                expect(comp.element.text().trim()).toEqual("Hello");

                comp.destroy();
                
                done();
            });
        });
        it("bg", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmButton",
                    props: {
                        label: "Hello",
                        bg: "secondary"
                    }
                });

                expect(comp.prop("bg")).toEqual("secondary");
                expect(comp.element.hasClass("btn-secondary")).toBeTrue();

                comp.destroy();
                
                done();
            });
        });
        it("icon", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmButton",
                    props: {
                        label: "Hello",
                        type: "secondary",
                        icon: "edit"
                    }
                });

                expect(comp.prop("icon")).toEqual("edit");
                expect(comp.element.find("i").length).toEqual(1);
                expect(comp.element.find("i").hasClass("fa-edit")).toBeTrue();

                comp.props({
                    label: "",
                    icon: "edit"
                }).apply();

                expect(comp.element.hasClass("btn-icon")).toBeTrue();

                comp.destroy();
                
                done();
            });
        });
        it("size", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmButton",
                    props: {
                        label: "Hello",
                        type: "secondary",
                        icon: "edit"
                    }
                });

                expect(comp.prop("size")).toEqual("");
                expect(comp.element.hasClass("btn-sm")).toBeFalse();

                comp.prop("size", "lg");

                expect(comp.prop("size")).toEqual("lg");
                expect(comp.element.hasClass("btn-lg")).toBeTrue();

                comp.destroy();
                
                done();
            });
        });
        it("disabled", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmButton",
                    props: {
                        label: "Hello"
                    }
                });

                expect(comp.prop("disabled")).toBeFalse();
                expect(comp.element.hasClass("disabled")).toBeFalse();

                comp.prop('disabled', true);

                expect(comp.prop('disabled')).toBeTrue();
                expect(comp.element.attr("disabled")).toEqual("disabled");

                comp.destroy();
                
                done();
            });
        });
        it("badge", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmButton",
                    props: {
                        label: "Hello",
                        badge: {
                            label: 100
                        }
                    }
                });

                expect(comp.prop("badge")).toEqual({
                    label: 100
                });
                expect(comp.element.find("span.badge").length).toEqual(1);
                expect(comp.element.find("span.badge").text().trim()).toEqual('100');

                comp.destroy();
                
                done();
            });
        });
    });
    describe("Events => ", function() {
        it("click", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmButton",
                    props: {
                        label: "Click Me"
                    },
                    on: {
                        click: function() {
                            comp.destroy();
                            done();
                        }
                    }
                });

                comp.element.trigger("click");
            });
        });
    });
});