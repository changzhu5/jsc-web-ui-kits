describe("mmTextfield", function() {
    describe("Properties", function() {
        it("value", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextfield",
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
                    type: "mmTextfield",
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

        it("password", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextfield",
                    props: {
                        password: true
                    }
                });

                expect(comp.prop("password")).toBeTrue();
                expect(comp.element.find("input").attr("type")).toEqual("password");

                comp.prop("password", false);

                expect(comp.prop("password")).toBeFalse();
                expect(comp.element.find("input").attr("type")).toEqual("text");

                comp.destroy();
                
                done();
            });
        });

        it("disabled", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextfield",
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
                    type: "mmTextfield",
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

        it("invalid", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextfield",
                    props: {
                        invalid: true
                    }
                });

                expect(comp.prop("invalid")).toBeTrue();
                expect(comp.element.find("input").hasClass("is-invalid")).toBeTrue();

                comp.prop("invalid", false);

                expect(comp.prop("invalid")).toBeFalse();
                expect(comp.element.find("input").hasClass("is-invalid")).toBeFalse();

                comp.destroy();
                
                done();
            });
        });

        it("helpText", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextfield",
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
                    type: "mmTextfield",
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
                    type: "mmTextfield",
                    on: {
                        change:function(oldValue, newValue) {
                            expect(this.changed()).toBeTrue();
                            expect(oldValue).nothing();
                            expect(newValue).toEqual("Hello");
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
                    type: "mmTextfield",
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
                    type: "mmTextfield",
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
                    type: "mmTextfield"
                });

                expect(comp.changed()).toBeFalse();

                comp.destroy();

                comp = mimi.create({
                    type: "mmTextfield",
                    props: {
                        value: "Hello World"
                    }
                });
                
                expect(comp.changed()).toBeFalse();

                comp.destroy();
                
                done();
            });
        });
    });

    describe("Methods => ", function() {
        it("changed()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextfield",
                    options: {
                        overrideOnApply: false
                    }
                });
                
                comp.element.find("input").val("Hello").trigger("keyup");
                expect(comp.prop("value")).toEqual("Hello");
                expect(comp.initialValue).nothing();
                expect(comp.changed()).toBeTrue();

                comp.prop("value", "Hello");
                expect(comp.changed()).toBeTrue();

                comp.destroy();
                
                done();
            });
        });
    });
});