describe("mmPager => ", function() {
    describe("Properties => ", function() {
        it("numFound, page, limit", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmPager",
                    props: {
                        numFound: 121,
                        limit: 10
                    }
                });

                expect(comp.prop("page")).toEqual(1);
                expect(comp.prop("numFound")).toEqual(121);
                expect(comp.prop("limit")).toEqual(10);
                expect(comp.getScopeVal("total")).toEqual(13);

                let lis = comp.element.find("li");
                expect(lis.length).toEqual(5);
                expect(lis.eq(0).hasClass('disabled')).toBeTrue();
                expect(lis.eq(1).hasClass('disabled')).toBeTrue();
                expect(lis.eq(3).hasClass('disabled')).toBeFalse();
                expect(lis.eq(4).hasClass('disabled')).toBeFalse();
                expect(lis.eq(2).text().trim()).toEqual("1 of 13");

                comp.props({
                    page: 2,
                    limit: 20
                }).apply();

                expect(comp.prop("page")).toEqual(2);
                expect(comp.prop("numFound")).toEqual(121);
                expect(comp.prop("limit")).toEqual(20);
                expect(comp.getScopeVal("total")).toEqual(7);

                lis = comp.element.find("li");
                expect(lis.length).toEqual(5);
                expect(lis.eq(0).hasClass('disabled')).toBeFalse();
                expect(lis.eq(1).hasClass('disabled')).toBeFalse();
                expect(lis.eq(3).hasClass('disabled')).toBeFalse();
                expect(lis.eq(4).hasClass('disabled')).toBeFalse();
                expect(lis.eq(2).text().trim()).toEqual("2 of 7");

                comp.destroy();

                done();
            });
        });

        it("position", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmPager",
                    props: {
                        numFound: 121,
                        limit: 10
                    }
                });

                expect(comp.prop("position")).toEqual("start");
                expect(comp.element.find("ul").hasClass("float-start")).toBeTrue();

                comp.prop("position", "end");

                expect(comp.prop("position")).toEqual("end");
                expect(comp.element.find("ul").hasClass("float-start")).toBeFalse();
                expect(comp.element.find("ul").hasClass("float-end")).toBeTrue();

                comp.destroy();

                done();
            });
        });
        it("numFound", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmPager",
                    props: {
                        numFound: 1,
                        limit: 10
                    }
                });

                expect(comp.element.hasClass("d-none")).toBeTrue();

                comp.prop("numFound", 120);

                expect(comp.element.hasClass("d-none")).toBeFalse();

                comp.destroy();

                done();
            });
        });
    });

    describe("Scope => ", function() {
        it("first(), last(), next(), prev()", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmPager",
                    props: {
                        numFound: 121,
                        limit: 10,
                        page: 5
                    }
                });

                comp.element.find("li > a").eq(0).trigger("click");

                expect(comp.prop("page")).toEqual(1);
                expect(comp.element.find("li").eq(2).text().trim()).toEqual("1 of 13");
                expect(comp.element.find("li").eq(0).hasClass("disabled")).toBeTrue();

                comp.element.find("li > a").eq(3).trigger("click");

                expect(comp.prop("page")).toEqual(13);
                expect(comp.element.find("li").eq(2).text().trim()).toEqual("13 of 13");
                expect(comp.element.find("li").eq(0).hasClass("disabled")).toBeFalse();
                expect(comp.element.find("li").eq(4).hasClass("disabled")).toBeTrue();

                comp.element.find("li > a").eq(1).trigger("click");

                expect(comp.prop("page")).toEqual(12);
                expect(comp.element.find("li").eq(2).text().trim()).toEqual("12 of 13");
                expect(comp.element.find("li").eq(0).hasClass("disabled")).toBeFalse();
                expect(comp.element.find("li").eq(4).hasClass("disabled")).toBeFalse();

                comp.element.find("li > a").eq(1).trigger("click");
                comp.element.find("li > a").eq(1).trigger("click");
                comp.element.find("li > a").eq(2).trigger("click");

                expect(comp.prop("page")).toEqual(11);
                expect(comp.element.find("li").eq(2).text().trim()).toEqual("11 of 13");
                expect(comp.element.find("li").eq(0).hasClass("disabled")).toBeFalse();
                expect(comp.element.find("li").eq(4).hasClass("disabled")).toBeFalse();

                comp.destroy();
                
                done();
            });
        });
    });
});