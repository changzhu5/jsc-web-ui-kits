describe("mmHeading => ", function() {
    describe("Properties => ", function() {
        it("size", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmHeading",
                    props: {
                        size: 1,
                        label: "Heading 1"
                    }
                });
                expect(comp.prop('size')).toEqual(1);
                expect(comp.element.find('h1').length).toEqual(1);
                comp.prop("size", 3);
                expect(comp.prop('size')).toEqual(3);
                expect(comp.element.find('h1').length).toEqual(0);
                expect(comp.element.find('h3').length).toEqual(1);

                comp.destroy();
                done();
            });
        });
        it("label", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmHeading",
                    props: {
                        size: 3,
                        label: "Heading3"
                    }
                });
                expect(comp.prop("label")).toEqual("Heading3");
                expect(comp.element.find("h3").text().trim()).toEqual("Heading3");
                comp.prop("label", "Heading33");
                expect(comp.prop("label")).toEqual("Heading33");
                expect(comp.element.find("h3").text().trim()).toEqual("Heading33");
                comp.destroy();
                done();
            });
        });
        it("badge", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmHeading",
                    props: {
                        label: "Heading",
                        badge: {
                            label: "44",
                            type: "danger"
                        }
                    }
                });
                expect(comp.prop("badge")).toEqual({
                    label: "44",
                    type: "danger"
                });
                expect(comp.element.find('span.badge').text().trim()).toEqual("44");
                expect(comp.element.find("span.badge").hasClass("bg-danger")).toBeTrue();
                comp.prop("badge", {
                    label: "33",
                    type: "primary"
                });
                expect(comp.element.find('span.badge').text().trim()).toEqual("33");
                expect(comp.element.find("span.badge").hasClass("bg-primary")).toBeTrue();
                comp.destroy();
                done();
            });
        });
        it("description", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmHeading",
                    props: {
                        label: "Heading",
                        description: "Hello <b>World</b>"
                    }
                });
                expect(comp.prop('description')).toEqual("Hello <b>World</b>");
                expect(comp.element.find("small").html()).toEqual("Hello <b>World</b>");
                comp.destroy();
                done();
            });
        });
        it("icon", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmHeading",
                    props: {
                        label: "Heading",
                        icon: "edit"
                    }
                });
                expect(comp.prop("icon")).toEqual("edit");
                expect(comp.element.find("i").hasClass("fa-edit")).toBeTrue();
                comp.prop("icon", "trash");
                expect(comp.prop("icon")).toEqual("trash");
                expect(comp.element.find("i").hasClass("fa-trash")).toBeTrue();
                comp.destroy();
                done();
            });
        });
    });
});