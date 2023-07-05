describe("mmAddonTextfield => ", function() {
    describe("Properties => ", function() {
        it("addon", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    props: {
                        addon: {
                            label: "$"
                        }
                    }
                });
                expect(comp.prop("addon")).toEqual({
                    label: "$"
                });
                expect(comp.element.find("label").text().trim()).toEqual("$");

                comp.prop("addon", {
                    type: "button",
                    value: "btn",
                    label: "Button"
                });

                expect(comp.prop("addon")).toEqual({
                    type: "button",
                    value: "btn",
                    label: "Button"
                });
                expect(comp.element.find("label").length).toEqual(0);
                expect(comp.element.find("button").length).toEqual(1);

                comp.prop("addon", {
                    type: "dropdown",
                    label: "Dropdown",
                    options: [
                        {
                            label: "Label 1",
                            value: "value1",
                            icon: "edit"
                        },
                        {
                            label: "Label 2",
                            value: "value2",
                            icon: "trash"
                        }
                    ]
                });

                expect(comp.prop("addon")).toEqual({
                    type: "dropdown",
                    label: "Dropdown",
                    options: [
                        {
                            label: "Label 1",
                            value: "value1",
                            icon: "edit"
                        },
                        {
                            label: "Label 2",
                            value: "value2",
                            icon: "trash"
                        }
                    ]
                });

                expect(comp.element.find("ul").length).toEqual(1);
                expect(comp.element.find("li").length).toEqual(2);

                comp.destroy();

                done();
            });
        });
        it("value", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    props: {
                        value: "Hello"
                    }
                });

                expect(comp.prop("value")).toEqual("Hello");
                expect(comp.element.find("input").val()).toEqual("Hello");
                
                comp.element.find("input").val("Hello World").trigger("keyup");

                expect(comp.prop("value")).toEqual("Hello World");
                expect(comp.element.find("input").val()).toEqual("Hello World");

                comp.destroy();

                done();
            });
        });

        it("placeholder", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    props: {
                        placeholder: ""
                    }
                });

                expect(comp.prop("placeholder")).nothing();
                expect(comp.element.find("input").is("[placeholder]")).toBeFalse();

                comp.prop("placeholder", "Type here...");
                
                expect(comp.prop("placeholder")).toEqual("Type here...");
                expect(comp.element.find("input").attr("placeholder")).toEqual("Type here...");

                comp.destroy();
                
                done();
            });
        });

        it("disabled", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    props: {
                        disabled: true
                    }
                });

                expect(comp.prop("disabled")).toBeTrue();
                expect(comp.element.find("input").is("[disabled]")).toBeTrue();

                comp.prop("disabled", false);

                expect(comp.prop("disabled")).toBeFalse();
                expect(comp.element.find("input").is("[disabled]")).toBeFalse();

                comp.destroy();
                
                done();
            });
        });

        it("readonly", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    props: {
                        readonly: true
                    }
                });

                expect(comp.prop("readonly")).toBeTrue();
                expect(comp.element.find("input").is("[readonly]")).toBeTrue();

                comp.prop("readonly", false);

                expect(comp.prop("readonly")).toBeFalse();
                expect(comp.element.find("input").is("[readonly]")).toBeFalse();

                comp.destroy();
                
                done();
            });
        });

        it("helpText", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    props: {
                        helpText: "Small description"
                    }
                });

                expect(comp.prop("helpText")).toEqual("Small description");
                expect(comp.element.find("small").length).toEqual(1);
                expect(comp.element.find("small").hasClass("float-start")).toBeTrue();

                comp.prop("textAlign", "end");
                expect(comp.prop("helpText")).toEqual("Small description");
                expect(comp.element.find("small").length).toEqual(1);
                expect(comp.element.find("small").hasClass("float-start")).toBeFalse();
                expect(comp.element.find("small").hasClass("float-end")).toBeTrue();

                comp.destroy();
                
                done();
            });
        });
    });
    describe("Events => ", function() {
        it("enter", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    on: {
                        enter: function() {
                            expect(this.prop("value")).toEqual("Hello");
                            comp.destroy();
                            done();
                        }
                    }
                });

                comp.element.find("input").val("Hello");
                let e = jQuery.Event("keyup");
                e.which = 13;
                comp.element.find("input").trigger(e);
            });
        });
        it("change#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    on: {
                        change:function() {
                            comp.destroy();
                            done();
                        }
                    }
                });

                comp.props({
                    value: "Hello"
                }).apply();
            });
        });
        it("change#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    on: {
                        change:function() {
                            comp.destroy();
                            done();
                        }
                    }
                });

                comp.prop("value", "Hello");
            });
        });
        it("change#3", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    on: {
                        change:function() {
                            expect(comp.prop("value")).toEqual("Hello");
                            comp.destroy();
                            done();
                        }
                    }
                });

                comp.element.find("input").val("Hello").trigger("keyup");
            });
        });
        it("changed#4", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield"
                });

                expect(comp.changed()).toBeFalse();

                comp.destroy();

                comp = mimi.create({
                    type: "mmAddonTextfield",
                    props: {
                        value: "Hello World"
                    }
                });
                
                expect(comp.changed()).toBeFalse();

                comp.destroy();
                
                done();
            });
        });
        it("click#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    props: {
                        addon: {
                            type: "button",
                            label: "Click Me",
                            value: "clickme"
                        }
                    },
                    on: {
                        click: function(value) {
                            expect(value).toEqual("clickme");
                            comp.destroy();
                            done();
                        }
                    }
                });
                comp.element.find("button").trigger("click");
            });
        });
        it("click#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAddonTextfield",
                    props: {
                        addon: {
                            type: "dropdown",
                            label: "Select",
                            options: [
                                {
                                    label: "Item 1",
                                    value: "item1"
                                },
                                {
                                    label: "Item 2",
                                    value: "item2"
                                }
                            ]
                        }
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("item2");
                            comp.destroy();
                            done();
                        }
                    }
                });

                comp.element.find("button").trigger("click");
                expect(comp.element.find("ul").css('display')).toEqual("block");

                comp.element.find("li > a").eq(1).trigger("click");
            });
        });
    });
});