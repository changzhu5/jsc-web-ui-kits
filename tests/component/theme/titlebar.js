describe("mmTitlebar => ", function() {
    describe("Properties => ", function() {
        it("label, description, icon", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTitlebar",
                    props: {
                        icon: "edit",
                        label: "Edit",
                        description: "Hello World"
                    }
                });

                comp.destroy();

                done();
            });
        });
        it("right", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTitlebar",
                    props: {
                        label: "List",
                        right: [
                            {
                                comp: {
                                    type: "mmTextfield",
                                    props: {
                                        placeholder: "Type to search"
                                    }
                                }
                            }
                        ]
                    }
                });

                comp.destroy();

                done();
            });
        });
        it("left", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTitlebar",
                    props: {
                        label: "List",
                        left: [
                            {
                                comp: {
                                    type: "mmTextfield",
                                    props: {
                                        placeholder: "Type to search"
                                    }
                                }
                            }
                        ]
                    }
                });

                comp.destroy();

                done();
            });
        });
        it("left, right", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmTitlebar",
                    props: {
                        label: "List",
                        left: [
                            {
                                comp: {
                                    type: "mmTextfield"
                                }
                            }
                        ],
                        right: [
                            {
                                comp: {
                                    type: "mmTextfield"
                                }
                            }
                        ]
                    }
                });

                comp.destroy();

                done();
            });
        });
    });
});