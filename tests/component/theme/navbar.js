describe("mmNavbar => ", function() {
    describe("Properties => ", function() {
        it("color", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNavbar"
                });

                expect(comp.prop("color")).toEqual("light");
                expect(comp.element.hasClass("navbar-light")).toBeTrue();
                expect(comp.element.hasClass("bg-light")).toBeTrue();

                comp.destroy();
                
                done();
            });
        });
        it("user", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNavbar",
                    props: {
                        user: {
                            photo: "https://i.pravatar.cc/300",
                            label: "Tommy",
                            links: [
                                {
                                    label: "Logout",
                                    value: "logout",
                                    icon: "sign-out"
                                }
                            ]
                        }
                    }
                });

                expect(comp.prop("user")).toEqual({
                    photo: "https://i.pravatar.cc/300",
                    label: "Tommy",
                    links: [
                        {
                            label: "Logout",
                            value: "logout",
                            icon: "sign-out"
                        }
                    ]
                });

                comp.destroy();
                
                done();
            });
        });
        it("links", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNavbar",
                    props: {
                        user: {
                            photo: "https://i.pravatar.cc/300",
                            label: "Tommy",
                            links: [
                                {
                                    label: "Logout",
                                    value: "logout",
                                    icon: "sign-out"
                                }
                            ]
                        },
                        links: [
                            {
                                position: "left",
                                active: true,
                                label: "Account",
                                icon: "edit",
                                badge: {
                                    label: "40"
                                },
                                menus: [
                                    {
                                        label: "Create",
                                        value: "create",
                                        icon: "task"
                                    }
                                ]
                            },
                            {
                                position: "left",
                                label: "Blog",
                                icon: "trash",
                                badge: {
                                    label: "30",
                                }
                            },
                            {
                                position: "right",
                                label: "Setting",
                                icon: "cogs",
                                badge: {
                                    label: "10"
                                }
                            }
                        ]
                    }
                });

                expect(comp.prop("links")).toEqual([
                    {
                        position: "left",
                        active: true,
                        label: "Account",
                        icon: "edit",
                        badge: {
                            label: "40"
                        },
                        menus: [
                            {
                                label: "Create",
                                value: "create",
                                icon: "task"
                            }
                        ]
                    },
                    {
                        position: "left",
                        label: "Blog",
                        icon: "trash",
                        badge: {
                            label: "30",
                        }
                    },
                    {
                        position: "right",
                        label: "Setting",
                        icon: "cogs",
                        badge: {
                            label: "10"
                        }
                    }
                ]);

                comp.destroy();
                
                done();
            });
        });
        it("active", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNavbar",
                    props: {
                        active: "blog",
                        user: {
                            photo: "https://i.pravatar.cc/300",
                            label: "Tommy",
                            links: [
                                {
                                    label: "Logout",
                                    value: "logout",
                                    icon: "sign-out"
                                }
                            ]
                        },
                        links: [
                            {
                                position: "left",
                                label: "Account",
                                value: "account",
                                icon: "edit",
                                badge: {
                                    label: "40"
                                },
                                menus: [
                                    {
                                        label: "Create",
                                        value: "create",
                                        icon: "task"
                                    }
                                ]
                            },
                            {
                                position: "left",
                                label: "Blog",
                                value: "blog",
                                icon: "trash",
                                badge: {
                                    label: "30",
                                }
                            },
                            {
                                position: "right",
                                label: "Setting",
                                icon: "cogs",
                                badge: {
                                    label: "10"
                                }
                            }
                        ]
                    }
                });

                expect(comp.prop("active")).toEqual("blog");
                const links = comp.prop("links");
                expect(links[1].value).toEqual("blog");

                comp.destroy();
                
                done();
            });
        });
        it("sidebar", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNavbar",
                    props: {
                        active: "blog",
                        sidebar: true,
                        user: {
                            photo: "https://i.pravatar.cc/300",
                            label: "Tommy",
                            links: [
                                {
                                    label: "Logout",
                                    value: "logout",
                                    icon: "sign-out"
                                }
                            ]
                        },
                        links: [
                            {
                                position: "left",
                                label: "Account",
                                value: "account",
                                icon: "edit",
                                badge: {
                                    label: "40"
                                },
                                menus: [
                                    {
                                        label: "Create",
                                        value: "create",
                                        icon: "task"
                                    }
                                ]
                            },
                            {
                                position: "left",
                                label: "Blog",
                                value: "blog",
                                icon: "trash",
                                badge: {
                                    label: "30",
                                }
                            },
                            {
                                position: "right",
                                label: "Setting",
                                icon: "cogs",
                                badge: {
                                    label: "10"
                                },
                                menus: [
                                    {
                                        label: "Create",
                                        value: "create",
                                        icon: "task"
                                    },
                                    {
                                        label: "Delete",
                                        value: "delete",
                                        icon: "dashboard"
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
    describe("Scope => ", function() {
        it("click()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNavbar",
                    props: {
                        active: "blog",
                        user: {
                            photo: "https://i.pravatar.cc/300",
                            label: "Tommy",
                            links: [
                                {
                                    label: "Logout",
                                    value: "logout",
                                    icon: "sign-out"
                                }
                            ]
                        },
                        links: [
                            {
                                position: "left",
                                label: "Account",
                                value: "account",
                                icon: "edit",
                                badge: {
                                    label: "40"
                                },
                                menus: [
                                    {
                                        label: "Create",
                                        value: "create",
                                        icon: "task"
                                    }
                                ]
                            },
                            {
                                position: "left",
                                label: "Blog",
                                value: "blog",
                                icon: "trash",
                                badge: {
                                    label: "30",
                                }
                            },
                            {
                                position: "right",
                                label: "Setting",
                                value: "setting",
                                icon: "cogs",
                                badge: {
                                    label: "10"
                                }
                            },
                            {
                                position: "right",
                                label: "Language",
                                icon: "language",
                                value: "language",
                                badge: {
                                    label: "10"
                                },
                                menus: [
                                    {
                                        label: "English",
                                        value: "english"
                                    }
                                ]
                            }
                        ]
                    }
                });

                comp.element.find(".nav-item.user > a").trigger("click");
                expect(comp.element.find("li.user > ul.dropdown-menu").css('display')).toEqual("block");
                comp.element.find(".nav-item.user > a").trigger("click");
                expect(comp.element.find("li.user > ul.dropdown-menu").css('display')).toEqual("none");

                comp.element.find(".nav-item.user > a").trigger("click");
                comp.element.find(".nav-item.user > ul.dropdown-menu a").eq(0).trigger("click");
                expect(comp.element.find(".nav-item.user > ul.dropdown-menu").css('display')).toEqual("none");

                comp.element.find("li.nav-item").eq(1).find("> a").trigger("click");
                expect(comp.element.find("li.nav-item").eq(1).find("> ul").css("display")).toEqual("block");
                comp.element.find("li.nav-item").eq(1).find("> a").trigger("click");
                expect(comp.element.find("li.nav-item").eq(1).find("> ul").css("display")).toEqual("none");
                
                comp.element.find("li.nav-item").eq(1).find("> a").trigger("click");
                comp.element.find("li.nav-item").eq(1).find("> ul a").eq(0).trigger("click");
                expect(comp.element.find("li.nav-item").eq(1).find("> ul").css("display")).toEqual("none");

                comp.element.find("li.nav-item").eq(4).find("> a").trigger("click");
                expect(comp.element.find("li.nav-item").eq(4).find("> ul").css("display")).toEqual("block");
                comp.element.find("li.nav-item").eq(4).find("> a").trigger("click");
                expect(comp.element.find("li.nav-item").eq(4).find("> ul").css("display")).toEqual("none");
                
                comp.element.find("li.nav-item").eq(4).find("> a").trigger("click");
                comp.element.find("li.nav-item").eq(4).find("> ul a").eq(0).trigger("click");
                expect(comp.element.find("li.nav-item").eq(4).find("> ul").css("display")).toEqual("none");

                comp.destroy();
                
                done();
            });
        });
    });
    describe("Events => ", function() {
        it("click#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNavbar",
                    props: {
                        color: "dark",
                        active: "blog",
                        user: {
                            photo: "https://i.pravatar.cc/300",
                            label: "Tommy",
                            links: [
                                {
                                    label: "Logout",
                                    value: "logout",
                                    icon: "sign-out"
                                }
                            ]
                        },
                        links: [
                            {
                                position: "left",
                                label: "Account",
                                value: "account",
                                icon: "edit",
                                badge: {
                                    label: "40"
                                },
                                menus: [
                                    {
                                        label: "Create",
                                        value: "create",
                                        icon: "task"
                                    }
                                ]
                            },
                            {
                                position: "left",
                                label: "Blog",
                                value: "blog",
                                icon: "trash",
                                badge: {
                                    label: "30",
                                }
                            },
                            {
                                position: "right",
                                label: "Setting",
                                value: "setting",
                                icon: "cogs",
                                badge: {
                                    label: "10"
                                }
                            },
                            {
                                position: "right",
                                label: "Language",
                                icon: "language",
                                value: "language",
                                badge: {
                                    label: "10"
                                },
                                menus: [
                                    {
                                        label: "English",
                                        value: "english"
                                    }
                                ]
                            }
                        ]
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("logout");
                            this.destroy();
                            done();
                        }
                    }
                });
                comp.element.find(".user > ul a").eq(0).trigger('click');
            });
        });
        it("click#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNavbar",
                    props: {
                        color: "dark",
                        active: "blog",
                        user: {
                            photo: "https://i.pravatar.cc/300",
                            label: "Tommy",
                            links: [
                                {
                                    label: "Logout",
                                    value: "logout",
                                    icon: "sign-out"
                                }
                            ]
                        },
                        links: [
                            {
                                position: "left",
                                label: "Account",
                                value: "account",
                                icon: "edit",
                                badge: {
                                    label: "40"
                                },
                                menus: [
                                    {
                                        label: "Create",
                                        value: "create",
                                        icon: "task"
                                    }
                                ]
                            },
                            {
                                position: "left",
                                label: "Blog",
                                value: "blog",
                                icon: "trash",
                                badge: {
                                    label: "30",
                                }
                            },
                            {
                                position: "right",
                                label: "Setting",
                                value: "setting",
                                icon: "cogs",
                                badge: {
                                    label: "10"
                                }
                            },
                            {
                                position: "right",
                                label: "Language",
                                icon: "language",
                                value: "language",
                                badge: {
                                    label: "10"
                                },
                                menus: [
                                    {
                                        label: "English",
                                        value: "english"
                                    }
                                ]
                            }
                        ]
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("create");
                            this.destroy();
                            done();
                        }
                    }
                });

                comp.element.find("li.nav-item").eq(1).find("ul a").eq(0).trigger('click');
            });
        });
        it("click#3", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmNavbar",
                    props: {
                        color: "dark",
                        active: "blog",
                        user: {
                            photo: "https://i.pravatar.cc/300",
                            label: "Tommy",
                            links: [
                                {
                                    label: "Logout",
                                    value: "logout",
                                    icon: "sign-out"
                                }
                            ]
                        },
                        links: [
                            {
                                position: "left",
                                label: "Account",
                                value: "account",
                                icon: "edit",
                                badge: {
                                    label: "40"
                                },
                                menus: [
                                    {
                                        label: "Create",
                                        value: "create",
                                        icon: "task"
                                    }
                                ]
                            },
                            {
                                position: "left",
                                label: "Blog",
                                value: "blog",
                                icon: "trash",
                                badge: {
                                    label: "30",
                                }
                            },
                            {
                                position: "right",
                                label: "Setting",
                                value: "setting",
                                icon: "cogs",
                                badge: {
                                    label: "10"
                                }
                            },
                            {
                                position: "right",
                                label: "Language",
                                icon: "language",
                                value: "language",
                                badge: {
                                    label: "10"
                                },
                                menus: [
                                    {
                                        label: "English",
                                        value: "english"
                                    }
                                ]
                            }
                        ]
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("blog");
                            this.destroy();
                            done();
                        }
                    }
                });
                
                comp.element.find("li.nav-item").eq(2).find("a").eq(0).trigger('click');
            });
        });
    });
});