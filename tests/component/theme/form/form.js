describe("mmForm => ", function() {
    describe("Properties => ", function() {
        it("label", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: 'mmForm',
                    props: {
                        label: "My Form"
                    }
                });

                expect(comp.prop("label")).toEqual("My Form");
                expect(comp.get("heading").prop("label")).toEqual("My Form");
                expect(comp.element.find("h5").text().trim()).toEqual("My Form");

                comp.prop("label", "My Form 2");

                expect(comp.prop("label")).toEqual("My Form 2");
                expect(comp.get("heading").prop("label")).toEqual("My Form 2");
                expect(comp.element.find("h5").text().trim()).toEqual("My Form 2");

                comp.destroy();

                done();
            });
        });
        it("elements", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmForm",
                    props: {
                        elements: [
                            {
                                comp: {
                                    name: "name",
                                    type: "mmTextfield"
                                },
                                option: {
                                    label: "Name",
                                    class: "col-sm-6"
                                }
                            },
                            {
                                comp: {
                                    name: "email",
                                    type: "mmTextfield"
                                },
                                option: {
                                    label: "Email",
                                    class: "col-sm-6"
                                }
                            },
                            {
                                comp: {
                                    name: "submit",
                                    type: "mmButton",
                                    props: {
                                        class: "float-end",
                                        label: "Submit"
                                    }
                                },
                                option: {
                                    class: "col-sm-12"
                                }
                            }
                        ]
                    }
                });

                expect(comp.prop("elements")).toEqual([
                    {
                        comp: {
                            name: "name",
                            type: "mmTextfield"
                        },
                        option: {
                            label: "Name",
                            class: "col-sm-6"
                        }
                    },
                    {
                        comp: {
                            name: "email",
                            type: "mmTextfield"
                        },
                        option: {
                            label: "Email",
                            class: "col-sm-6"
                        }
                    },
                    {
                        comp: {
                            name: "submit",
                            type: "mmButton",
                            props: {
                                class: "float-end",
                                label: "Submit"
                            }
                        },
                        option: {
                            class: "col-sm-12"
                        }
                    }
                ]);

                expect(comp.get("content").getComponentList().length).toEqual(3);

                comp.destroy();

                done();
            });
        });
        it("value", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmForm",
                    props: {
                        value: {
                            name: "Tommy",
                            email: "tommy@gmail.com"
                        },
                        elements: [
                            {
                                comp: {
                                    name: "name",
                                    type: "mmTextfield"
                                },
                                option: {
                                    label: "Name",
                                    class: "col-sm-6"
                                }
                            },
                            {
                                comp: {
                                    name: "email",
                                    type: "mmTextfield"
                                },
                                option: {
                                    label: "Email",
                                    class: "col-sm-6"
                                }
                            },
                            {
                                comp: {
                                    name: "submit",
                                    type: "mmButton",
                                    props: {
                                        class: "float-end",
                                        label: "Submit"
                                    }
                                },
                                option: {
                                    class: "col-sm-12"
                                }
                            }
                        ]
                    }
                });

                expect(comp.prop("value")).toEqual({
                    name: "Tommy",
                    email: "tommy@gmail.com"
                });

                comp.prop("value", {
                    name: "Changzhu"
                });

                expect(comp.prop("value")).toEqual({
                    name: "Changzhu",
                    email: "tommy@gmail.com"
                });
                
                expect(comp.getChange()).toEqual({
                    name: "Changzhu"
                });

                comp.destroy();

                done();
            });
        });
        it("error", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmForm",
                    props: {
                        label: "My Form",
                        error: "Error occured !"
                    }
                });

                expect(comp.prop("error")).toEqual("Error occured !");
                expect(comp.get("error").prop("description")).toEqual("Error occured !");
                expect(comp.get("error").prop("visible")).toBeTrue();

                comp.prop("error", "");

                expect(comp.prop("error")).toEqual("");
                expect(comp.get("error").prop("description")).toEqual("");
                expect(comp.get("error").prop("visible")).toBeFalse();

                comp.destroy();
                
                done();
            });
        });
    });
    describe("Methods => ", function() {
        it("getElementList(), getElement()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmForm",
                    props: {
                        elements: [
                            {
                                comp: {
                                    name: "name",
                                    type: "mmTextfield"
                                },
                                option: {
                                    label: "Name",
                                    class: "col-sm-6"
                                }
                            },
                            {
                                comp: {
                                    name: "email",
                                    type: "mmTextfield"
                                },
                                option: {
                                    label: "Email",
                                    class: "col-sm-6"
                                }
                            },
                            {
                                comp: {
                                    name: "submit",
                                    type: "mmButton",
                                    props: {
                                        class: "float-end",
                                        label: "Submit"
                                    }
                                },
                                option: {
                                    class: "col-sm-12"
                                }
                            }
                        ]
                    }
                });

                const list = comp.getElementList();
                comp.prop("elements").forEach(function(ele, index) {
                    let c = mimi.component(comp.name + "|" + ele.comp.name, ele.comp.type);
                    expect(c === list[index]).toBeTrue();
                });

                const email = comp.getElement("email");

                expect(email === mimi.component(comp.name + "|email", "mmTextfield")).toBeTrue();

                comp.destroy();

                done();
            });
        });
        it("changed(), getChange()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmForm",
                    props: {
                        elements: [
                            {
                                comp: {
                                    name: "name",
                                    type: "mmTextfield"
                                },
                                option: {
                                    label: "Name",
                                    class: "col-sm-6"
                                }
                            },
                            {
                                comp: {
                                    name: "email",
                                    type: "mmTextfield"
                                },
                                option: {
                                    label: "Email",
                                    class: "col-sm-6"
                                }
                            },
                            {
                                comp: {
                                    name: "submit",
                                    type: "mmButton",
                                    props: {
                                        class: "float-end",
                                        label: "Submit"
                                    }
                                },
                                option: {
                                    class: "col-sm-12"
                                }
                            }
                        ]
                    }
                });

                expect(comp.changed()).toBeFalse();

                comp.getElement('email').prop("value", "tommy@gmail.com");

                expect(comp.changed()).toBeTrue();
                expect(comp.getChange()).toEqual({
                    email: "tommy@gmail.com"
                });

                comp.destroy();

                done();
            });
        });
    });
});