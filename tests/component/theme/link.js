describe("mmLink => ", function() {
    describe("Properties => ", function() {
        it("all", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmLink",
                    props: {
                        href: "https://www.google.com",
                        external: true,
                        label: "Google",
                        title: "Google Website"
                    }
                });

                expect(comp.element.find("a").attr("href")).toEqual("https://www.google.com");
                expect(comp.prop("external")).toBeTrue();
                expect(comp.element.find("a").attr("target")).toEqual("_blank");
                expect(comp.element.find("a").attr("title")).toEqual("Google Website");
                expect(comp.element.find("a").text().trim()).toEqual("Google");
                expect(comp.element.find("i").length).toEqual(1);

                comp.prop("external", "false");
                expect(comp.prop("external")).toBeFalse();
                expect(comp.element.find("i").length).toEqual(0);

                comp.destroy();

                done();
            });
        });
    });
    describe("Events => ", function() {
        it("click#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmLink",
                    props: {
                        href: "#something",
                        external: true,
                        label: "Google",
                        title: "Google Website"
                    },
                    on: {
                        click: function() {
                            this.destroy();
                            done();
                        }
                    }
                });

                comp.element.find("a").trigger("click");
            });
        });
    });
});