describe("App => ", function() {
    mimi.onConfig = function() {
        this.setValue({
            foo: "bar",
            school: {
                name: "Hello World"
            }
        });
    }
    it("ready()", function(done) {
        mimi.ready(function() {
            done();
        });
    });

    it("registerComponentDef()", function(done) {
        expect(typeof(mimi.getComponentDef("mmComponent"))).toEqual("function");

        done();
    });

    it("registerAttributeDef()", function(done) {
        expect(mimi.getAttributeDefs().has("mm-click")).toBeTrue();
        expect(typeof(mimi.getAttributeDef("mm-click"))).toEqual("function");
        
        done();
    });

    it("define()", function(done) {
        const MyComponent = mimi.define({
            type: "MyComponent",
            parent: "mmComponent",
            template: `<div>My Component</div>`,
            props: {
                text: {
                    label: "Text"
                }
            }
        });
        
        expect(MyComponent.template()).toEqual(`<div>My Component</div>`);
        expect(MyComponent.properties()).toEqual({
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
            text: {
                label: "Text"
            }
        });

        done();
    });

    it("create()", function(done) {
        mimi.ready(function() {
            let comp = mimi.create({
                type: "mmComponent"
            });
            
            expect(comp).toBeInstanceOf(mimi.getComponentDef("mmComponent"));
            expect(comp).not.toBeInstanceOf(mimi.getComponentDef("MyComponent"));

            comp.destroy();

            comp = mimi.create({
                type: "MyComponent"
            });

            expect(comp).toBeInstanceOf(mimi.getComponentDef("mmComponent"));
            expect(comp).toBeInstanceOf(mimi.getComponentDef("MyComponent"));
            expect(comp).toBeInstanceOf(window["mmBaseObject"]);

            comp.destroy();
    
            done();
        });
    });

    it("component()", function(done) {
        mimi.ready(function() {
            let c = mimi.create({
                name: "my-comp-1",
                type: "mmComponent"
            });
            expect(mimi.component("my-comp-1", "mmComponent") === c).toBeTrue();

            c.destroy();

            done();
        });
    });

    it("option()", function(done) {
        expect(mimi.option("foo")).toEqual("bar");
        expect(mimi.option("school")).toEqual({
            name: "Hello World"
        });
        expect(mimi.option("school=>name")).toEqual("Hello World");

        mimi.option("foo", "barr");
        expect(mimi.option("foo")).toEqual("barr");
        done();
    });

    it("getCompSelectOptions()", function(done) {
        let options = mimi.getCompSelectOptions();
        expect(options.length >= 1).toBeTrue();
        done();
    });
});