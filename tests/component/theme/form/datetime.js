describe("mmDateTime => ", function() {
    describe("Properties => ", function() {
        it("value#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDateTime",
                    props: {
                        inputType: "date",
                        format: "MM/DD/YYYY",
                        value: "11/06/2022"
                    }
                }, jQuery("body"));

                expect(comp.element.find("input").attr("type")).toEqual("date");
                expect(comp.prop("format")).toEqual("MM/DD/YYYY");
                expect(comp.element.find("input").val()).toEqual("2022-11-06");
                expect(comp.prop("value")).toEqual("11/06/2022");

                comp.destroy();

                done();
            });
        });
        it("value#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDateTime",
                    props: {
                        inputType: "time",
                        format: "h:mm a",
                        value: "1:09 pm"
                    }
                }, jQuery("body"));

                expect(comp.element.find("input").attr("type")).toEqual("time");
                expect(comp.prop("format")).toEqual("h:mm a");
                expect(comp.element.find("input").val()).toEqual("13:09");
                expect(comp.prop("value")).toEqual("1:09 pm");

                comp.destroy();

                done();
            });
        });
        it("value#3", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmDateTime",
                    props: {
                        format: "MM/DD/YYYY h:mm a",
                        value: "11/06/2022 1:09 pm"
                    }
                }, jQuery("body"));

                expect(comp.element.find("input").attr("type")).toEqual("datetime-local");
                expect(comp.prop("format")).toEqual("MM/DD/YYYY h:mm a");
                expect(comp.element.find("input").val()).toEqual("2022-11-06T13:09");
                expect(comp.prop("value")).toEqual("11/06/2022 1:09 pm");

                comp.destroy();

                done();
            });
        });
    });
});