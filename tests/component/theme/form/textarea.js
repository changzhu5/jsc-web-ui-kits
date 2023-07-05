describe("mmTextarea => ", function() {
    describe("Properties => ", function() {
        it("value", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextarea",
                    props: {
                        value: "Hello World"
                    }
                });

                expect(comp.prop('value')).toEqual("Hello World");
                expect(comp.element.text().trim()).toEqual("Hello World");

                comp.prop("value", "Hello\nWorld");
                expect(comp.prop('value')).toEqual("Hello\nWorld");
                expect(comp.element.text().trim()).toEqual("Hello\nWorld");

                comp.element.val("typing...").trigger("keyup");
                expect(comp.prop("value")).toEqual("typing...");

                comp.destroy();

                done();
            });
        });
        it("rows", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextarea",
                    props: {
                        rows: 10
                    }
                });

                expect(comp.prop('rows')).toEqual(10);
                expect(comp.element.attr("rows")).toEqual("10");

                comp.prop("rows", 20);
                expect(comp.prop('rows')).toEqual(20);
                expect(comp.element.attr("rows")).toEqual("20");

                comp.destroy();

                done();
            });
        });
        it("disabled", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextarea",
                    props: {
                        disabled: true
                    }
                });
                
                expect(comp.prop("disabled")).toBeTrue();
                expect(comp.element.is(":disabled")).toBeTrue();

                comp.prop("disabled", false);

                expect(comp.prop("disabled")).toBeFalse();
                expect(comp.element.is(":disabled")).toBeFalse();

                comp.destroy();

                done();
            });
        });
        it("readonly", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextarea",
                    props: {
                        readonly: true
                    }
                });
                
                expect(comp.prop("readonly")).toBeTrue();
                expect(comp.element.is("[readonly]")).toBeTrue();

                comp.prop("readonly", false);

                expect(comp.prop("readonly")).toBeFalse();
                expect(comp.element.is("[readonly]")).toBeFalse();

                comp.destroy();
                
                done();
            });
        });
    });
    describe("Events => ", function() {
        it('change#1', function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextarea",
                    props: {
                        value: "Hi"
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual("Hi");
                            expect(newValue).toEqual("Hello");
                            comp.destroy();
                            done();
                        }
                    }
                });
                expect(comp.changed()).toBeFalse();
                comp.prop("value", "Hello");
            });
        });
        it('change#2', function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTextarea",
                    props: {
                        value: "Hi"
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual("Hi");
                            expect(newValue).toEqual("Hello");
                            comp.destroy();
                            done();
                        }
                    }
                });
                comp.element.val("Hello").trigger("keyup");
            });
        });
    });
});