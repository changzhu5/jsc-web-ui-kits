describe("mmNumber => ", function() {
    describe("Properties => ", function() {
        it("default", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNumber"
                });

                expect(comp.prop("value")).toEqual("");
                expect(comp.element.find("input").val()).toEqual("");
                expect(comp.prop("min")).toEqual(0);
                expect(comp.element.find("input").attr("min")).toEqual("0");
                expect(comp.prop("max")).toEqual("");
                expect(comp.element.find("input").attr("max")).toEqual("");
                expect(comp.prop("step")).toEqual(1);
                expect(comp.element.find("input").attr("step")).toEqual("1");
                expect(comp.prop("textAlign")).toEqual("start");
                expect(comp.prop("invalid")).toBeFalse();
                expect(comp.element.find("input").hasClass("is-invalid")).toBeFalse();

                comp.destroy();
                
                done();
            });
        });
        it("value#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNumber",
                    props: {
                        value: 123
                    }
                });
                expect(comp.prop("value")).toEqual(123);
                expect(comp.element.find("input").val()).toEqual("123");

                let e = jQuery.Event("keydown");
                e.which = 13;
                comp.element.find("input").val("456").trigger(e);

                expect(comp.prop("value")).toEqual(456);

                comp.prop('value', 'string');
                expect(comp.prop('value')).toEqual(456);
                expect(comp.prop("invalid")).toBeTrue();

                comp.prop('value', "789");
                expect(comp.prop('value')).toEqual(789);
                expect(comp.prop("invalid")).toBeFalse();

                comp.element.find("input").val("777").trigger("input");
                expect(comp.prop("value")).toEqual(777);
                expect(comp.prop("invalid")).toBeFalse();

                comp.destroy();

                done();
            });
        });
        it("value#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNumber",
                    props: {
                        value: 3.2
                    }
                });

                expect(comp.prop("value")).toEqual(3.2);

                comp.element.find("input").val("4.2").trigger("keydown");
                expect(comp.prop('value')).toEqual(4.2);

                comp.destroy();

                done();
            });
        });
        it("disabled", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNumber",
                    props: {
                        disabled: true
                    }
                });
                
                expect(comp.prop("disabled")).toBeTrue();
                expect(comp.element.find("input").is(":disabled")).toBeTrue();

                comp.prop("disabled", false);

                expect(comp.prop("disabled")).toBeFalse();
                expect(comp.element.find("input").is(":disabled")).toBeFalse();

                comp.destroy();

                done();
            });
        });
        it("readonly", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNumber",
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
        it("min", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNumber",
                    props: {
                        min: 1,
                        value: 1
                    }
                });

                expect(comp.prop("min")).toEqual(1);
                expect(comp.element.find("input").attr("min")).toEqual("1");

                comp.element.find("input").val(0).trigger("keydown");

                expect(comp.prop("value")).toEqual(1);
                expect(comp.prop("invalid")).toBeTrue();
                expect(comp.element.find("input").val()).toEqual("0");

                comp.destroy();

                done();
            });
        });
        it("max", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNumber",
                    props: {
                        max: 9,
                        value: 1
                    }
                });

                expect(comp.prop("max")).toEqual(9);
                expect(comp.element.find("input").attr("max")).toEqual("9");

                comp.element.find("input").val(10).trigger("keydown");

                expect(comp.prop("value")).toEqual(1);
                expect(comp.prop("invalid")).toBeTrue();
                expect(comp.element.find("input").val()).toEqual("10");

                comp.destroy();

                done();
            });
        });
    });
    describe("Events => ", function() {
        it("enter", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNumber",
                    props: {
                        value: 1
                    },
                    on: {
                        enter: function() {
                            expect(this.prop('value')).toEqual(2);
                            comp.destroy();
                            done();
                        }
                    }
                });

                let e = jQuery.Event("keydown");
                e.which = 13;
                comp.element.find("input").val("2").trigger(e);
            });
        });
        it("change#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNumber",
                    props: {
                        value: 1
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual(1);
                            expect(newValue).toEqual(2);

                            comp.destroy();
                            done();
                        }
                    }
                });
                expect(comp.initialValue).toEqual(1);
                comp.prop("value", 2);
                expect(comp.initialValue).toEqual(2);
            });
        });
        it("change#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNumber",
                    props: {
                        value: 1
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual(1);
                            expect(newValue).toEqual(2);

                            comp.destroy();
                            done();
                        }
                    }
                });
                expect(comp.initialValue).toEqual(1);
                comp.element.find("input").val("2").trigger("keydown");
                expect(comp.initialValue).toEqual(2);
            });
        });
    });
});