describe("mmImageBox => ", function() {
    describe("Properties => ", function() {
        it("size", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmImageBox",
                    props: {
                        size: 400
                    }
                }, jQuery("body"));

                expect(comp.prop('size')).toEqual(400);
                expect(comp.element.css("width")).toEqual("400px");
                expect(comp.element.find("img").attr('src')).toEqual("https://via.placeholder.com/400");
                comp.destroy();
                done();
            });
        });
        it("caption", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmImageBox",
                    props: {
                        caption: "Hello World"
                    }
                });

                expect(comp.prop("caption")).toEqual("Hello World");
                expect(comp.element.children().eq(1).text().trim()).toEqual("Hello World");
                comp.destroy();
                done();
            });
        });
        it("value#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmImageBox",
                    props: {
                        value: {
                            data: "https://via.placeholder.com/200"
                        }
                    }
                });
                
                expect(comp.prop('value')).toEqual({
                    data: "https://via.placeholder.com/200"
                });
                expect(comp.element.find("img").attr("src")).toEqual("https://via.placeholder.com/200");
                comp.destroy();
                done();
            });
        });
    });
});