describe("mmDropdown => ", function() {
    describe("Scope => ", function() {
        it("label()#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown"
                });

                expect(comp.scope.label()).toEqual(comp.getScopeVal("placeholder"));
                expect(comp.element.find("button").text().trim()).toEqual(comp.getScopeVal("placeholder"));

                comp.destroy();

                done();
            });
        });
        it("label()#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        value: "item1",
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
                }, jQuery("body"));

                expect(comp.scope.label()).toEqual("Item 1");
                expect(comp.element.find("button").text().trim()).toEqual("Item 1");

                comp.prop('value', "item2");

                expect(comp.scope.label()).toEqual("Item 2");
                expect(comp.element.find("button").text().trim()).toEqual("Item 2");
                
                comp.destroy();
                
                done();
            });
        });
        it("label()#3", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        value: ["item1", "item2"],
                        options: [
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
                        ],
                        multiple: true
                    }
                });

                expect(comp.scope.label()).toEqual("Item 1, Item 2");
                expect(comp.element.find("button").text().trim()).toEqual("Item 1, Item 2");
                
                comp.destroy();
                
                done();
            });
        });
        it("toggle()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        value: "item1",
                        options: [
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
                        ]
                    }
                });
                comp.element.find("button").trigger("click");
                expect(comp.element.find("ul").css("display")).toEqual("block");
                comp.element.find("button").trigger("click");
                expect(comp.element.find("ul").css("display")).toEqual("none");

                comp.destroy();
                
                done();
            });
        });
        it("select()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        value: "item1",
                        options: [
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
                        ]
                    }
                });
                comp.element.find("button").trigger("click");
                comp.element.find("li > a").eq(0).trigger("click");
                expect(comp.element.find("ul").css("display")).toEqual("none");

                comp.prop("multiple", true);

                comp.element.find("button").trigger("click");
                comp.element.find("li > a").eq(0).trigger("click");
                expect(comp.element.find("ul").css("display")).toEqual("block");

                comp.destroy();
                
                done();
            });
        });
        it("clear()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        value: "item4",
                        options: [
                            {
                                label: "Item 4",
                                value: "item4"
                            },
                            {
                                label: "Item 5",
                                value: "item5"
                            },
                            {
                                label: "Item 6",
                                value: "item6"
                            }
                        ]
                    }
                });

                expect(comp.element.find("button > a").length).toEqual(1);
                comp.element.find("button > a").trigger("click");
                expect(comp.prop("value")).toEqual("");
                expect(comp.prop("open")).toBeFalse();

                comp.destroy();
                
                done();
            });
        });
    });
    describe("Properties => ", function() {
        it("options", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    name: "my-dropdown",
                    type: "mmDropdown",
                    props: {
                        options: function() {
                            return new Promise(function(resolve) {
                                resolve([
                                    {
                                        label: 'Item 5',
                                        value: 'item5'
                                    },
                                    {
                                        label: 'Item 6',
                                        value: 'item6'
                                    },
                                    {
                                        label: 'Item 7',
                                        value: 'item7'
                                    }
                                ]);
                                setTimeout(function() {
                                    expect(typeof(comp.prop("options"))).toEqual("function");
                                    expect(comp.getScopeVal("options")).toEqual([
                                        {
                                            label: 'Item 5',
                                            value: 'item5'
                                        },
                                        {
                                            label: 'Item 6',
                                            value: 'item6'
                                        },
                                        {
                                            label: 'Item 7',
                                            value: 'item7'
                                        }
                                    ]);
                                    expect(comp.element.find("li").length).toEqual(3);

                                    comp.destroy();
                                    
                                    done();
                                });
                                
                            });
                        } 
                    }
                });
            });
        });
        it("disabled", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        disabled: true
                    }
                });

                expect(comp.prop("disabled")).toBeTrue();
                expect(comp.element.find("button").hasClass("disabled")).toBeTrue();

                comp.destroy();

                done();
            });
        });
        it("hasCloseButton", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        hasCloseButton: false
                    }
                });

                expect(comp.prop("hasCloseButton")).toBeFalse();
                expect(comp.element.find("button > a").length).toEqual(0);

                comp.destroy();

                done();
            });
        });
    });

    describe("Methods => ", function() {
        it("getSelectedOptions()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        options: [
                            {
                                label: 'Item 1',
                                value: "item1"
                            },
                            {
                                label: 'Item 2',
                                value: "item2"
                            },
                            {
                                label: 'Item 3',
                                value: "item3"
                            }
                        ],
                        value: "item2"
                    }
                });


                expect(comp.getSelectedOptions()).toEqual([
                    {
                        label: 'Item 2',
                        value: "item2"
                    }
                ]);

                comp.props({
                    multiple: true,
                    value: ["item2", "item3"]
                }).apply();

                expect(comp.getSelectedOptions()).toEqual([
                    {
                        label: 'Item 2',
                        value: "item2"
                    },
                    {
                        label: 'Item 3',
                        value: "item3"
                    }
                ]);

                comp.destroy();

                done();
            });
        });
        it("changed()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        options: [
                            {
                                label: 'Item 1',
                                value: "item1"
                            },
                            {
                                label: 'Item 2',
                                value: "item2"
                            },
                            {
                                label: 'Item 3',
                                value: "item3"
                            }
                        ],
                        value: "item2"
                    }
                });

                expect(comp.changed()).toBeFalse();

                comp.setScopeVal("value", ["item3"]);

                expect(comp.changed()).toBeTrue();

                comp.props({
                    multiple: true,
                    value: ["item1", "item2"]
                }).apply();

                expect(comp.changed()).toBeFalse();

                comp.setScopeVal("value", ["item1", "item3"]);
                expect(comp.changed()).toBeTrue();

                comp.setScopeVal("value", ["item1", "item2"]);
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
                    type: "mmDropdown",
                    props: {
                        options: [
                            {
                                label: 'Item 1',
                                value: "item1"
                            },
                            {
                                label: 'Item 2',
                                value: "item2"
                            },
                            {
                                label: 'Item 3',
                                value: "item3"
                            }
                        ],
                        value: "item2"
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual("item2");
                            expect(newValue).toEqual("item3");
                            
                            comp.destroy();

                            done();
                        }
                    }
                });

                comp.prop('value', "item3");
            });
        });
        it("change#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        multiple: true,
                        options: [
                            {
                                label: 'Item 1',
                                value: "item1"
                            },
                            {
                                label: 'Item 2',
                                value: "item2"
                            },
                            {
                                label: 'Item 3',
                                value: "item3"
                            }
                        ],
                        value: ["item1", "item2"]
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual(["item1", "item2"]);
                            expect(newValue).toEqual(["item3"]);

                            comp.destroy();

                            done();
                        }
                    }
                });

                comp.prop('value', ["item3"]);
            });
        });
        it("change#3", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDropdown",
                    props: {
                        options: [
                            {
                                label: 'Item 1',
                                value: "item1"
                            },
                            {
                                label: 'Item 2',
                                value: "item2"
                            },
                            {
                                label: 'Item 3',
                                value: "item3"
                            }
                        ],
                        value: "item2"
                    },
                    on: {
                        change: function(oldValue, newValue) {
                            expect(oldValue).toEqual("item2");
                            expect(newValue).toEqual("item3");

                            comp.destroy();

                            done();
                            
                        }
                    }
                });

                comp.prop('open', true);
                comp.element.find("li > a").eq(2).trigger("click");
            });
        });
    });
});