mimi.define({
    type: "MyLabel",
    parent: "mmComponent",
    template: `<label class="{{class}}">{{text}}</label>`,
    props: {
        text: {
            label: "Text",
            type: "mmTextfield"
        }
    }
});
mimi.define({
    type: "MyLayoutMgr",
    parent: "mmLayout",
    template: `
        <div class="row">
            {{#each components}}
            <div class="col-sm-3">
                <mm-component name="{{this.comp.name}}" type="{{this.comp.type}}">
            </div>
            {{/each}}
        </div>
    `
});
describe("BaseLayout ==> ", function() {
    describe("General => ", function() {
        it("Inheritance", function(done) {
            mimi.ready(function() {
                let c = mimi.create({
                    type: "MyLayoutMgr"
                });
                expect(c).toBeInstanceOf(mimi.getComponentDef("MyLayoutMgr"));
                expect(c).toBeInstanceOf(mimi.getComponentDef("mmLayout"));
                expect(c).toBeInstanceOf(mimi.getComponentDef("mmComponent"));
                expect(c).toBeInstanceOf(window.mmBaseObject);

                c.destroy();

                done();
            });
        });
    });
    
    describe("Properties => ", function() {
        it("components", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    name: "my-layout-mgr",
                    type: "MyLayoutMgr",
                    props: {
                        components: [
                            {
                                comp: {
                                    name: "my-label-1",
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 1"
                                    }
                                }
                            },
                            {
                                comp: {
                                    name: "my-label-2",
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 2"
                                    }
                                }
                            },
                            {
                                comp: {
                                    name: "my-label-3",
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 3"
                                    }
                                }
                            }
                        ]
                    }
                });
                let components = comp.prop("components");
                
                expect(components).toEqual([
                    {
                        comp: {
                            name: 'my-label-1',
                            type: "MyLabel"
                        },
                        option: ''
                    },
                    {
                        comp: {
                            name: 'my-label-2',
                            type: "MyLabel"
                        },
                        option: ''
                    },
                    {
                        comp: {
                            name: 'my-label-3',
                            type: "MyLabel"
                        },
                        option: ''
                    }
                ]);

                expect(comp.find("MyLabel").length).toEqual(3);

                comp.find("MyLabel").forEach(function(c, index) {
                    expect(c.parent === comp).toBeTrue();
                    expect(c.prop('text')).toEqual(`Label ${index + 1}`);
                });

                comp.destroy();
                
                done();
            });
        });
    });

    describe("Methods => ", function() {
        it("getComponentList()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyLayoutMgr",
                    props: {
                        components: [
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 1"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 2"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 3"
                                    }
                                }
                            }
                        ]
                    }
                });

                let list = comp.getComponentList();

                expect(list.length).toEqual(3);
                list.forEach(function(c, index) {
                    expect(c.parent === comp).toBeTrue();
                    expect(c.prop("text")).toEqual(`Label ${index + 1}`);
                });

                comp.destroy();

                done();
            });
        });
        it("get()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyLayoutMgr",
                    props: {
                        components: [
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 1"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 2"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 3"
                                    }
                                }
                            }
                        ]
                    }
                });

                let list = comp.getComponentList();

                expect(list[0] === comp.get(0)).toBeTrue();
                expect(list[1] === comp.get(1)).toBeTrue();

                comp.destroy();

                done();
            });
        });
        it("empty()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyLayoutMgr",
                    props: {
                        components: [
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 1"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 2"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 3"
                                    }
                                }
                            }
                        ]
                    }
                });

                let list = comp.getComponentList();

                comp.empty();

                expect(comp.getComponentList().length).toEqual(0);
                list.forEach(function(c) {
                    expect(c.element).toBeUndefined();
                    expect(mimi.component(c.name, c.type)).toBeFalse();
                });

                comp.destroy();

                done();
            });
        });
        it("destroy()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyLayoutMgr",
                    props: {
                        components: [
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 1"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 2"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 3"
                                    }
                                }
                            }
                        ]
                    }
                });
                comp.destroy();

                expect(comp.element).toBeUndefined();
                expect(comp.getComponentList().length).toEqual(0);
                expect(mimi.component(comp.name, comp.type)).toBeFalse();

                done();
            });
        });
        it("add()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyLayoutMgr"
                });

                comp.add(mimi.create({
                    type: "MyLabel",
                    props: {
                        text: "Label 1"
                    }
                }));

                comp.add(mimi.create({
                    type: "MyLabel",
                    props: {
                        text: "Label 2"
                    }
                }));

                comp.add(mimi.create({
                    type: "MyLabel",
                    props: {
                        text: "Label 3"
                    }
                }));

                let list = comp.getComponentList();

                expect(list.length).toEqual(3);

                list.forEach(function(c, index) {
                    expect(c.parent === comp).toBeTrue();
                    expect(c.prop("text")).toEqual(`Label ${index + 1}`);
                });

                comp.destroy();

                done();
            });
        });
        it("drop()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyLayoutMgr",
                    props: {
                        components: [
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 4"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 5"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 6"
                                    }
                                }
                            }
                        ]
                    }
                });

                let label = mimi.create({
                    type: "MyLabel",
                    props: {
                        text: "Label 7"
                    }
                });

                comp.drop(label, 0);

                let list = comp.getComponentList();
                expect(list.length).toEqual(4);
                expect(list[0].prop("text")).toEqual("Label 7");
                expect(list[1].prop("text")).toEqual("Label 4");
                expect(list[2].prop("text")).toEqual("Label 5");
                expect(list[3].prop("text")).toEqual("Label 6");
                expect(label.parent === comp).toBeTrue();

                comp.drop(label, 3);

                list = comp.getComponentList();
                expect(list.length).toEqual(4);
                expect(list[0].prop("text")).toEqual("Label 4");
                expect(list[1].prop("text")).toEqual("Label 5");
                expect(list[2].prop("text")).toEqual("Label 7");
                expect(list[3].prop("text")).toEqual("Label 6");
                expect(label.parent === comp).toBeTrue();

                comp.drop(label, 2);

                list = comp.getComponentList();
                expect(list.length).toEqual(4);
                expect(list[0].prop("text")).toEqual("Label 4");
                expect(list[1].prop("text")).toEqual("Label 5");
                expect(list[2].prop("text")).toEqual("Label 7");
                expect(list[3].prop("text")).toEqual("Label 6");
                expect(label.parent === comp).toBeTrue();

                comp.drop(label, 1);

                list = comp.getComponentList();
                expect(list.length).toEqual(4);
                expect(list[0].prop("text")).toEqual("Label 4");
                expect(list[1].prop("text")).toEqual("Label 7");
                expect(list[2].prop("text")).toEqual("Label 5");
                expect(list[3].prop("text")).toEqual("Label 6");
                expect(label.parent === comp).toBeTrue();

                comp.drop(label, 4);

                list = comp.getComponentList();
                expect(list.length).toEqual(4);
                expect(list[0].prop("text")).toEqual("Label 4");
                expect(list[1].prop("text")).toEqual("Label 5");
                expect(list[2].prop("text")).toEqual("Label 6");
                expect(list[3].prop("text")).toEqual("Label 7");
                expect(label.parent === comp).toBeTrue();

                comp.destroy();

                done();
            });
        });
        it("eject()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyLayoutMgr",
                    props: {
                        components: [
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 8"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 9"
                                    }
                                }
                            },
                            {
                                comp: {
                                    type: "MyLabel",
                                    props: {
                                        text: "Label 10"
                                    }
                                }
                            }
                        ]
                    }
                });

                let list = comp.getComponentList();
                comp.eject(list[2], true);

                list = comp.getComponentList();
                expect(list.length).toEqual(2);
                expect(list[0].prop("text")).toEqual("Label 8");
                expect(list[1].prop("text")).toEqual("Label 9");

                let c = comp.eject(list[0]);
                list = comp.getComponentList();
                expect(list.length).toEqual(1);
                expect(list[0].prop("text")).toEqual("Label 9");
                expect(mimi.component(c.name, c.type)).not.toBeFalse();
                expect(c.element).not.toBeUndefined();
                expect(c.parent).toBeNull();

                comp.destroy();
                c.destroy();

                done();
            });
        });
    });
});