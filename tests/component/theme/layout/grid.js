describe("mmGrid => ", function() {
    xit("test", function(done) {
        mimi.ready(function() {
            let comp = mimi.create({
                type: "mmGrid",
                props: {
                    components: [
                        {
                            comp: {
                                type: "mmButton",
                                props: {
                                    label: "Button 1"
                                }
                            },
                            option: {
                                class: "col-sm-3"
                            }
                        },
                        {
                            comp: {
                                type: "mmButton",
                                props: {
                                    label: "Button 2"
                                }
                            },
                            option: {
                                class: "col-sm-3"
                            }
                        },
                        {
                            comp: {
                                type: "mmButton",
                                props: {
                                    label: "Button 3"
                                }
                            },
                            option: {
                                class: "col-sm-3"
                            }
                        },
                        {
                            comp: {
                                type: "mmButton",
                                props: {
                                    label: "Button 4"
                                }
                            },
                            option: {
                                class: "col-sm-3"
                            }
                        }
                    ]
                }
            });

            done();
        });
    });
});