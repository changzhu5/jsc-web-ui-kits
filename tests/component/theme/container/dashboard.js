describe("mmDashboard => ", function() {
    describe("Options => ", function() {
        it("columns", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDashboard",
                    scope: {
                        columns: [
                            {
                                class: "col-sm-4"
                            },
                            {
                                class: "col-sm-4"
                            },
                            {
                                class: "col-sm-4"
                            }
                        ]
                    }
                });

                expect(comp.getScopeVal("columns")).toEqual([
                    {
                        class: "col-sm-4"
                    },
                    {
                        class: "col-sm-4"
                    },
                    {
                        class: "col-sm-4"
                    }
                ]);

                expect(Array.isArray(comp.find("mmGrid"))).toBeTrue();
                expect(comp.find("mmGrid").length).toEqual(3);

                const componentMap = comp.getComponentMap();
                const mmGrid = mimi.getComponentDef("mmGrid");
                expect(componentMap[0]).toBeInstanceOf(mmGrid);
                expect(componentMap[1]).toBeInstanceOf(mmGrid);
                expect(componentMap[2]).toBeInstanceOf(mmGrid);

                comp.destroy();

                done();
            });
        });
    });
    describe("Properties => ", function() {
        it("elements", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDashboard",
                    props: {
                        elements: [
                            {
                                comp: {
                                    type: "mmButton",
                                    props: {
                                        label: "Button 1"
                                    }
                                },
                                option: {
                                    column: 0
                                }
                            },
                            {
                                comp: {
                                    type: "mmButton",
                                    props: {
                                        label: "Button 2"
                                    }
                                },
                                option: {
                                    column: 1
                                }
                            },
                            {
                                comp: {
                                    type: "mmButton",
                                    props: {
                                        label: "Button 3"
                                    }
                                },
                                option: {
                                    column: 2
                                }
                            }
                        ]
                    },
                    scope: {
                        columns: [
                            {
                                class: "col-sm-4"
                            },
                            {
                                class: "col-sm-4"
                            },
                            {
                                class: "col-sm-4"
                            }
                        ]
                    }
                });

                expect(Array.isArray(comp.getScopeVal("children"))).toBeTrue();
                expect(comp.getScopeVal("children").length).toEqual(3);

                const grids = comp.find("mmGrid");
                const comps = comp.getScopeVal("children");
                expect(grids.length).toEqual(3);
                expect(grids[0].getComponentList().length).toEqual(1);
                expect(grids[1].getComponentList().length).toEqual(1);
                expect(grids[2].getComponentList().length).toEqual(1);
                expect(grids[0].getComponentList()[0]).toEqual(comps[0]);
                expect(grids[1].getComponentList()[0]).toEqual(comps[1]);
                expect(grids[2].getComponentList()[0]).toEqual(comps[2]);

                comp.destroy();

                done();
            });
        });
    });
    describe("Methods => ", function() {
        it("addElement()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDashboard",
                    scope: {
                        columns: [
                            {
                                class: "col-sm-4"
                            },
                            {
                                class: "col-sm-4"
                            },
                            {
                                class: "col-sm-4"
                            }
                        ]
                    }
                });

                comp.addElement({
                    comp: {
                        type: "mmButton",
                        props: {
                            label: "Button",
                        }
                    },
                    option: {
                        column: 0
                    }
                });

                const grids = comp.find("mmGrid");
                const comps = comp.getScopeVal("children");
                expect(grids.length).toEqual(3);
                expect(grids[0].getComponentList().length).toEqual(1);
                expect(grids[1].getComponentList().length).toEqual(0);
                expect(grids[2].getComponentList().length).toEqual(0);
                expect(grids[0].getComponentList()[0]).toEqual(comps[0]);

                comp.destroy();

                done();
            });
        });
    });
});