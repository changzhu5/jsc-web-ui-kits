describe("mmComponentForm => ", function() {
    describe("Properties => ", function() {
        it("value", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmComponentForm",
                    props: {
                        class: "p-2",
                        value: {
                            type: "mmAddonTextfield",
                            props: {
                                class: "test"
                            },
                            on: [
                                {
                                    name: "click",
                                    function: {
                                        params: ["action"],
                                        body: "console.log(action);"
                                    }
                                }
                            ]
                        }
                    }
                });

                let value = comp.prop('value');
                expect(value.props.class).toEqual("test");

                delete value.props;

                expect(value).toEqual({
                    type: "mmAddonTextfield",
                    on: [
                        {
                            name: "click",
                            function: {
                                params: ["action"],
                                body: "console.log(action);"
                            }
                        }
                    ]
                });
                
                comp.destroy();

                done();
            });
        });
    });
});