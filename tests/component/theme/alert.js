describe("mmAlert => ", function() {
    describe("Properties => ", function() {
        it("label, description, alert, showCloseBtn", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAlert",
                    props: {
                        label: "Alert",
                        description: "Error occured",
                        alert: "warning"
                    }
                });

                expect(comp.prop("alert")).toEqual("warning");
                expect(comp.element.find(".alert-warning").length).toEqual(1);

                expect(comp.prop("label")).toEqual("Alert");
                expect(comp.element.find("h5").length).toEqual(1);

                expect(comp.prop("description")).toEqual("Error occured");
                expect(comp.element.find("p").text().trim()).toEqual("Error occured");

                expect(comp.prop("showCloseBtn")).toBeTrue();
                expect(comp.element.find("button.btn-close").length).toEqual(1);

                comp.prop("alert", "danger");
                expect(comp.prop("alert")).toEqual("danger");
                expect(comp.element.find(".alert-danger").length).toEqual(1);

                comp.prop("label", "Alert 2");
                expect(comp.prop("label")).toEqual("Alert 2");
                expect(comp.element.find("h5").length).toEqual(1);

                comp.prop("description", "Error occured 2");
                expect(comp.prop("description")).toEqual("Error occured 2");
                expect(comp.element.find("p").text().trim()).toEqual("Error occured 2");

                comp.prop("showCloseBtn", false);
                expect(comp.prop("showCloseBtn")).toBeFalse();
                expect(comp.element.find("button.btn-close").length).toEqual(0);

                comp.destroy();

                done();
            });
        });
        it("visible", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAlert",
                    props: {
                        label: "Alert",
                        visible: false
                    }
                });

                expect(comp.prop("visible")).toBeFalse();
                expect(comp.element.hasClass("d-none")).toBeTrue();

                comp.prop("visible", true);
                expect(comp.prop("visible")).toBeTrue();
                expect(comp.element.hasClass("d-none")).toBeFalse();

                comp.destroy();

                done();
            });
        });
        it("asStatusBar", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAlert",
                    props: {
                        label: "Alert",
                        asStatusBar: true
                    }
                });

                expect(comp.prop("asStatusBar")).toBeTrue();
                expect(comp.element.hasClass("position-fixed")).toBeTrue();

                comp.destroy();

                done();
            });
        });
        it("actions", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAlert",
                    props: {
                        label: "Alert",
                        description: "Error occured",
                        actions: [
                            {
                                label: "Cancel",
                                value: "cancel",
                                type: "dark"
                            },
                            {
                                label: "Ok",
                                value: "ok",
                                type: "warning"
                            }
                        ]
                    }
                });

                expect(comp.prop('actions')).toEqual([
                    {
                        label: "Cancel",
                        value: "cancel",
                        type: "dark"
                    },
                    {
                        label: "Ok",
                        value: "ok",
                        type: "warning"
                    }
                ]);

                expect(comp.element.find("a").length).toEqual(2);
                expect(comp.element.find("a").eq(0).text().trim()).toEqual("Cancel");
                expect(comp.element.find("a").eq(1).text().trim()).toEqual("Ok");

                comp.destroy();

                done();
            });
        });
    });
    describe("Events => ", function() {
        it("click#1", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAlert",
                    props: {
                        label: "Alert"
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("dismiss");
                            expect(this.prop("visible")).toBeFalse();
                            this.destroy();
                            done();
                        }
                    }
                });
                comp.element.find("button").trigger("click");
            });
        });
        it("click#2", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmAlert",
                    props: {
                        label: "Alert",
                        actions: [
                            {
                                label: "Cancel",
                                value: "cancel",
                                type: "dark"
                            },
                            {
                                label: "Ok",
                                value: "ok",
                                type: "warning"
                            }
                        ]
                    },
                    on: {
                        click: function(action) {
                            expect(action).toEqual("ok");
                            expect(this.prop("visible")).toBeTrue();
                            this.destroy();
                            done();
                        }
                    }
                });
                comp.element.find("a").eq(1).trigger("click");
            });
        });
    });
});