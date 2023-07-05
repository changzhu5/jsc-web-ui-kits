describe("mmRepeater => ", function() {
    describe("Properties => ", function() {
        it("columns", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmRepeater",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "ID",
                                primary: true,
                                component: {
                                    type: "mmNumber"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {label: "Male", value: "male"},
                                            {label: "Female", value: "female"}
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                });

                const columns = comp.prop('columns');
                
                expect(columns.length).toEqual(3);
                columns.forEach(function(col) {
                    expect(col).toBeInstanceOf(DataMeta);
                });

                comp.destroy();

                done();
            });
        });
        it("value#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmRepeater",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "ID",
                                primary: true,
                                component: {
                                    type: "mmNumber"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {label: "Male", value: "male"},
                                            {label: "Female", value: "female"}
                                        ]
                                    }
                                }
                            }
                        ],
                        value: [
                            {
                                id: 1,
                                name: "Tommy",
                                gender: "male"
                            },
                            {
                                id: 2,
                                name: "Jane",
                                gender: "Female"
                            },
                            {
                                id: 3,
                                name: "John",
                                gender: "male"
                            }
                        ]
                    }
                });
                expect(comp.prop("value")).toEqual([
                    {
                        id: 1,
                        name: "Tommy",
                        gender: "male"
                    },
                    {
                        id: 2,
                        name: "Jane",
                        gender: "Female"
                    },
                    {
                        id: 3,
                        name: "John",
                        gender: "male"
                    }
                ]);
                expect(comp.getScopeVal('comps').length).toEqual(9);
                comp.prop("value", [
                    {
                        id: 4,
                        name: "Tom",
                        gender: "male"
                    }
                ]);
                expect(comp.prop('value')).toEqual([{
                    id: 4,
                    name: "Tom",
                    gender: "male"
                }]);
                expect(comp.getScopeVal('comps').length).toEqual(3);

                comp.destroy();

                done();
            });
        });
        it("value#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmRepeater",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "ID",
                                primary: true,
                                component: {
                                    type: "mmNumber"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {label: "Male", value: "male"},
                                            {label: "Female", value: "female"}
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                });
                expect(comp.prop("value")).toEqual("");
                comp.element.find("thead button").trigger("click");
                expect(comp.prop("value")).toEqual([{
                    id: '',
                    name: '',
                    gender: ''
                }]);
                comp.element.find("tbody tr").first().find("td").last().find("button").trigger('click');
                expect(comp.prop('value')).toEqual("");

                comp.destroy();

                done();
            });
        });
        it("isSingleColumn", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmRepeater",
                    props: {
                        isSingleColumn: true,
                        columns: [
                            {
                                key: "id",
                                label: "ID",
                                primary: true,
                                component: {
                                    type: "mmNumber"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {label: "Male", value: "male"},
                                            {label: "Female", value: "female"}
                                        ]
                                    }
                                }
                            }
                        ],
                        value: [
                            {
                                id: 1,
                                name: "Tommy",
                                gender: "male"
                            },
                            {
                                id: 2,
                                name: "Jane",
                                gender: "Female"
                            },
                            {
                                id: 3,
                                name: "John",
                                gender: "male"
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
        it("change#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmRepeater",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "ID",
                                primary: true,
                                component: {
                                    type: "mmNumber"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {label: "Male", value: "male"},
                                            {label: "Female", value: "female"}
                                        ]
                                    }
                                }
                            }
                        ],
                        value: [
                            {
                                id: 1,
                                name: "Tommy",
                                gender: "male"
                            },
                            {
                                id: 2,
                                name: "Jane",
                                gender: "Female"
                            },
                            {
                                id: 3,
                                name: "John",
                                gender: "male"
                            }
                        ]
                    }
                });
                expect(comp.getScopeVal("edits")).toEqual([]);
                mimi.component(comp.name + ":0:2", "mmDropdown").prop('value', "female");
                expect(comp.getScopeVal("edits")).toEqual([
                    [0, 2, "female"]
                ]);
                expect(comp.changed()).toBeTrue();
                comp.prop("value", [
                    {
                        id: 3,
                        name: "John",
                        gender: "male"
                    }
                ]);
                expect(comp.getScopeVal("edits")).toEqual([]);
                expect(comp.changed()).toBeFalse();

                comp.overrideOnApply = false;

                comp.element.find("thead button").trigger("click");
                expect(comp.changed()).toBeTrue();

                comp.destroy();

                done();
            });
        });
    });
    
    describe("Methods => ", function() {
        it("getNextColComponent()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmRepeater",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "ID",
                                primary: true,
                                component: {
                                    type: "mmNumber"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                component: {
                                    type: "mmTextfield"
                                }
                            }
                        ],
                        value: [
                            {
                                id: 1,
                                name: "Tommy"
                            }
                        ]
                    }
                });

                const numInput = mimi.component(comp.name + ":0:0", "mmNumber");
                let nextComp = comp.getNextColComponent(numInput);

                expect(nextComp.name).toEqual(comp.name + ":0:1");
                expect(nextComp.type).toEqual("mmTextfield");

                nextComp = comp.getNextColComponent(nextComp);

                expect(nextComp.name).toEqual(comp.name + ":0:0");
                expect(nextComp.type).toEqual("mmNumber");

                comp.destroy();

                done();
            });
        });
    });
});