describe("mmPanel => ", function() {
    describe("Properties => ", function() {
        it("label", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmPanel",
                    props: {
                        label: "Hello World"
                    }
                });

                expect(comp.prop("label")).toEqual("Hello World");
                expect(comp.element.find("h5").text().trim()).toEqual("Hello World");
                expect(comp.element.find("h5 input").length).toEqual(0);

                comp.element.find("h5 div.cursor-pointer").trigger("dblclick");
                expect(comp.element.find("h5 input").length).toEqual(1);
                
                let e = jQuery.Event("keydown");
                e.which = 13;
                comp.element.find("h5 input").val("Hello Worlds").trigger(e);
                expect(comp.prop("label")).toEqual("Hello Worlds");
                expect(comp.element.find("h5").text().trim()).toEqual("Hello Worlds");
                expect(comp.element.find("h5 input").length).toEqual(0);

                comp.destroy();

                done();
            });
        });
        it("icon", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmPanel",
                    props: {
                        label: "Hello",
                        icon: "edit"
                    }
                });

                expect(comp.prop("icon")).toEqual("edit");
                expect(comp.element.find("h5 i.fa-edit").length).toEqual(1);

                comp.destroy();

                done();
            });
        });
        it("content", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmPanel",
                    props: {
                        label: "Hello",
                        content: "Panel Content"
                    }
                });

                expect(comp.prop("content")).toEqual("Panel Content");

                comp.destroy();

                done();
            });
        });
        it("action", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmPanel",
                    props: {
                        label: "Hello",
                        content: "Panel Content",
                        action: {
                            type: "mmButton",
                            props: {
                                size: "sm",
                                label: "Clear Content"
                            },
                            on: {
                                click: function() {
                                    comp.destroy();
                                    done();
                                }
                            }
                        }
                    }
                });

                comp.element.find("button").trigger("click");
            });
        });
    });
    describe("Events => ", function() {
        it("label-change", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmPanel",
                    props: {
                        label: "Hello World"
                    },
                    on: {
                        "label-change": function() {
                            this.destroy();
                            done();
                        }
                    }
                });

                comp.element.find("h5 div.cursor-pointer").trigger("dblclick");
            
                let e = jQuery.Event("keydown");
                e.which = 13;
                comp.element.find("h5 input").val("Hello Worlds").trigger(e);
            });
        });
    });
});