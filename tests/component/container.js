mimi.define({
    type: "MyContent",
    parent: "mmComponent",
    template: `
        <div class="w-100 {{class}}">{{{content}}}</div>
    `,
    props: {
        content: {
            label: "Content"
        }
    }
});
mimi.define({
    type: "MyContainer",
    parent: "mmContainer",
    template: `
        <div class="row">
            {{#if data.error}}
            <div class="alert alert-warning">{{data.error}}</div>
            {{/if}}
            <div class="col-sm-12">
                {{#if components.top}}
                <mm-component name="{{components.top.name}}" type="{{components.top.type}}">
                {{/if}}
            </div>
            <div class="col-sm-3">
                {{#if components.left}}
                <mm-component name="{{components.left.name}}" type="{{components.left.type}}">
                {{/if}}
            </div>
            <div class="col-sm-6">
                {{#if components.middle}}
                <mm-component name="{{components.middle.name}}" type="{{components.middle.type}}">
                {{/if}}
            </div>
            <div class="col-sm-3">
                {{#if components.right}}
                <mm-component name="{{components.right.name}}" type="{{components.right.type}}">
                {{/if}}
            </div>
            <div class="col-sm-12">
                {{#if components.bottom}}
                <mm-component name="{{components.bottom.name}}" type="{{components.bottom.type}}">
                {{/if}}
            </div>
        </div>
    `
});
describe("BaseContainer => ", function() {
    describe("Static ==> ", function() {
        it("properties()", function(done) {
            let props = mimi.getComponentDef("mmComponent").properties();
            props["components"] = {
                label: "Components",
                type: "mmCodeEditor",
                priority: 20
            };

            expect(mimi.getComponentDef("MyContainer").properties()).toEqual(props);

            done();
        });
    });
    describe("Properties() => ", function() {
        it("components", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyContainer",
                    props: {
                        components: {
                            top: {
                                type: "MyContent",
                                props: {
                                    content: "Top Content",
                                    class: "text-center"
                                }
                            },
                            left: {
                                type: "MyContent",
                                props: {
                                    content: "Left Content"
                                }
                            },
                            middle: {
                                type: "MyContent",
                                props: {
                                    content: "Middle Content"
                                }
                            },
                            right: {
                                type: "MyContent",
                                props: {
                                    content: "Right Content"
                                }
                            },
                            bottom: {
                                type: "MyContent",
                                props: {
                                    content: "Bottom Content",
                                    class: "text-center"
                                }
                            }
                        }
                    }
                });

                let comps = comp.prop("components");
                let list = comp.find("MyContent");
                
                expect(list.length).toEqual(5);
                expect(comps).toEqual({
                    top: {
                        name: list[0].name,
                        type: "MyContent"
                    },
                    left: {
                        name: list[1].name,
                        type: "MyContent"
                    },
                    middle: {
                        name: list[2].name,
                        type: "MyContent"
                    },
                    right: {
                        name: list[3].name,
                        type: "MyContent"
                    },
                    bottom: {
                        name: list[4].name,
                        type: "MyContent"
                    }
                });

                comp.destroy();

                done();
            });
        });
    });

    describe("Methods => ", function() {
        it("get()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyContainer",
                    props: {
                        components: {
                            left: {
                                type: "MyContent",
                                props: {
                                    content: "Left Content"
                                }
                            },
                            middle: {
                                type: "MyContent",
                                props: {
                                    content: "Middle Content"
                                }
                            },
                            right: {
                                type: "MyContent",
                                props: {
                                    content: "Right Content"
                                }
                            }
                        }
                    }
                });

                expect(comp.get("left").prop("content")).toEqual("Left Content");
                expect(comp.get("middle").prop("content")).toEqual("Middle Content");
                expect(comp.get("right").prop("content")).toEqual("Right Content");

                comp.destroy();

                done();
            });
        });
        it("add()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyContainer",
                    props: {
                        components: {
                            left: {
                                type: "MyContent",
                                props: {
                                    content: "Left Content"
                                }
                            },
                            middle: {
                                type: "MyContent",
                                props: {
                                    content: "Middle Content"
                                }
                            },
                            right: {
                                type: "MyContent",
                                props: {
                                    content: "Right Content"
                                }
                            }
                        }
                    }
                });

                let cTop = mimi.create({
                    type: "MyContent",
                    props: {
                        content: "Top Content"
                    }
                });

                let cBottom = mimi.create({
                    type: "MyContent",
                    props: {
                        content: "Bottom Content"
                    }
                });

                expect(comp.get("top")).toBeNull();
                comp.add(cTop, "top");
                expect(comp.get("top").prop("content")).toEqual("Top Content");
                comp.add(cBottom, "top", false);
                expect(comp.get("top").prop("content")).toEqual("Top Content");
                expect(comp.get("bottom")).toBeNull();
                comp.add(cBottom, "bottom");
                expect(comp.get("bottom").prop("content")).toEqual("Bottom Content");

                comp.destroy();

                done();
            });
        });
        it("bulkAdd()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyContainer"
                });
                comp.bulkAdd({
                    top: mimi.create({
                        name: "bulk-add-content-top",
                        type: "MyContent",
                        props: {
                            content: "Top Content"
                        }
                    }),
                    bottom: mimi.create({
                        name: "bulk-add-content-bottom",
                        type: "MyContent",
                        props: {
                            content: "Bottom Content"
                        }
                    })
                });

                expect(comp.prop("components")).toEqual({
                    top: {
                        name: "bulk-add-content-top",
                        type: "MyContent"
                    },
                    bottom: {
                        name: "bulk-add-content-bottom",
                        type: "MyContent"
                    }
                });

                comp.destroy();

                done();
            });
        });
        it("eject()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyContainer"
                });
                let tContent = mimi.create({
                    type: "MyContent",
                    props: {
                        content: "Top Content"
                    }
                });
                let bContent = mimi.create({
                    type: "MyContent",
                    props: {
                        content: "Bottom Content"
                    }
                });
                comp.add(tContent, "top");
                comp.add(bContent, "bottom");
                expect(comp.prop("components")).toEqual({
                    top: {
                        name: tContent.name,
                        type: tContent.type
                    },
                    bottom: {
                        name: bContent.name,
                        type: bContent.type
                    }
                });
                comp.eject(tContent);
                expect(comp.prop("components")).toEqual({
                    bottom: {
                        name: bContent.name,
                        type: bContent.type
                    }
                });
                expect(tContent.element).not.toBeUndefined();
                comp.eject(bContent, true);
                expect(comp.prop("components")).toEqual({});
                expect(bContent.element).toBeUndefined();
                expect(mimi.component(bContent.name, bContent.type)).toBeFalse();

                comp.destroy();
                tContent.destroy();

                done();
            });
        });
        it("getComponentMap()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyContainer",
                    props: {
                        components: {
                            left: {
                                type: "MyContent",
                                props: {
                                    content: "Left Content"
                                }
                            },
                            middle: {
                                type: "MyContent",
                                props: {
                                    content: "Middle Content"
                                }
                            },
                            right: {
                                type: "MyContent",
                                props: {
                                    content: "Right Content"
                                }
                            }
                        }
                    }
                });
                let map = comp.getComponentMap();
                expect(map).toEqual({
                    left: comp.get("left"),
                    middle: comp.get("middle"),
                    right: comp.get("right")
                });

                comp.destroy();

                done();
            });
        });
        it("empty()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyContainer",
                    props: {
                        components: {
                            left: {
                                type: "MyContent",
                                props: {
                                    content: "Left Content"
                                }
                            },
                            middle: {
                                type: "MyContent",
                                props: {
                                    content: "Middle Content"
                                }
                            },
                            right: {
                                type: "MyContent",
                                props: {
                                    content: "Right Content"
                                }
                            }
                        }
                    }
                });

                let tContent = mimi.create({
                    type: "MyContent",
                    props: {
                        content: "Top Content"
                    }
                });

                comp.empty();

                expect(comp.prop("components")).toEqual({});
                comp.add(tContent, "top");
                expect(comp.prop("components")).toEqual({
                    top: {
                        name: tContent.name,
                        type: tContent.type
                    }
                });

                comp.destroy();

                done();
            });
        });
    });
    describe("More => ", function() {
        it("Events", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyContainer",
                    props: {
                        components: {
                            left: {
                                type: "MyContent",
                                props: {
                                    content: "Left Content"
                                }
                            },
                            middle: {
                                type: "MyContent",
                                props: {
                                    content: "Middle Content"
                                }
                            },
                            right: {
                                type: "MyContent",
                                props: {
                                    content: "Right Content"
                                }
                            }
                        }
                    }
                });

                let tContent = mimi.create({
                    type: "mmButton",
                    props: {
                        label: "Top Content"
                    },
                    on: {
                        click: function() {
                            this.clicked = true;
                        }
                    }
                });

                let tContent2 = mimi.create({
                    type: "mmButton",
                    props: {
                        label: "Top Content 2"
                    },
                    on: {
                        click: function() {
                            this.clicked = true;
                        }
                    }
                });

                comp.add(tContent, 'top');
                comp.element.find("button").trigger("click");
                expect(tContent.clicked).toBeTrue();
                comp.add(tContent2, 'top');
                comp.element.find("button").trigger("click");
                expect(tContent2.clicked).toBeTrue();

                comp.destroy();
                done();
            });
        });
    });
});