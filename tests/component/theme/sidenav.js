describe("mmSidenav => ", function() {
    describe("Properties => ", function() {
        it("links", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmSidenav",
                    props: {
                        class: "m-2",
                        links: [
                            {
                                label: "Edit",
                                icon: "edit",
                                value: "edit",
                                badge: {
                                    type: "danger",
                                    label: "40"
                                }
                            },
                            {
                                label: "Setting",
                                icon: "cogs",
                                value: "setting",
                                menus: [
                                    {
                                        label: "General",
                                        value: "general",
                                        icon: "trash",
                                        
                                        badge: {
                                            type: "danger",
                                            label: "30"
                                        }
                                    },
                                    {
                                        label: "Tool",
                                        value: "tool",
                                        icon: "hammer"
                                    }
                                ]
                            }
                        ]
                    }
                });

                expect(comp.prop("links")).toEqual([
                    {
                        label: "Edit",
                        icon: "edit",
                        value: "edit",
                        badge: {
                            type: "danger",
                            label: "40"
                        }
                    },
                    {
                        label: "Setting",
                        icon: "cogs",
                        value: "setting",
                        menus: [
                            {
                                label: "General",
                                value: "general",
                                icon: "trash",
                                badge: {
                                    type: "danger",
                                    label: "30"
                                }
                            },
                            {
                                label: "Tool",
                                value: "tool",
                                icon: "hammer"
                            }
                        ]
                    }
                ]);

                comp.destroy();

                done();
            });
        });
        it("active", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmSidenav",
                    props: {
                        class: "m-2",
                        active: "tool",
                        links: [
                            {
                                label: "Edit",
                                icon: "edit",
                                value: "edit",
                                badge: 40
                            },
                            {
                                label: "Setting",
                                icon: "cogs",
                                value: "setting",
                                menus: [
                                    {
                                        label: "General",
                                        value: "general",
                                        icon: "trash",
                                        
                                        badge: 30
                                    },
                                    {
                                        label: "Tool",
                                        value: "tool",
                                        icon: "hammer"
                                    }
                                ]
                            }
                        ]
                    }
                });

                expect(comp.prop("links")).toEqual([
                    {
                        label: "Edit",
                        icon: "edit",
                        value: "edit",
                        badge: 40
                    },
                    {
                        label: "Setting",
                        icon: "cogs",
                        value: "setting",
                        menus: [
                            {
                                label: "General",
                                value: "general",
                                icon: "trash",
                                badge: 30
                            },
                            {
                                label: "Tool",
                                value: "tool",
                                icon: "hammer"
                            }
                        ]
                    }
                ]);

                expect(comp.prop('active')).toEqual("tool");

                comp.destroy();

                done();
            });
        });
    });
    describe("Scope => ", function() {
        it("click()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmSidenav",
                    props: {
                        class: "m-2",
                        active: "tool",
                        links: [
                            {
                                label: "Edit",
                                icon: "edit",
                                value: "edit",
                                badge: {
                                    type: "danger",
                                    label: "40"
                                }
                            },
                            {
                                label: "Setting",
                                icon: "cogs",
                                value: "setting",
                                menus: [
                                    {
                                        label: "General",
                                        value: "general",
                                        icon: "trash",
                                        
                                        badge: {
                                            type: "danger",
                                            label: "30"
                                        }
                                    },
                                    {
                                        label: "Tool",
                                        value: "tool",
                                        icon: "hammer"
                                    }
                                ]
                            }
                        ]
                    }
                });

                comp.destroy();

                done();
            });
        });
    });
    describe("Events => ", function() {
        it("click#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmSidenav",
                    props: {
                        class: "m-2",
                        active: "tool",
                        links: [
                            {
                                label: "Edit",
                                icon: "edit",
                                value: "edit",
                                badge: {
                                    type: "danger",
                                    label: "40"
                                }
                            },
                            {
                                label: "Setting",
                                icon: "cogs",
                                value: "setting",
                                menus: [
                                    {
                                        label: "General",
                                        value: "general",
                                        icon: "trash",
                                        
                                        badge: {
                                            type: "danger",
                                            label: "30"
                                        }
                                    },
                                    {
                                        label: "Tool",
                                        value: "tool",
                                        icon: "hammer"
                                    }
                                ]
                            }
                        ]
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("edit");
                            this.destroy();
                            done();
                        }
                    }
                });
                comp.element.find("a").eq(0).trigger("click");
            });
        });
        it("click#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmSidenav",
                    props: {
                        class: "m-2",
                        active: "tool",
                        links: [
                            {
                                label: "Edit",
                                icon: "edit",
                                value: "edit",
                                badge: {
                                    type: "danger",
                                    label: "40"
                                }
                            },
                            {
                                label: "Setting",
                                icon: "cogs",
                                value: "setting",
                                menus: [
                                    {
                                        label: "General",
                                        value: "general",
                                        icon: "trash",
                                        badge: {
                                            type: "danger",
                                            label: "30"
                                        }
                                    },
                                    {
                                        label: "Tool",
                                        value: "tool",
                                        icon: "hammer"
                                    }
                                ]
                            }
                        ]
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("general");
                            this.destroy();
                            done();
                        }
                    }
                });
                comp.element.find("ul a").eq(0).trigger("click");
            });
        });
    });
});