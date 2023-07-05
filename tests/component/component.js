const template = `<button type="button" class="btn btn-primary {{class}}" {{disabled disabled}} mm-click="this.click(event)">{{text}}</button>`;
const properties = {
    text: {
        label: "Text",
        type: "mmTextfield",
        default: "Click Me"
    },
    disabled: {
        label: "Disabled",
        type: "mmCheckbox",
        default: false
    }
};
const events = {
    click: {
        label: "Click"
    }
};
mimi.define({
    type: "MyButton",
    parent: "mmComponent",
    template: template,
    props: properties,
    events: events
});
describe("BaseComponent => ", function() {
    describe("Static => ", function() {
        it("static.properties()", function(done) {
            mimi.ready(function() {
                const MyComponent1 = mimi.getComponentDef("MyButton");
                const props = MyComponent1.properties();
                expect(props).toEqual({
                    class: {
                        label: "Class",
                        type: "mmTags"
                    },
                    draggable: {
                        label: "Draggable",
                        type: "mmCheckbox",
                        default: false
                    },
                    dragHandler: {
                        label:"Drag handler selector",
                        type: "mmTextfield"
                    },
                    dropable: {
                        label: "Dropable",
                        type: "mmCheckbox",
                        default: false
                    },
                    dropZone: {
                        label:"Drag handler selector",
                        type: "mmTextfield"
                    },
                    dropEffect: {
                        label: "Drop effect",
                        type: "mmDropdown",
                        props: {
                            options: [
                                {
                                    label: "Move",
                                    value: "move"
                                },
                                {
                                    label: "Copy",
                                    value: "copy"
                                },
                                {
                                    label: "Link",
                                    value: "link"
                                }
                            ]
                        },
                        default: "move"
                    },
                    width: {
                        label: "Width",
                        type: "mmTextfield",
                        default: ""
                    },
                    height: {
                        label: "Height",
                        type: "mmTextfield",
                        default: ""
                    },
                    ...properties
                });
                done();
            });
        });
        it("static.events()", function(done) {
            mimi.ready(function() {
                const MyComponent1 = mimi.getComponentDef("MyButton");
                const es = MyComponent1.events();
                expect(es).toEqual({
                    dragover: {
                        label: "Dragover",
                        params: {
                            event: "event"
                        }
                    },
                    drop: {
                        label: "Drop",
                        params: {
                            event: "event"
                        }
                    },
                    move: {
                        label: "Moved",
                        params: {
                            event: "event"
                        }
                    },
                    apply: {
                        label: "Apply"
                    },
                    ...events
                });
                done();
            });
        });
        it("static.template()", function(done) {
            mimi.ready(function() {
                const MyComponent1 = mimi.getComponentDef("MyButton");
                const t = MyComponent1.template();
                expect(t).toEqual(template);
                done();
            });
        });
    });
    
    describe("Inheritance => ", function() {
        it("Inherited from mmComponent", function(done) {
            mimi.ready(function() {
                let obj = mimi.create({
                    type: 'MyButton'
                });

                expect(obj).toBeInstanceOf(mimi.getComponentDef('mmComponent'));
                expect(obj).toBeInstanceOf(window['mmBaseObject']);

                obj.destroy();

                done();
            });
        });
    });

    describe("Functions => ", function() {
        it("apply()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    name: "btn-for-apply",
                    type: "MyButton",
                    props: {
                        disabled: true
                    }
                });
    
                expect(comp.element.attr("disabled")).toEqual("disabled");

                comp.scope.disabled = false;
                comp.apply();
                expect(comp.element.attr("disabled")).toBeUndefined();

                comp.scope.disabled = true;
                comp.apply();
                expect(comp.element.attr("disabled")).toEqual("disabled");

                comp.destroy();
                
                done();
            });
        });
        it("destroy()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyButton",
                    props: {
                        text: "Destroyed"
                    }
                });
                comp.destroy();
                expect(comp.element).toBeUndefined();
                expect(mimi.getComp(comp)).toBeFalse();
                done();
            });
        });
    });
    
    describe("Properties => ", function() { 
        it("default", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyButton"
                });
                expect(comp.element.text().trim()).toEqual("Click Me");
                expect(comp.element.attr('disabled')).toBeUndefined();

                comp.destroy();

                done();
            });
        });
        
        it("prop()#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyButton",
                    props: {
                        class: "text",
                        text: "Hello World"
                    }
                });
                
                expect(comp.prop("class")).toEqual(["text"]);
                expect(comp.prop("text")).toEqual("Hello World");
                expect(comp.getScopeVal("class")).toEqual("text");
                expect(comp.getScopeVal("text")).toEqual("Hello World");
                expect(comp.element.hasClass("text")).toBeTrue();
                expect(comp.element.text().trim()).toEqual("Hello World");

                comp.prop("class", "text2");
                comp.prop("text", "Hao");

                expect(comp.prop("class")).toEqual(["text2"]);
                expect(comp.prop("text")).toEqual("Hao");
                expect(comp.getScopeVal("class")).toEqual("text2");
                expect(comp.getScopeVal("text")).toEqual("Hao");
                expect(comp.element.hasClass("text")).toBeFalse();
                expect(comp.element.hasClass("text2")).toBeTrue();
                expect(comp.element.text().trim()).toEqual("Hao");

                comp.destroy();
                
                done();
            });
        });
        
        it("prop()#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyButton",
                    props: {
                        disabled: 1
                    }
                });

                expect(comp.prop("disabled")).toBeTrue();
                expect(comp.getScopeVal("disabled")).toBeTrue();

                comp.prop("disabled", "false");
                expect(comp.prop('disabled')).toBeFalse();
                expect(comp.getScopeVal("disabled")).toBeFalse();

                comp.prop("disabled", true);
                expect(comp.prop("disabled")).toBeTrue();
                expect(comp.getScopeVal("disabled")).toBeTrue();

                comp.prop('disabled', 0);
                expect(comp.prop('disabled')).toBeFalse();
                expect(comp.getScopeVal("disabled")).toBeFalse();

                comp.destroy();

                done();
            });
        });

        it("prop()#3", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    name: "my-btn-1",
                    type: "MyButton"
                });
                
                expect(comp.prop("class") === "").toBeTrue();

                comp.destroy();

                done();
            });
        });

        it("props()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyButton"
                });
                comp.props({
                    class: "btn-sm",
                    text: "Button"
                }).apply();
                
                expect(comp.prop("class")).toEqual(["btn-sm"]);
                expect(comp.getScopeVal("class")).toEqual("btn-sm");
                expect(comp.prop("text")).toEqual("Button");
                expect(comp.getScopeVal("text")).toEqual("Button");
                expect(comp.element.text().trim()).toEqual("Button");
                expect(comp.element.hasClass("btn-sm")).toBeTrue();

                comp.destroy();

                done();
            });
        });
    });

    describe("Events => ", function() {
        it("click#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "MyButton",
                    on: {
                        click: function() {
                            comp.destroy();
                            done();
                        }
                    }
                });

                comp.trigger("click");
            });
        });
    });
});