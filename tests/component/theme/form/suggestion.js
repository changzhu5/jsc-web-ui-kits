describe("mmSuggestion => ", function() {
    describe("Properties => ", function() {
        it("query", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmSuggestion",
                    props: {
                        query: function() {
                            return new Promise(function(resolve) {
                                resolve([
                                    {
                                        label: "Item 1",
                                        value: "item1"
                                    },
                                    {
                                        label: "Item 2",
                                        value: "item2"
                                    },
                                    {
                                        label: "Item 3",
                                        value: "item3"
                                    }
                                ]);
                            });
                        }
                    }
                });

                comp.element.find("input").val("a").trigger("keydown");
                setTimeout(function() {
                    expect(comp.scope.options).toEqual([
                        {
                            label: "Item 1",
                            value: "item1"
                        },
                        {
                            label: "Item 2",
                            value: "item2"
                        },
                        {
                            label: "Item 3",
                            value: "item3"
                        }
                    ]);
                    expect(comp.element.find("ul").css('display')).toEqual("block");

                    let e = jQuery.Event("keydown");
                    e.which = 40;
                    comp.element.find("input").trigger(e);
                    comp.element.find("input").trigger(e);
                    expect(comp.element.find("ul").css('display')).toEqual("block");

                    e.which = 13;
                    comp.element.find("input").trigger(e);

                    expect(comp.scope.label).toEqual("Item 2");
                    expect(comp.scope.value).toEqual("item2");
                    expect(comp.prop('value')).toEqual({
                        label: "Item 2",
                        value: "item2"
                    });
                    expect(comp.element.find("ul").css('display')).toEqual("none");

                    comp.destroy();

                    done();
                }, 500);
            });
        });
        it("value", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmSuggestion",
                    props: {
                        value: {
                            value: "item2",
                            label: "Item 2"
                        }
                    }
                });

                expect(comp.prop("value")).toEqual({
                    value: "item2",
                    label: "Item 2"
                });
                expect(comp.element.find("input").val().trim()).toEqual("Item 2");

                comp.destroy();

                done();
            });
        });
        it("placeholder", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmSuggestion",
                    props: {
                        placeholder: "Select"
                    }
                });
                expect(comp.element.find("input").attr("placeholder")).toEqual("Select");

                comp.destroy();

                done();
            });
        });
    });

    describe("Events => ", function() {
        it("change#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmSuggestion",
                    props: {
                        value: {
                            value: "item1",
                            label: "Item 1"
                        }
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual({
                                value: "item1",
                                label: "Item 1"
                            });
                            expect(newValue).toEqual({
                                value: "item2",
                                label: 'Item 2'
                            });
                            this.destroy();
                            done();
                        }
                    }
                });

                expect(comp.changed()).toBeFalse();

                comp.prop("value", {
                    value: "item2",
                    label: 'Item 2'
                });

                expect(comp.changed()).toBeFalse();
            });
        });

        it("change#2", function(done) {
            let comp = mimi.create({
                type: "mmSuggestion",
                props: {
                    query: function() {
                        return new Promise(function(resolve) {
                            resolve([
                                {
                                    label: "Item 1",
                                    value: "item1"
                                },
                                {
                                    label: "Item 2",
                                    value: "item2"
                                },
                                {
                                    label: "Item 3",
                                    value: "item3"
                                }
                            ]);
                        });
                    }
                },
                on: {
                    change: function(oldValue, newValue) {
                        expect(oldValue).toEqual("");
                        expect(newValue).toEqual({
                            value: "item2",
                            label: "Item 2"
                        });

                        this.destroy();

                        done();
                    }
                }
            });

            comp.element.find("input").val("a").trigger("keydown");
            setTimeout(function() {

                let e = jQuery.Event("keydown");
                e.which = 40;
                comp.element.find("input").trigger(e);
                comp.element.find("input").trigger(e);

                e.which = 13;
                comp.element.find("input").trigger(e);
            }, 500);
        });
    });
});