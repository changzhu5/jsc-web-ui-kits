describe("mmDataGrid => ", function() {
    describe("Properties => ", function() {
        it("columns, query, canEditCell", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDataGrid",
                    props: {
                        selectable: true,
                        columns: [
                            {
                                key: "id",
                                label: "Id",
                                visible: false,
                                primary: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "email",
                                label: "Email",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                editable: true,
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {
                                                label: "Male",
                                                value: "male"
                                            },
                                            {
                                                label: "Femaile",
                                                value: "female"
                                            }
                                        ]
                                    }
                                },
                                display: function(row) {
                                    if (! row.gender) {
                                        return "";
                                    }
                                    return row.gender.charAt(0).toUpperCase() + row.gender.slice(1)
                                }
                            }
                        ],
                        query: [
                            {
                                id: 1,
                                name: "Tommy",
                                email: "tommy@gmail.com",
                                gender: "male"
                            },
                            {
                                id: 2,
                                name: "Jane",
                                email: "jane@gmail.com",
                                gender: "female"
                            },
                            {
                                id: 3,
                                name: "John",
                                email: "john@gmail.com",
                                gender: "male"
                            },
                        ],
                        canEditCell: true
                    }
                });

                const columns = comp.prop("columns");
                expect(columns.length).toEqual(4);
                expect(comp.getScopeVal("docs")).toEqual([
                    {
                        id: 1,
                        name: "Tommy",
                        email: "tommy@gmail.com",
                        gender: "male"
                    },
                    {
                        id: 2,
                        name: "Jane",
                        email: "jane@gmail.com",
                        gender: "female"
                    },
                    {
                        id: 3,
                        name: "John",
                        email: "john@gmail.com",
                        gender: "male"
                    },
                ]);
                comp.element.find("td").each(function() {
                    if (jQuery(this).hasClass("mm-data-cell")) {
                        expect(jQuery(this).hasClass("cursor-pointer")).toBeTrue();
                    }
                });
                
                expect(comp.element.find("tbody > tr").length).toEqual(3);
                const tr1 = comp.element.find("tbody > tr").eq(0);
                const td1 = tr1.children().eq(1);
                const td2 = tr1.children().eq(2);
                const td3 = tr1.children().eq(3);
                expect(td1.text().trim()).toEqual("Tommy");
                expect(td2.text().trim()).toEqual("tommy@gmail.com");
                expect(td3.text().trim()).toEqual("Male");
                td1.trigger("dblclick");
                expect(td1.children().eq(0).css("display")).toEqual("none");
                expect(td1.children().eq(1).css("display")).toEqual("block");
                td2.trigger("dblclick");
                expect(td2.children().eq(0).css("display")).toEqual("none");
                expect(td2.children().eq(1).css("display")).toEqual("block");
                expect(td1.children().eq(0).css("display")).toEqual("inline");
                expect(td1.children().eq(1).css("display")).toEqual("none");
                jQuery("body").trigger("click");
                expect(td2.children().eq(0).css("display")).toEqual("inline");
                expect(td2.children().eq(1).css("display")).toEqual("none");

                comp.prop("canEditCell", false);

                comp.element.find("td").each(function() {
                    if (jQuery(this).hasClass("mm-data-cell")) {
                        expect(jQuery(this).hasClass("cursor-pointer")).toBeFalse();
                    }
                });

                comp.destroy();

                done();
            });
        });
        it("top, bottom", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDataGrid",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "Id",
                                visible: false,
                                primary: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "email",
                                label: "Email",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                editable: true,
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {
                                                label: "Male",
                                                value: "male"
                                            },
                                            {
                                                label: "Femaile",
                                                value: "female"
                                            }
                                        ]
                                    }
                                },
                                display: function(row) {
                                    if (! row.gender) {
                                        return "";
                                    }
                                    return row.gender.charAt(0).toUpperCase() + row.gender.slice(1)
                                }
                            }
                        ],
                        top: {
                            type: "mmTextfield",
                            props: {
                                placeholder: "Search by enter"
                            }
                        },
                        bottom: {
                            type: "mmButton",
                            props: {
                                label: "Refresh"
                            }
                        }
                    }
                });

                expect(comp.element.find(".col-sm-12").length).toEqual(2);

                const top = comp.get("top");
                const bottom = comp.get("bottom");
                const topEle = comp.element.find(".col-sm-12").children().first();
                const bottomEle = comp.element.find(".col-sm-12").children().last();

                expect(top).toBeInstanceOf(mimi.getComponentDef("mmTextfield"));
                expect(bottom).toBeInstanceOf(mimi.getComponentDef("mmButton"));
                expect(topEle.attr("data-component-type")).toEqual(top.type);
                expect(topEle.attr("data-component-name")).toEqual(top.name);
                expect(bottomEle.attr("data-component-type")).toEqual(bottom.type);
                expect(bottomEle.attr("data-component-name")).toEqual(bottom.name);

                comp.destroy();

                done();
            });
        });
        it("actions#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDataGrid",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "Id",
                                visible: false,
                                primary: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "email",
                                label: "Email",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                editable: true,
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {
                                                label: "Male",
                                                value: "male"
                                            },
                                            {
                                                label: "Femaile",
                                                value: "female"
                                            }
                                        ]
                                    }
                                },
                                display: function(row) {
                                    if (! row.gender) {
                                        return "";
                                    }
                                    return row.gender.charAt(0).toUpperCase() + row.gender.slice(1)
                                }
                            }
                        ],
                        query: [
                            {
                                id: 1,
                                name: "Tommy",
                                email: "tommy@gmail.com",
                                gender: "male"
                            },
                            {
                                id: 2,
                                name: "Jane",
                                email: "jane@gmail.com",
                                gender: "female"
                            },
                            {
                                id: 3,
                                name: "John",
                                email: "john@gmail.com",
                                gender: "male"
                            },
                        ],
                        actions: {
                            type: "button",
                            options: [
                                {
                                    icon: "edit",
                                    label: "Edit",
                                    type: "primary"
                                },
                                {
                                    icon: "trash",
                                    label: "Delete",
                                    type: "danger",
                                    visible: function(doc, index) {
                                        if (doc.id == 2) {
                                            return false;
                                        }
                                        if (index === 2) {
                                            return false;
                                        }
                                        return true;
                                    }
                                }
                            ]
                        }
                    }
                });

                const trs = comp.element.find("tbody tr");
                const tr1 = trs.eq(0);
                const tr2 = trs.eq(1);
                const tr3 = trs.eq(2);
                const actions = comp.prop("actions");
                
                expect(actions.type).toEqual("button");
                expect(actions.options.length).toEqual(2);
                expect(actions.options[0]).toEqual(jasmine.objectContaining({
                    icon: "edit",
                    label: "Edit",
                    type: "primary",
                }));
                expect(actions.options[1]).toEqual(jasmine.objectContaining({
                    icon: "trash",
                    label: "Delete",
                    type: "danger",
                }));
                expect(tr1.children().last().find("button").length).toEqual(2);
                expect(tr2.children().last().find("button").length).toEqual(1);
                expect(tr3.children().last().find("button").length).toEqual(1);

                comp.destroy();

                done();
            });
        });
        it("actions#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDataGrid",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "Id",
                                visible: false,
                                primary: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "email",
                                label: "Email",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                editable: true,
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {
                                                label: "Male",
                                                value: "male"
                                            },
                                            {
                                                label: "Femaile",
                                                value: "female"
                                            }
                                        ]
                                    }
                                },
                                display: function(row) {
                                    if (! row.gender) {
                                        return "";
                                    }
                                    return row.gender.charAt(0).toUpperCase() + row.gender.slice(1)
                                }
                            }
                        ],
                        query: [
                            {
                                id: 1,
                                name: "Tommy",
                                email: "tommy@gmail.com",
                                gender: "male"
                            },
                            {
                                id: 2,
                                name: "Jane",
                                email: "jane@gmail.com",
                                gender: "female"
                            },
                            {
                                id: 3,
                                name: "John",
                                email: "john@gmail.com",
                                gender: "male"
                            },
                        ],
                        actions: {
                            type: "button",
                            options: [
                                {
                                    icon: "edit",
                                    type: "primary"
                                },
                                {
                                    icon: "trash",
                                    type: "danger"
                                }
                            ]
                        }
                    }
                });

                const trs = comp.element.find("tbody tr");
                const tr1 = trs.eq(0);
                const tr2 = trs.eq(1);
                const tr3 = trs.eq(2);
                const actions = comp.prop("actions");
                
                expect(actions.type).toEqual("button");
                expect(actions.options.length).toEqual(2);
                expect(actions.options[0]).toEqual(jasmine.objectContaining({
                    icon: "edit",
                    type: "primary",
                }));
                expect(actions.options[1]).toEqual(jasmine.objectContaining({
                    icon: "trash",
                    type: "danger",
                }));
                expect(tr1.children().last().find("button").length).toEqual(2);
                expect(tr2.children().last().find("button").length).toEqual(2);
                expect(tr3.children().last().find("button").length).toEqual(2);

                comp.destroy();

                done();
            });
        });
        it("actions#3", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDataGrid",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "Id",
                                visible: false,
                                primary: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "email",
                                label: "Email",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                editable: true,
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {
                                                label: "Male",
                                                value: "male"
                                            },
                                            {
                                                label: "Femaile",
                                                value: "female"
                                            }
                                        ]
                                    }
                                },
                                display: function(row) {
                                    if (! row.gender) {
                                        return "";
                                    }
                                    return row.gender.charAt(0).toUpperCase() + row.gender.slice(1)
                                }
                            }
                        ],
                        query: [
                            {
                                id: 1,
                                name: "Tommy",
                                email: "tommy@gmail.com",
                                gender: "male"
                            },
                            {
                                id: 2,
                                name: "Jane",
                                email: "jane@gmail.com",
                                gender: "female"
                            },
                            {
                                id: 3,
                                name: "John",
                                email: "john@gmail.com",
                                gender: "male"
                            },
                        ],
                        actions: {
                            type: "dropdown",
                            trigger: {
                                type: "secondary",
                                label: "Actions"
                            },
                            options: [
                                {
                                    icon: "edit",
                                    label: "Edit",
                                    value: "edit",
                                    type: "primary"
                                },
                                {
                                    icon: "trash",
                                    value: "delete",
                                    label: "Delete",
                                    type: "danger"
                                }
                            ]
                        }
                    }
                });

                const trs = comp.element.find("tbody tr");
                const tr1 = trs.eq(0);
                const tr2 = trs.eq(1);
                const tr3 = trs.eq(2);
                const actions = comp.prop("actions");
                
                expect(actions.type).toEqual("dropdown");
                expect(actions.options.length).toEqual(2);
                expect(actions.options[0]).toEqual(jasmine.objectContaining({
                    icon: "edit",
                    label: "Edit",
                    value: "edit",
                    type: "primary",
                }));
                expect(actions.options[1]).toEqual(jasmine.objectContaining({
                    icon: "trash",
                    label: "Delete",
                    value: "delete",
                    type: "danger",
                }));
                expect(tr1.children().last().find("button").length).toEqual(1);
                expect(tr1.children().last().find("button").text().trim()).toEqual("Actions");
                expect(tr1.children().last().find(".dropdown-item").length).toEqual(2);
                expect(tr2.children().last().find("button").length).toEqual(1);
                expect(tr2.children().last().find("button").text().trim()).toEqual("Actions");
                expect(tr2.children().last().find(".dropdown-item").length).toEqual(2);
                expect(tr3.children().last().find("button").length).toEqual(1);
                expect(tr3.children().last().find("button").text().trim()).toEqual("Actions");
                expect(tr3.children().last().find(".dropdown-item").length).toEqual(2);
                
                comp.prop("actions", {
                    type: "dropdown",
                    trigger: {
                        type: "secondary",
                        icon: "cogs"
                    },
                    options: [
                        {
                            icon: "edit",
                            label: "Edit",
                            value: "edit",
                            type: "primary"
                        },
                        {
                            icon: "trash",
                            value: "delete",
                            label: "Delete",
                            type: "danger"
                        }
                    ]
                });

                comp.destroy();
                
                done();
            });
        });
        it("pager", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDataGrid",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "Id",
                                visible: false,
                                primary: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "email",
                                label: "Email",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                editable: true,
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {
                                                label: "Male",
                                                value: "male"
                                            },
                                            {
                                                label: "Femaile",
                                                value: "female"
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        pager: {
                            limit: 1
                        },
                        query: function() {
                            const data = [
                                {
                                    id: 1,
                                    name: "Tommy",
                                    email: "tommy@gmail.com",
                                    gender: "male"
                                },
                                {
                                    id: 2,
                                    name: "Jane",
                                    email: "jane@gmail.com",
                                    gender: "female"
                                },
                                {
                                    id: 3,
                                    name: "John",
                                    email: "john@gmail.com",
                                    gender: "male"
                                },
                            ];
                            const page = this.get("pager").prop("page");
                            return new Promise(function(resolve) {
                                resolve({
                                    docs: [
                                        data[page - 1]
                                    ],
                                    total: data.length
                                });
                            });
                        }
                    }
                });

                setTimeout(function() {
                    expect(comp.getScopeVal("docs").length).toEqual(1);
                    expect(comp.getScopeVal("docs")[0]).toEqual({
                        id: 1,
                        name: "Tommy",
                        email: "tommy@gmail.com",
                        gender: "male"
                    });
                    expect(comp.get("pager").getScopeVal("total")).toEqual(3);
                    expect(comp.get("pager").prop("limit")).toEqual(1);
                    expect(comp.prop("pager")).toEqual({
                        limit: 1
                    });
                    comp.get("pager").element.find("a").eq(2).trigger("click");
                    setTimeout(function() {
                        expect(comp.getScopeVal("docs").length).toEqual(1);
                        expect(comp.getScopeVal("docs")[0]).toEqual({
                            id: 2,
                            name: "Jane",
                            email: "jane@gmail.com",
                            gender: "female"
                        });
                        comp.destroy();
                        done();
                    });
                });
            });
        });
    });
    describe("Events => ", function() {
        it("click#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDataGrid",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "Id",
                                visible: false,
                                primary: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "email",
                                label: "Email",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                editable: true,
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {
                                                label: "Male",
                                                value: "male"
                                            },
                                            {
                                                label: "Femaile",
                                                value: "female"
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        query: [
                            {
                                id: 1,
                                name: "Tommy",
                                email: "tommy@gmail.com",
                                gender: "male"
                            },
                            {
                                id: 2,
                                name: "Jane",
                                email: "jane@gmail.com",
                                gender: "female"
                            },
                            {
                                id: 3,
                                name: "John",
                                email: "john@gmail.com",
                                gender: "male"
                            },
                        ],
                        actions: {
                            type: "button",
                            options: [
                                {
                                    icon: "edit",
                                    value: "edit",
                                    type: "primary"
                                },
                                {
                                    icon: "trash",
                                    value: 'delete',
                                    type: "danger"
                                }
                            ]
                        }
                    },
                    on: {
                        click: function(action, doc, index) {
                            expect(action).toEqual("delete");
                            expect(index).toEqual(1);
                            expect(doc).toEqual({
                                id: 2,
                                name: "Jane",
                                email: "jane@gmail.com",
                                gender: "female"
                            });

                            comp.destroy();

                            done();
                        }
                    }
                });

                const trs = comp.element.find("tbody tr");
                trs.eq(1).children().last().find("button").eq(1).trigger("click");
            });
        });
        it("click#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDataGrid",
                    props: {
                        columns: [
                            {
                                key: "id",
                                label: "Id",
                                visible: false,
                                primary: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "name",
                                label: "Name",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "email",
                                label: "Email",
                                editable: true,
                                component: {
                                    type: "mmTextfield"
                                }
                            },
                            {
                                key: "gender",
                                label: "Gender",
                                editable: true,
                                component: {
                                    type: "mmDropdown",
                                    props: {
                                        options: [
                                            {
                                                label: "Male",
                                                value: "male"
                                            },
                                            {
                                                label: "Femaile",
                                                value: "female"
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        query: [
                            {
                                id: 1,
                                name: "Tommy",
                                email: "tommy@gmail.com",
                                gender: "male"
                            },
                            {
                                id: 2,
                                name: "Jane",
                                email: "jane@gmail.com",
                                gender: "female"
                            },
                            {
                                id: 3,
                                name: "John",
                                email: "john@gmail.com",
                                gender: "male"
                            },
                        ],
                        actions: {
                            type: "dropdown",
                            trigger: {
                                type: "secondary",
                                label: "Actions"
                            },
                            options: [
                                {
                                    icon: "edit",
                                    label: "Edit",
                                    value: "edit",
                                    type: "primary"
                                },
                                {
                                    icon: "trash",
                                    value: "delete",
                                    label: "Delete",
                                    type: "danger"
                                }
                            ]
                        }
                    },
                    on: {
                        click: function(action, doc, index) {
                            expect(action).toEqual("delete");
                            expect(index).toEqual(1);
                            expect(doc).toEqual({
                                id: 2,
                                name: "Jane",
                                email: "jane@gmail.com",
                                gender: "female"
                            });

                            comp.destroy();

                            done();
                        }
                    }
                });

                const trs = comp.element.find("tbody tr");
                trs.eq(1).children().last().find("button").trigger("click");
                trs.eq(1).children().last().find("a").eq(1).trigger("click");
            });
        });
    });
});