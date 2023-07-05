describe("mmContextMenu => ", function() {
    describe("Properties => ", function() {
        it("actions, visible, position", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmContextMenu",
                    props: {
                        actions:[
                            {
                                label: "Item 1",
                                value: "item1",
                                icon: "edit"
                            },
                            {
                                label: "Item 2",
                                value: "item2",
                                icon: "trash"
                            }
                        ],
                        visible: true,
                        position: {
                            left: 10,
                            top: 10
                        }
                    }
                });

                expect(comp.prop("actions")).toEqual([
                    {
                        label: "Item 1",
                        value: "item1",
                        icon: "edit"
                    },
                    {
                        label: "Item 2",
                        value: "item2",
                        icon: "trash"
                    }
                ]);

                expect(comp.element.find("li > a").length).toEqual(2);
                expect(comp.element.find("li > a").eq(0).find("i").hasClass("fa-edit")).toBeTrue();
                expect(comp.element.find("li > a").eq(0).text().trim()).toEqual("Item 1");

                expect(comp.prop("visible")).toBeTrue();
                expect(comp.element.hasClass("show")).toBeTrue();

                expect(comp.prop("position")).toEqual({
                    left: 10,
                    top: 10
                });

                expect(comp.element.css(["left", "top"])).toEqual({
                    left: "10px",
                    top: "10px"
                });

                comp.destroy();

                done();
            });
        });
    });
    describe("Events => ", function() {
        it("click", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmContextMenu",
                    props: {
                        actions:[
                            {
                                label: "Item 1",
                                value: "item1",
                                icon: "edit"
                            },
                            {
                                label: "Item 2",
                                value: "item2",
                                icon: "trash"
                            }
                        ],
                        visible: true
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("item1");
                            expect(this.prop("visible")).toBeFalse();
                            this.destroy();
                            done();
                        }
                    }
                });

                comp.element.find("a").eq(0).trigger("click");
            });
        });
    });
    describe("Methods => ", function() {
        it("open", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmContextMenu",
                    props: {
                        actions: [
                            {
                                label: "Item 3",
                                value: "item3"
                            },
                            {
                                label: "Item 4",
                                value: "item4"
                            }
                        ]
                    }
                });

                let e = jQuery.Event("click");
                e.clientX = 10;
                e.clientY = 10;

                expect(comp.prop("visible")).toBeFalse();

                comp.open(e);

                expect(comp.prop("visible")).toBeTrue();

                done();
            });
        });
    });
});