describe("mmCheckbox => ", function() {
    describe("Properties => ", function() {
        it("value", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmCheckbox"
                });

                expect(comp.prop('value')).toBeFalse();
                expect(comp.element.find("input").is(":checked")).toBeFalse();

                comp.prop("value", true);

                expect(comp.prop('value')).toBeTrue();
                expect(comp.element.find("input").is(":checked")).toBeTrue();

                comp.element.find("input").trigger("click");

                expect(comp.prop('value')).toBeFalse();
                expect(comp.element.find("input").is(":checked")).toBeFalse();

                comp.element.find("input").trigger("click");

                expect(comp.prop('value')).toBeTrue();
                expect(comp.element.find("input").is(":checked")).toBeTrue();

                comp.destroy();

                done();
            });
        });
        it("switch", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: 'mmCheckbox',
                    props: {
                        switch: true
                    }
                });

                expect(comp.element.hasClass("form-switch")).toBeTrue();
                expect(comp.prop('value')).toBeFalse();
                expect(comp.element.find("input").is(":checked")).toBeFalse();

                comp.prop("value", true);

                expect(comp.prop('value')).toBeTrue();
                expect(comp.element.find("input").is(":checked")).toBeTrue();

                comp.element.find("input").trigger("click");

                expect(comp.prop('value')).toBeFalse();
                expect(comp.element.find("input").is(":checked")).toBeFalse();

                comp.element.find("input").trigger("click");

                expect(comp.prop('value')).toBeTrue();
                expect(comp.element.find("input").is(":checked")).toBeTrue();

                comp.destroy();

                done();
            });
        });
        it("label", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmCheckbox",
                    props: {
                        label: "Hello World"
                    }
                });

                expect(comp.prop("label")).toEqual("Hello World");
                expect(comp.element.find("label").length).toEqual(1);
                expect(comp.element.find("label").text().trim()).toEqual("Hello World");

                comp.destroy();

                done();
            });
        });
        it("disabled", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmCheckbox",
                    props: {
                        disabled: true
                    }
                });

                expect(comp.prop('disabled')).toBeTrue();
                expect(comp.element.find("input").is(":disabled")).toBeTrue();

                comp.prop("disabled", false);

                expect(comp.prop('disabled')).toBeFalse();
                expect(comp.element.find("input").is(":disabled")).toBeFalse();

                comp.destroy();

                done();
            });
        });
    });
    describe("Methods => ", function() {
        it("changed()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmCheckbox"
                });

                expect(comp.changed()).toBeFalse();
                comp.scope.value = true;
                expect(comp.changed()).toBeTrue();

                comp.prop("value", true);
                expect(comp.changed()).toBeFalse();

                comp.destroy();

                done();
            });
        });
    });
    describe("Events => ", function() {
        it("change#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmCheckbox",
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toBeFalse();
                            expect(newValue).toBeTrue();

                            comp.destroy();
                            
                            done();
                        }
                    }
                });
                comp.prop("value", true);
            });
        });
        it("change#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmCheckbox",
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toBeFalse();
                            expect(newValue).toBeTrue();

                            comp.destroy();
                            
                            done();
                        }
                    }
                });
                comp.element.find("input").trigger("click");
            });
        });
    });
});