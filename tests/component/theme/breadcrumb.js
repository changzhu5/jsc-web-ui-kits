describe("mmBreadcrumb => ", function() {
    describe("Properties => ", function() {
        it("links", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmBreadcrumb",
                    props: {
                        links: [
                            {
                                href: "#item1",
                                label: "Item 1"
                            },
                            {
                                href: "#item2",
                                label: "Item 2"
                            },
                            {
                                active: true,
                                label: "Item 3"
                            }
                        ]
                    }
                });
                expect(comp.prop("links")).toEqual([
                    {
                        href: "#item1",
                        label: "Item 1"
                    },
                    {
                        href: "#item2",
                        label: "Item 2"
                    },
                    {
                        active: true,
                        label: "Item 3"
                    }
                ]);
                expect(comp.element.find("li").length).toEqual(3);
                expect(comp.element.find("li > a").length).toEqual(2);
                expect(comp.element.find("li > span").length).toEqual(1);
                comp.destroy();
                done();
            });
        });
    });
});