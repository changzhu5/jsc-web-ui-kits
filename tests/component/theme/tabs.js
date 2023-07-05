describe("mmTabs => ", function() {
    describe("Properties => ", function() {
        it("tabs, active", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTabs",
                    props: {
                        active: "edit",
                        tabs: [
                            {
                                value: "edit",
                                icon: "edit",
                                label: "Edit",
                                content: "Hello World"
                            },
                            {
                                value: "trash",
                                icon: "trash",
                                label: "Trash",
                                badge: {
                                    label: 10
                                }
                            }
                        ]
                    }
                });

                expect(comp.prop("active")).toEqual("edit");
                expect(comp.prop("tabs")).toEqual([
                    {
                        value: "edit",
                        icon: "edit",
                        label: "Edit",
                        content: "Hello World"
                    },
                    {
                        value: "trash",
                        icon: "trash",
                        label: "Trash",
                        badge: {
                            label: 10
                        }
                    }
                ]);
                expect(comp.element.find("ul a.nav-link").eq(0).hasClass("active")).toBeTrue();
                expect(comp.element.find("ul a.nav-link").eq(1).hasClass("active")).toBeFalse();
                expect(comp.element.find(".tab-pane").eq(0).hasClass("active")).toBeTrue();
                expect(comp.element.find(".tab-pane").eq(1).hasClass("active")).toBeFalse();

                comp.prop("active", "trash");

                expect(comp.element.find("ul a.nav-link").eq(0).hasClass("active")).toBeFalse();
                expect(comp.element.find("ul a.nav-link").eq(1).hasClass("active")).toBeTrue();
                expect(comp.element.find(".tab-pane").eq(0).hasClass("active")).toBeFalse();
                expect(comp.element.find(".tab-pane").eq(1).hasClass("active")).toBeTrue();

                comp.prop("tabs", [
                    {
                        value: "edit",
                        icon: "edit",
                        label: "Edit",
                        content: "Hello World"
                    },
                    {
                        value: "trash",
                        icon: "trash",
                        label: "Trash",
                        badge: {
                            label: 10
                        }
                    },
                    {
                        value: "setting",
                        icon: "cogs",
                        label: "Setting",
                        content: "Setting here"
                    }
                ]);

                expect(comp.prop("tabs")).toEqual([
                    {
                        value: "edit",
                        icon: "edit",
                        label: "Edit",
                        content: "Hello World"
                    },
                    {
                        value: "trash",
                        icon: "trash",
                        label: "Trash",
                        badge: {
                            label: 10
                        }
                    },
                    {
                        value: "setting",
                        icon: "cogs",
                        label: "Setting",
                        content: "Setting here"
                    }
                ]);

                expect(comp.element.find("a.nav-link").length).toEqual(3);
                
                let compMap = comp.getComponentMap();
                expect(Object.keys(compMap)).toEqual(["edit", "trash", "setting"]);

                comp.destroy();

                done();
            });
        });
    });
    describe("Scope => ", function() {
        it("click()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTabs",
                    props: {
                        active: "edit",
                        tabs: [
                            {
                                value: "edit",
                                icon: "edit",
                                label: "Edit",
                                content: "Hello World"
                            },
                            {
                                value: "trash",
                                icon: "trash",
                                label: "Trash",
                                badge: {
                                    label: 10
                                }
                            }
                        ]
                    }
                });

                comp.element.find("a.nav-link").eq(1).trigger('click');
                expect(comp.element.find("ul a.nav-link").eq(0).hasClass("active")).toBeFalse();
                expect(comp.element.find("ul a.nav-link").eq(1).hasClass("active")).toBeTrue();
                expect(comp.element.find(".tab-pane").eq(0).hasClass("active")).toBeFalse();
                expect(comp.element.find(".tab-pane").eq(1).hasClass("active")).toBeTrue();

                comp.destroy();

                done();
            });
        });
    });
    describe("Events => ", function() {
        it("click", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTabs",
                    props: {
                        active: "edit",
                        tabs: [
                            {
                                value: "edit",
                                icon: "edit",
                                label: "Edit",
                                content: "Hello World"
                            },
                            {
                                value: "trash",
                                icon: "trash",
                                label: "Trash",
                                badge: {
                                    label: 10
                                }
                            }
                        ]
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("trash");
                            this.destroy();
                            done();
                        }
                    }
                });
                comp.element.find("a.nav-link").eq(1).trigger('click');
            });
        });
    });
    describe("Methods => ", function() {
        it("addTab", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTabs",
                    props: {
                        class: "m-2",
                        active: "edit",
                        tabs: [
                            {
                                value: "edit",
                                icon: "edit",
                                label: "Edit",
                                content: "Hello World"
                            },
                            {
                                value: "trash",
                                icon: "trash",
                                label: "Trash",
                                badge: {
                                    label: 10
                                }
                            }
                        ]
                    }
                });

                comp.addTab({
                    value: "setting",
                    icon: "cogs",
                    label: "Setting",
                    content: "Setting"
                }, 0);

                expect(comp.prop("tabs")).toEqual([
                    {
                        value: "setting",
                        icon: "cogs",
                        label: "Setting",
                        content: "Setting"
                    },
                    {
                        value: "edit",
                        icon: "edit",
                        label: "Edit",
                        content: "Hello World"
                    },
                    {
                        value: "trash",
                        icon: "trash",
                        label: "Trash",
                        badge: {
                            label: 10
                        }
                    }
                ]);

                comp.removeTab("setting");

                expect(comp.prop("tabs")).toEqual([
                    {
                        value: "edit",
                        icon: "edit",
                        label: "Edit",
                        content: "Hello World"
                    },
                    {
                        value: "trash",
                        icon: "trash",
                        label: "Trash",
                        badge: {
                            label: 10
                        }
                    }
                ]);

                comp.addTab({
                    value: "setting",
                    icon: "cogs",
                    label: "Setting",
                    content: "Setting"
                }, 1);

                expect(comp.prop("tabs")).toEqual([
                    {
                        value: "edit",
                        icon: "edit",
                        label: "Edit",
                        content: "Hello World"
                    },
                    {
                        value: "setting",
                        icon: "cogs",
                        label: "Setting",
                        content: "Setting"
                    },
                    {
                        value: "trash",
                        icon: "trash",
                        label: "Trash",
                        badge: {
                            label: 10
                        }
                    }
                ]);

                comp.removeTab("setting");

                expect(comp.prop("tabs")).toEqual([
                    {
                        value: "edit",
                        icon: "edit",
                        label: "Edit",
                        content: "Hello World"
                    },
                    {
                        value: "trash",
                        icon: "trash",
                        label: "Trash",
                        badge: {
                            label: 10
                        }
                    }
                ]);

                comp.destroy();

                done();
            });
        });
    });
});