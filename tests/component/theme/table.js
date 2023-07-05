describe("mmTable => ", function() {
    describe("Properties => ", function() {
        it("headers", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTable",
                    props: {
                        headers: [
                            {
                                type: "mmLabel",
                                props: {
                                    label: "Header 1"
                                }
                            },
                            {
                                type: "mmLabel",
                                props: {
                                    label: "Header 2"
                                }
                            },
                            {
                                type: "mmLabel",
                                props: {
                                    label: "Header 3"
                                }
                            }
                        ],
                        rows: [
                            ["Row 1", "Row 1", "Row 1"],
                            ["Row 2", "Row 2", "Row 2"],
                            ["Row 3", "Row 3", "Row 3"],
                        ]
                    }
                }, jQuery("body"));
                
                const headers = comp.prop("headers");
                expect(headers.length).toEqual(3);
                headers.forEach(function(h) {
                    expect(h instanceof mimi.getComponentDef("mmLabel")).toBeTrue();
                });

                expect(comp.prop("rows")).toEqual([
                    ["Row 1", "Row 1", "Row 1"],
                    ["Row 2", "Row 2", "Row 2"],
                    ["Row 3", "Row 3", "Row 3"],
                ]);

                comp.destroy();

                done();
            });
        });

        it("headerClass", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTable",
                    props: {
                        headers: [
                            {
                                type: "mmLabel",
                                props: {
                                    label: "Header 1"
                                }
                            },
                            {
                                type: "mmLabel",
                                props: {
                                    label: "Header 2"
                                }
                            },
                            {
                                type: "mmLabel",
                                props: {
                                    label: "Header 3"
                                }
                            }
                        ],
                        rows: [
                            ["Row 1", "Row 1", "Row 1"],
                            ["Row 2", "Row 2", "Row 2"],
                            ["Row 3", "Row 3", "Row 3"],
                        ],
                        headerClass: "table-dark"
                    }
                }, jQuery("body"));

                expect(comp.prop("headerClass")).toEqual("table-dark");
                expect(comp.element.find("thead").hasClass("table-dark")).toBeTrue();

                comp.destroy();

                done();
            });
        });

        it("rowClass, cellClass", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTable",
                    props: {
                        headers: [
                            {
                                type: "mmLabel",
                                props: {
                                    label: "Header 1"
                                }
                            },
                            {
                                type: "mmLabel",
                                props: {
                                    label: "Header 2"
                                }
                            },
                            {
                                type: "mmLabel",
                                props: {
                                    label: "Header 3"
                                }
                            }
                        ],
                        rows: [
                            ["Row 1", "Row 1", "Row 1"],
                            ["Row 2", "Row 2", "Row 2"],
                            ["Row 3", "Row 3", "Row 3"],
                        ],
                        rowClass: function(index) {
                            if (index === 0) {
                                return "table-active";
                            }

                            return "";
                        },
                        cellClass: function(i, j) {
                            if (i === 1 && j === 0) {
                                return "table-dark";
                            }
                            return "";
                        }
                    }
                }, jQuery("body"));

                expect(comp.element.find("tbody > tr").eq(0).hasClass("table-active")).toBeTrue();
                expect(comp.element.find("tbody > tr").eq(1).children().eq(0).hasClass("table-dark")).toBeTrue();

                comp.destroy();

                done();
            });
        });
        
    });
});