describe("mmImage => ", function() {
    describe("Properties => ", function() {
        it("src, alt, cap", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmImage",
                    props: {
                        src: "https://via.placeholder.com/150",
                        alt: "placeholder image",
                        cap: "Placeholder Image"
                    }
                });

                expect(comp.element.find("img").attr("src")).toEqual("https://via.placeholder.com/150");
                expect(comp.element.find("img").attr("alt")).toEqual("placeholder image");
                expect(comp.element.find("small").text().trim()).toEqual("Placeholder Image");

                comp.prop("cap", "");
                expect(comp.element.find("small").length).toEqual(0);

                comp.destroy();

                done();
            });
        });
    });
});