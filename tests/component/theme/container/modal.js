describe("mmModal => ", function() {
    describe("Properties => ", function() {
        it("label", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmModal",
                    props: {
                        label: "Hello"
                    }
                });

                expect(comp.prop("label")).toEqual("Hello");
                expect(comp.element.find("h5").text().trim()).toEqual("Hello");

                comp.destroy();

                done();
            });
        });
        it("icon", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmModal",
                    props: {
                        icon: "edit",
                        label: "Hello"
                    }
                });

                expect(comp.prop("icon")).toEqual("edit");
                expect(comp.element.find("i.fa-edit").length).toEqual(1);

                comp.destroy();

                done();
            });
        });
        it("visible", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmModal",
                    props: {
                        icon: "edit",
                        label: "Hello"
                    }
                });
                
                expect(comp.prop("visible")).toBeFalse();
                expect(comp.element.hasClass("d-none")).toBeTrue();

                comp.prop("visible", true);
                expect(comp.prop("visible")).toBeTrue();
                expect(comp.element.hasClass("d-none")).toBeFalse();

                comp.destroy();

                done();
            });
        });
        it("content, data", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmModal",
                    props: {
                        icon: "edit",
                        label: "Hello",
                        content: "Hello {{message}}",
                        data: {
                            message: "World"
                        },
                        visible: true
                    }
                });

                expect(comp.prop("content")).toEqual("Hello {{message}}");
                expect(comp.prop("data")).toEqual({
                    message: "World"
                });
                expect(comp.element.find(".modal-body").text().trim()).toEqual("Hello World");

                comp.destroy();

                done();
            });
        });
        it("buttons", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmModal",
                    props: {
                        visible: true,
                        buttons: [
                            {
                                type: "secondary-outline",
                                action: "save",
                                label: "Save"
                            }
                        ]
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("save");
                            this.destroy();
                            done();
                        }
                    }
                });
                comp.element.find("button").eq(0).trigger("click");
            });
        });
    });
    describe("Events => ", function() {
        it("ok", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmModal",
                    props: {
                        label: "Hello",
                        visible: true
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("ok");
                            this.destroy();
                            done();
                        }
                    }
                });

                comp.element.find("button").eq(1).trigger("click");
            });
        });
        it("cancel", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmModal",
                    props: {
                        label: "Hello",
                        visible: true
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("cancel");
                            this.destroy();
                            done();
                        }
                    }
                });

                comp.element.find("button").eq(0).trigger("click");
            });
        });
    });
});