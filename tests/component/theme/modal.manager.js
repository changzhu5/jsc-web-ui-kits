describe("mmModalManager => ", function() {
    describe("Properties => ", function() {
        it("links, active", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmModalManager",
                    props: {
                        active: "edit",
                        links: [
                            {
                                icon: "edit",
                                value: "edit",
                                label: "Edit",
                                badge: {
                                    label: "40"
                                },
                                modal: {
                                    props: {
                                        size: "xlg"
                                    }
                                }
                            },
                            {
                                icon: "trash",
                                value: "trash",
                                label: "Trash",
                                badge: {
                                    label: "30"
                                },
                                removable: true
                            },
                            {
                                icon: "cogs",
                                value: "setting",
                                label: "Setting",
                                removable: true
                            }
                        ]
                    }
                });

                expect(comp.prop('active')).toEqual("edit");
                expect(comp.prop("links")).toEqual([
                    {
                        icon: "edit",
                        value: "edit",
                        label: "Edit",
                        badge: {
                            label: "40"
                        },
                        modal: {
                            props: {
                                size: "xlg"
                            }
                        }
                    },
                    {
                        icon: "trash",
                        value: "trash",
                        label: "Trash",
                        badge: {
                            label: "30"
                        },
                        removable: true
                    },
                    {
                        icon: "cogs",
                        value: "setting",
                        label: "Setting",
                        removable: true
                    }
                ]);

                expect(comp.element.find(".nav-link").eq(0).hasClass("active")).toBeTrue();
                
                let modals = comp.getScopeVal("modals");
                expect(modals.size).toEqual(3);
                expect(modals.get("edit").prop("visible")).toBeTrue();
                expect(modals.get("trash").prop("visible")).toBeFalse();
                expect(modals.get("setting").prop("visible")).toBeFalse();

                modals.get("edit").prop("visible", false);
                expect(comp.prop("active")).toEqual("");

                comp.prop("active", "setting");
                expect(modals.get("edit").prop("visible")).toBeFalse();
                expect(modals.get("trash").prop("visible")).toBeFalse();
                expect(modals.get("setting").prop("visible")).toBeTrue();

                comp.destroy();
                
                done();
            });
        });
    });
    describe("Methods => ", function() {
        it("add()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmModalManager"
                });

                comp.add({
                    value: "edit",
                    label: "Edit",
                    modal: {
                        props: {
                            content: "Hello World"
                        }
                    }
                });

                expect(comp.prop("links")).toEqual([
                    {
                        value: "edit",
                        label: "Edit",
                        modal: {
                            props: {
                                content: "Hello World"
                            }
                        }
                    }
                ]);

                comp.add({
                    value: "edit",
                    label: "Edit2"
                });

                expect(comp.prop("links")).toEqual([
                    {
                        value: "edit",
                        label: "Edit2",
                        modal: {
                            props: {
                                content: "Hello World"
                            }
                        }
                    }
                ]);

                comp.destroy();

                done();
            });
        });
        it("remove()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmModalManager"
                });

                comp.add({
                    value: "edit",
                    label: "Edit",
                    modal: {
                        props: {
                            content: "Hello World"
                        }
                    },
                    badge: {
                        label: 10
                    }
                });

                comp.add({
                    value: "trash",
                    label: "Trash"
                });

                comp.remove("trash");

                expect(comp.prop("links")).toEqual([
                    {
                        value: "edit",
                        label: "Edit",
                        modal: {
                            props: {
                                content: "Hello World"
                            }
                        },
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