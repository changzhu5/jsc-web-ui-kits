describe("mmTags => ", function() {
    describe("Properties => ", function() {
        it("value#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTags"
                });

                let e = jQuery.Event("keydown");
                e.which = 13;
                comp.element.find("input").val("Hello").trigger(e);
                e = jQuery.Event("keydown");
                e.which = 13;
                comp.element.find("input").val("World").trigger(e);

                expect(comp.prop('value')).toEqual(["Hello", "World"]);
                expect(comp.element.find('span.badge').length).toEqual(2);

                comp.destroy();
                
                done();
            });
        });
        it("value#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTags",
                    props: {
                        value: ["Hello", "World"]
                    }
                });

                expect(comp.prop("value")).toEqual(["Hello", "World"]);
                expect(comp.element.find('span.badge').length).toEqual(2);

                comp.prop('value', ["Hello"]);

                expect(comp.prop("value")).toEqual(["Hello"]);
                expect(comp.element.find('span.badge').length).toEqual(1);

                comp.destroy();

                done();
            });
        });
        it("value#3", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTags",
                    props: {
                        value: ["Hello", "World"]
                    }
                });

                comp.element.find("span.badge > a").eq(1).trigger("click");

                expect(comp.prop('value')).toEqual(["Hello"]);
                expect(comp.element.find('span.badge').length).toEqual(1);

                comp.destroy();

                done();
            });
        });
    });
    describe("Events => ", function() {
        it("add", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTags",
                    on: {
                        add: function() {
                            comp.destroy();
                            done();
                        }
                    }
                });
                let e = jQuery.Event("keydown");
                e.which = 13;
                comp.element.find("input").val("Hello").trigger(e);
            });
        });
        it("remove", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTags",
                    props: {
                        value: ["Hello", "World"]
                    },
                    on: {
                        remove: function() {
                            comp.destroy();
                            done();
                        }
                    }
                });
                comp.element.find("span.badge > a").eq(1).trigger("click");
            });
        });
        it("change#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTags",
                    props: {
                        value: ["Hello"]
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual(["Hello"]);
                            expect(newValue).toEqual(["Hello", "World"]);
                            comp.destroy();
                            done();
                        }
                    }
                });
                comp.prop("value", ["Hello", "World"])
            });
        });
        it("change#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTags",
                    props: {
                        value: ["Hello"]
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual(["Hello"]);
                            expect(newValue).toEqual(["Hello", "World"]);
                            this.destroy();
                            done();
                        }
                    }
                });

                expect(comp.initialValue).toEqual(["Hello"]);
                let e = jQuery.Event("keydown");
                e.which = 13;
                comp.element.find("input").val("World").trigger(e);
            });
        });
        it("change#3", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTags",
                    props: {
                        value: ["Hello", "World"]
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual(["Hello", "World"]);
                            expect(newValue).toEqual(["Hello"]);
                            this.destroy();
                            done();
                        }
                    }
                });

                expect(comp.initialValue).toEqual(["Hello", "World"]);
                comp.element.find("span.badge > a").eq(1).trigger("click");
            });
        });
    });
});